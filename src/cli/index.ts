#!/usr/bin/env node
import { name, version } from '../../package.json'
import { Logger } from '../core/Logger'
import { values } from '../utils/args'
import { displayHelp } from '../utils/help'
import { fetchLatestVersion } from '../utils/version'

async function main() {
  fetchLatestVersion()
  if (values.version) {
    Logger.info(`version: ${version}`)
    return
  }
  if (values.help) {
    displayHelp()
    return
  }
  Logger.loading('Loading...')
  setTimeout(() => {
    Logger.stopLoading(true, 'Loaded')
    Logger.info(`Hello, World! from ${name}@${version} at ${new Date().toLocaleString()}`)
  }, 1000)
}

main()
