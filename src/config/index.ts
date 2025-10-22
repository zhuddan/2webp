import os from 'node:os'
import path from 'node:path'
/**
 * 配置文件目录
 */
export const CONFIG_DIR = path.join(os.homedir(), '.zd.cli')
/**
 * 配置文件名
 */
export const CONFIG_KEY = path.join(CONFIG_DIR, '.key')
/**
 * 配置文件版本号
 */
export const CONFIG_VERSION = path.join(CONFIG_DIR, '.version')
/**
 * 配置文件版本号
 */
export const CACHE_FILE_DIR = path.join(CONFIG_DIR, '.cache')
