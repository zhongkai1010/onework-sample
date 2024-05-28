import type { Plugin } from 'vite'
import compressPlugin from 'vite-plugin-compression'
import { isArray } from './utils'

export const configCompressPlugin = (compress: ViteCompression): Plugin | Plugin[] => {
  if (compress === 'none') return null

  const gz = {
    // 生成的压缩包后缀
    ext: '.gz',
    // 体积大于threshold才会被压缩
    threshold: 0,
    // 默认压缩.js|mjs|json|css|html后缀文件，设置成true，压缩全部文件
    filter: () => true,
    // 压缩后是否删除原始文件
    deleteOriginFile: false
  }
  const br = {
    ext: '.br',
    algorithm: 'brotliCompress',
    threshold: 0,
    filter: () => true,
    deleteOriginFile: false
  }

  const codeList = [
    { k: 'gzip', v: gz },
    { k: 'brotli', v: br },
    { k: 'both', v: [gz, br] }
  ]

  const plugins: Plugin[] = []

  codeList.forEach((item) => {
    if (compress.includes(item.k)) {
      if (compress.includes('clear')) {
        if (isArray(item.v)) {
          const ps = item.v as Array<any>
          ps.forEach((vItem) => {
            plugins.push(compressPlugin(Object.assign(vItem, { deleteOriginFile: true })))
          })
        } else {
          const o: any = Object.assign(item.v, { deleteOriginFile: true })
          plugins.push(compressPlugin(o))
        }
      } else {
        if (isArray(item.v)) {
          const ps = item.v as Array<any>
          ps.forEach((vItem) => {
            plugins.push(compressPlugin(vItem))
          })
        } else {
          const o: any = Object.assign(item.v, { deleteOriginFile: true })
          plugins.push(compressPlugin(o))
        }
      }
    }
  })

  return plugins
}
