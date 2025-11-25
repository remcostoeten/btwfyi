#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const packageJsonPath = path.join(__dirname, '..', 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const versionType = process.argv[2]

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Usage: node scripts/version.js [patch|minor|major]')
  process.exit(1)
}

const [major, minor, patch] = packageJson.version.split('.').map(Number)

let newVersion
if (versionType === 'major') {
  newVersion = `${major + 1}.0.0`
} else if (versionType === 'minor') {
  newVersion = `${major}.${minor + 1}.0`
} else {
  newVersion = `${major}.${minor}.${patch + 1}`
}

packageJson.version = newVersion
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

console.log(`Version bumped to ${newVersion}`)

