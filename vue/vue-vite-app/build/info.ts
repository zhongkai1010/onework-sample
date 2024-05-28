import type { Plugin } from 'vite'
import gradientString from 'gradient-string'
import boxen, { type Options as BoxenOptions } from 'boxen'
import dayjs, { type Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { getPackageSize } from './utils'
dayjs.extend(duration)

/**
 * Vite 独有钩子
 *
 * Vite 插件也可以提供钩子来服务于特定的 Vite 目标。这些钩子会被 Rollup 忽略。
 *
 * https://vitejs.cn/vite3-cn/guide/api-plugin.html#vite-specific-hooks
 *
 *
 * @returns
 *
 */

const welcomeMessage = gradientString('cyan', 'magenta').multiline(
  `您好! 项目已经开始启动。\n作者：OneWork\n邮箱：zhongkai1010@163.com`
)

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: 'cyan',
  borderStyle: 'round'
}

export function viteBuildInfo(): Plugin {
  let config: { command: string }
  let startTime: Dayjs
  let endTime: Dayjs
  let outDir: string

  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      outDir = resolvedConfig.build?.outDir ?? 'dist'
    },
    buildStart() {
      if (config.command === 'build') {
        startTime = dayjs(new Date())
      }
      console.log(boxen(welcomeMessage, boxenOptions))
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date())

        getPackageSize({
          folder: outDir,
          callback: (size: string) => {
            console.log(
              boxen(
                gradientString('cyan', 'magenta').multiline(
                  `🎉 恭喜打包完成（总用时${dayjs
                    .duration(endTime.diff(startTime))
                    .format('mm分ss秒')}，打包后的大小为${size}）`
                ),
                boxenOptions
              )
            )
          }
        })
      }
    }
  }
}
