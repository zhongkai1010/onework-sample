import { readdir, stat } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const fileListTotal: number[] = []

/** 启动`node`进程时所在工作目录的绝对路径 */
const root: string = process.cwd()

/** 获取指定文件夹中所有文件的总大小 */
const getPackageSize = (options) => {
  const { folder = 'dist', callback, format = true } = options
  readdir(folder, (err, files: string[]) => {
    if (err) throw err
    let count = 0
    const checkEnd = () => {
      ++count == files.length &&
        callback(format ? formatBytes(sum(fileListTotal)) : sum(fileListTotal))
    }
    files.forEach((item: string) => {
      stat(`${folder}/${item}`, async (err, stats) => {
        if (err) throw err
        if (stats.isFile()) {
          fileListTotal.push(stats.size)
          checkEnd()
        } else if (stats.isDirectory()) {
          getPackageSize({
            folder: `${folder}/${item}/`,
            callback: checkEnd
          })
        }
      })
    })
    files.length === 0 && callback(0)
  })
}

function formatBytes(bytes, digits = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = digits < 0 ? 0 : digits
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function sum(numbers) {
  // 检查输入是否为数组
  if (!Array.isArray(numbers)) {
    throw new Error('输入必须是一个数组')
  }

  // 使用reduce方法累加数组
  return numbers.reduce((acc, current) => {
    // 确保每个元素都是数字
    if (typeof current !== 'number') {
      throw new Error('所有数组元素必须是数字')
    }
    return acc + current
  }, 0)
}

function isArray(value) {
  return Array.isArray(value)
}

/** 处理环境变量 */
const wrapperEnv = (envConf: Recordable): ViteEnv => {
  // 默认值
  const ret: ViteEnv = {
    VITE_PORT: 8848,
    VITE_PUBLIC_PATH: '',
    VITE_ROUTER_HISTORY: '',
    VITE_CDN: false,
    VITE_HIDE_HOME: 'false',
    VITE_COMPRESSION: 'none'
  }

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}

/**
 * @description 根据可选的路径片段生成一个新的绝对路径
 * @param dir 路径片段，默认`build`
 * @param metaUrl 模块的完整`url`，如果在`build`目录外调用必传`import.meta.url`
 */
const pathResolve = (dir = '.', metaUrl = import.meta.url) => {
  // 当前文件目录的绝对路径
  const currentFileDir = dirname(fileURLToPath(metaUrl))
  // build 目录的绝对路径
  const buildDir = resolve(currentFileDir, 'build')
  // 解析的绝对路径
  const resolvedPath = resolve(currentFileDir, dir)
  // 检查解析的绝对路径是否在 build 目录内
  if (resolvedPath.startsWith(buildDir)) {
    // 在 build 目录内，返回当前文件路径
    return fileURLToPath(metaUrl)
  }
  // 不在 build 目录内，返回解析后的绝对路径
  return resolvedPath
}

/** 设置别名 */
const alias: Record<string, string> = {
  '@': pathResolve('../src'),
  '@build': pathResolve()
}

export { alias, root, getPackageSize, sum, formatBytes, wrapperEnv, isArray, pathResolve }
