import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Compression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { EleAdminResolver } from 'ele-admin-plus/es/utils/resolvers';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  const alias = {
    '@/': resolve('src') + '/',
    'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
  };
  const plugins = [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      watchFiles: true
      // // 设置存储模拟 .ts 文件的文件夹
      // mockPath: './mock/',
      // // 打开后可以读取ts文件模块。请注意，您将无法在打开后监控 .js 文件。
      // supportTs: true,
      // // 自动读取模拟 .ts 文件时，忽略指定格式的文件
      // ignore: undefined,
      // // 设置是否监听 mock .ts 文件的变化
      // watchFiles: true,
      // // 设置是否开启本地mock .ts文件，不要在生产环境打开
      // localEnabled: false,
      // // 设置是否开启打包的mock功能
      // prodEnabled: true,
      // // 如果在生产环境中启用了mock功能，即prodEnabled=true，则代码会被注入到injectFile对应的文件底部。默认是 main.{ts,js}
      // // 这样做的好处是可以动态控制生产环境中是否启用mock，不启用时mock.js不会被打包。
      // // 如果代码直接写在main.ts中，不管是否开启，最终的包都会包含mock.js
      // injectCode: `
      //   import { setupProdMockServer } from './mockProdServer';
      //   setupProdMockServer();
      // `
      // // 在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
      // // injectFile: resolve('src/main.{ts,js}')
    })
  ];
  if (isBuild) {
    // 组件按需引入
    plugins.push(
      Components({
        dts: false,
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          EleAdminResolver({
            importStyle: 'sass'
          })
        ]
      })
    );
    // gzip压缩
    plugins.push(
      Compression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    );
  } else {
    // 开发环境全局安装
    alias['./as-needed'] = './global-import';
  }
  return {
    resolve: { alias },
    plugins,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/renderers',
        'echarts/components',
        'vue-echarts',
        'echarts-wordcloud',
        'sortablejs',
        'vuedraggable'
      ]
    },
    build: {
      target: 'chrome63',
      chunkSizeWarningLimit: 2000
    }
  };
});
