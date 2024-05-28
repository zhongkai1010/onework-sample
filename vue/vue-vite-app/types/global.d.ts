/**
 * 打包压缩格式的类型声明
 */
type ViteCompression =
  | 'none'
  | 'gzip'
  | 'brotli'
  | 'both'
  | 'gzip-clear'
  | 'brotli-clear'
  | 'both-clear'

/**
   * # 平台本地运行端口号
      VITE_PORT = 8848

      # 平台打包路径
      VITE_PUBLIC_PATH = /

      # 平台路由历史模式（Hash模式传"hash"、HTML5模式传"h5"、Hash模式带base参数传"hash,base参数"、HTML5模式带base参数传"h5,base参数"）
      VITE_ROUTER_HISTORY = "hash"

      # 是否在打包时使用cdn替换本地库 替换 true 不替换 false
      VITE_CDN = false

      # 是否启用gzip压缩或brotli压缩（分两种情况，删除原始文件和不删除原始文件）
      # 压缩时不删除原始文件的配置：gzip、brotli、both（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
      # 压缩时删除原始文件的配置：gzip-clear、brotli-clear、both-clear（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
      VITE_COMPRESSION = "none"

      # 是否隐藏首页 隐藏 true 不隐藏 false （勿删除，VITE_HIDE_HOME只需在.env文件配置）
      VITE_HIDE_HOME = false
   */
interface ViteEnv {
  VITE_PORT: number
  VITE_PUBLIC_PATH: string
  VITE_ROUTER_HISTORY: string
  VITE_CDN: boolean
  VITE_HIDE_HOME: string
  VITE_COMPRESSION: ViteCompression
}
