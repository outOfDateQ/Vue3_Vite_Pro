import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// node的内置模块
import path from 'path'
// @ts-ignore 引入svg需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    // 使用插件
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 保证开发阶段可以使用mock接口
        localEnabled: command === 'serve',
      }),
    ],
    // 配置路径别名
    resolve: {
      alias: {
        // 获取到src文件夹的相对路径, path.resolve()示当前文件的路径
        '@': path.resolve('./src'),
      },
    },
    // scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
