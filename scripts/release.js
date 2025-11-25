#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function runCommand(command, description) {
  console.log(`\n${description}...`)
  try {
    execSync(command, { stdio: 'inherit' })
    console.log(`✓ ${description} completed`)
  } catch (error) {
    console.error(`✗ ${description} failed`)
    process.exit(1)
  }
}

const packageJsonPath = path.join(__dirname, '..', 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const version = packageJson.version

console.log(`Starting release process for version ${version}`)

runCommand('pnpm run typecheck', 'Type checking')
runCommand('pnpm run build', 'Building package')
runCommand(`git add -A`, 'Staging changes')
runCommand(`git commit -m "chore: release v${version}"`, 'Committing changes')
runCommand(`git tag v${version}`, 'Creating git tag')

console.log(`\n✓ Release v${version} prepared successfully!`)
console.log(`\nNext steps:`)
console.log(`  1. Review the changes: git show`)
console.log(`  2. Push to remote: git push && git push --tags`)
console.log(`  3. Publish to npm: npm publish`)

