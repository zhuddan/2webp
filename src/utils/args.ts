import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    help: {
      type: 'boolean',
      short: 'h',
    },
    version: {
      type: 'boolean',
      short: 'v',
    },
    /**
     * 并发限制，默认10
     */
    limit: {
      type: 'string',
      default: '10',
      short: 'l',
    },
    /**
     * 是否覆盖已存在的文件，默认false
     */
    // overwrite: {
    //   type: 'boolean',
    //   default: false,
    //   short: 'o',
    // },
  },
})

export { positionals, values }
