#!/usr/bin/env node
import path from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'
import sharp from 'sharp'

import { version } from '../../package.json'
import { DEFAULT_PATTERN } from '../config'
import { AsyncTaskManager } from '../core/AsyncTaskManager'
import { Logger } from '../core/Logger'
import { positionals, values } from '../utils/args'
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
  const [command, ...rest] = positionals
  const [pattern = DEFAULT_PATTERN] = [command, ...rest].filter(Boolean)
  const inputDir = process.cwd()
  const files = await fg(pattern, { cwd: inputDir, dot: true })
  if (!files.length) {
    Logger.warn(`找不到任何需要转化的图片 at`)
    Logger.warn(`${inputDir}`)
    return
  }
  const limit = values.limit ? Number.parseInt(values.limit, 10) : 10
  Logger.info(`找到需要转化的图片数量: ${files.length}`)
  Logger.info(`开始转化... (并发限制: ${limit})`)
  const atm = new AsyncTaskManager({
    maxConcurrency: limit,
  })
  let progress = 0
  let failProgress = 0
  const tasks = files.map((relativePath) => {
    return async () => {
      try {
        const srcPath = path.join(inputDir, relativePath)
        const webpPath = relativePath.replace(/\.(png|jpeg|jpg|gif)$/i, '.webp')
        const destPath = path.join(inputDir, webpPath)
        await convertWebpToPng(srcPath, destPath)
        Logger.success(`转化成功 (${progress++}/${files.length}): ${relativePath} ==> ${webpPath}`)
      }
      catch (error) {
        Logger.error(`转化失败 (${failProgress++}/${files.length}): ${relativePath}`)
        Logger.errorBg((error as Error).message)
      }
    }
  })
  atm.addTask(...tasks)
  const startTime = performance.now()
  await atm.run()
  Logger.infoBg(`图片转化完成, 耗时 ${((performance.now() - startTime) / 1000).toFixed(2)} 秒`)
  Logger.success(`转化成功 ${progress} 张`)

  if (failProgress > 0) {
    Logger.error(`转化失败 ${failProgress} 张，请检查错误信息`)
  }

  process.exit(0)
}

async function convertWebpToPng(inputPath: string, outputPath: string) {
  await sharp(inputPath)
    .png()
    .toFile(outputPath)
}

main()
