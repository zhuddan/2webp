import chalk from 'chalk'

import { description, name, version } from '../../package.json'
import { getVersionUpdateInfo } from './version'

const { black, cyanBright, greenBright, bold, gray } = chalk

export function displayHelp() {
  console.log(`
${bold(cyanBright(`${name}@${version} - ${description}`))}
${getVersionUpdateInfo()}

${bold(black('安装方法:'))}
  ${greenBright(`npm i ${name} -g`)}
  ${greenBright(`npx ${name} --help`)}

${bold(black('使用方法:'))}
  ${greenBright('cli --help')}                     ${gray('显示帮助信息')}
  ${greenBright('cli --version')}                  ${gray('显示版本信息')}

${bold(black('参数:'))}
  ${greenBright('-h, --help')}                     ${gray('显示帮助信息')}
  ${greenBright('-v, --version')}                  ${gray('显示版本信息')}
  `)
}
