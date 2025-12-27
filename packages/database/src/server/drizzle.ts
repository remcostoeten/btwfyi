import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq, and } from 'drizzle-orm'
import type { Pos, Connection, DisplayMode, TodoStatus } from 'btwfyi-core'

// Import the generated schema (users need to generate this with our CLI)
import {
  btwfyiInstance,
  btwfyiPosition,
  btwfyiConnection,
  btwfyiSettings,
  btwfyiStatus
} from './drizzle-schema' // Users will import their generated schema

export interface VigiloDrizzleDB {
  select: {
    from: (table: any) => any
  }
  insert: (table: any) => any
  update: (table: any) => any
  delete: (table: any) => any
}

export class VigiloDrizzleQueries {
  constructor(private db: VigiloDrizzleDB) { }

  /**
   * Get or create an instance
   */
  async getOrCreateInstance(instanceKey: string, userId?: string) {
    const existing = await this.db.select().from(btwfyiInstance).where(eq(btwfyiInstance.instanceKey, instanceKey)).limit(1)

    if (existing.length > 0) {
      return existing[0]
    }

    const inserted = await this.db.insert(btwfyiInstance).values({
      instanceKey,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning()

    return inserted[0]
  }

  /**
   * Load complete state for an instance
   */
  async loadState(instanceKey: string) {
    const instance = await this.db.select().from(btwfyiInstance).where(eq(btwfyiInstance.instanceKey, instanceKey)).limit(1)

    if (instance.length === 0) return null

    const instanceId = instance[0].id

    const [positions, connections, settings, statuses] = await Promise.all([
      this.db.select().from(btwfyiPosition).where(eq(btwfyiPosition.instanceId, instanceId)),
      this.db.select().from(btwfyiConnection).where(eq(btwfyiConnection.instanceId, instanceId)),
      this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instanceId)),
      this.db.select().from(btwfyiStatus).where(eq(btwfyiStatus.instanceId, instanceId))
    ])

    return {
      position: positions[0] ? { x: positions[0].x, y: positions[0].y } : undefined,
      connections: connections.map(conn => ({
        todoIndex: conn.todoIndex,
        targetSelector: conn.targetSelector || undefined,
        targetLabel: conn.targetLabel || undefined,
        targetPosition: (conn.targetPositionX !== null && conn.targetPositionY !== null)
          ? { x: conn.targetPositionX, y: conn.targetPositionY }
          : undefined
      })),
      displayMode: settings[0]?.displayMode as DisplayMode || undefined,
      isHidden: settings[0]?.isHidden,
      showLines: settings[0]?.showLines,
      showBadges: settings[0]?.showBadges,
      lineColor: settings[0]?.lineColor,
      lineOpacity: settings[0]?.lineOpacity,
      componentOpacity: settings[0]?.componentOpacity,
      statuses: new Map(statuses.map(s => [s.todoIndex, s.status as TodoStatus]))
    }
  }

  /**
   * Save position
   */
  async savePosition(instanceKey: string, position: Pos) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiPosition).where(eq(btwfyiPosition.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiPosition)
        .set({ x: position.x, y: position.y, updatedAt: new Date() })
        .where(eq(btwfyiPosition.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiPosition).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        x: position.x,
        y: position.y,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save connections (replaces all connections for instance)
   */
  async saveConnections(instanceKey: string, connections: Connection[]) {
    const instance = await this.getOrCreateInstance(instanceKey)

    // Delete existing connections
    await this.db.delete(btwfyiConnection).where(eq(btwfyiConnection.instanceId, instance.id))

    // Insert new connections
    if (connections.length > 0) {
      await this.db.insert(btwfyiConnection).values(
        connections.map(conn => ({
          id: crypto.randomUUID(),
          instanceId: instance.id,
          todoIndex: conn.todoIndex,
          targetSelector: conn.targetSelector || null,
          targetLabel: conn.targetLabel || null,
          targetPositionX: conn.targetPosition?.x || null,
          targetPositionY: conn.targetPosition?.y || null,
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      )
    }

    return true
  }

  /**
   * Save display mode
   */
  async saveDisplayMode(instanceKey: string, displayMode: DisplayMode) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ displayMode, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode,
        isHidden: false,
        showLines: true,
        showBadges: true,
        lineColor: '#3b82f6',
        lineOpacity: 0.5,
        componentOpacity: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save hidden state
   */
  async saveHidden(instanceKey: string, isHidden: boolean) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ isHidden, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode: 'full',
        isHidden,
        showLines: true,
        showBadges: true,
        lineColor: '#3b82f6',
        lineOpacity: 0.5,
        componentOpacity: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save show lines setting
   */
  async saveShowLines(instanceKey: string, showLines: boolean) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ showLines, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode: 'full',
        isHidden: false,
        showLines,
        showBadges: true,
        lineColor: '#3b82f6',
        lineOpacity: 0.5,
        componentOpacity: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save show badges setting
   */
  async saveShowBadges(instanceKey: string, showBadges: boolean) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ showBadges, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode: 'full',
        isHidden: false,
        showLines: true,
        showBadges,
        lineColor: '#3b82f6',
        lineOpacity: 0.5,
        componentOpacity: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save line color
   */
  async saveLineColor(instanceKey: string, lineColor: string) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ lineColor, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode: 'full',
        isHidden: false,
        showLines: true,
        showBadges: true,
        lineColor,
        lineOpacity: 0.5,
        componentOpacity: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save line opacity
   */
  async saveLineOpacity(instanceKey: string, lineOpacity: number) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ lineOpacity, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode: 'full',
        isHidden: false,
        showLines: true,
        showBadges: true,
        lineColor: '#3b82f6',
        lineOpacity,
        componentOpacity: 1.0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save component opacity
   */
  async saveComponentOpacity(instanceKey: string, componentOpacity: number) {
    const instance = await this.getOrCreateInstance(instanceKey)

    const existing = await this.db.select().from(btwfyiSettings).where(eq(btwfyiSettings.instanceId, instance.id)).limit(1)

    if (existing.length > 0) {
      await this.db.update(btwfyiSettings)
        .set({ componentOpacity, updatedAt: new Date() })
        .where(eq(btwfyiSettings.instanceId, instance.id))
    } else {
      await this.db.insert(btwfyiSettings).values({
        id: crypto.randomUUID(),
        instanceId: instance.id,
        displayMode: 'full',
        isHidden: false,
        showLines: true,
        showBadges: true,
        lineColor: '#3b82f6',
        lineOpacity: 0.5,
        componentOpacity,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return true
  }

  /**
   * Save statuses (replaces all statuses for instance)
   */
  async saveStatuses(instanceKey: string, statuses: Map<number, TodoStatus>) {
    const instance = await this.getOrCreateInstance(instanceKey)

    // Delete existing statuses
    await this.db.delete(btwfyiStatus).where(eq(btwfyiStatus.instanceId, instance.id))

    // Insert new statuses
    const statusData = Array.from(statuses.entries()).map(([todoIndex, status]) => ({
      id: crypto.randomUUID(),
      instanceId: instance.id,
      todoIndex,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    if (statusData.length > 0) {
      await this.db.insert(btwfyiStatus).values(statusData)
    }

    return true
  }
}

/**
 * Helper function to create VigiloDrizzleQueries with a Drizzle instance
 */
export function createVigiloDrizzleQueries(db: VigiloDrizzleDB) {
  return new VigiloDrizzleQueries(db)
}
