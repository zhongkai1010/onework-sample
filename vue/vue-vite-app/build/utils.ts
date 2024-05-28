import { readdir, stat } from 'node:fs'

const fileListTotal: number[] = []

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

export function formatBytes(bytes, digits = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = digits < 0 ? 0 : digits
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function sum(numbers) {
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

export { getPackageSize }
