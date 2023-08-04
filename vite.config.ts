import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// node的内置模块
import path from 'path'
// @ts-ignore 引入svg需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // loadEnv是一个函数, 调用该函数会返回当前环境的对象, 传递两个参数, 第一个是mode, 表示当前是什么环境, 第二个是环境文件的目录路径
  const env = loadEnv(mode, process.cwd()) // mode默认就是开发环境, vite提供了一个方法来获取根目录, 那么就可以根据根目录找到对应环境文件
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
    // 配置代理, webpack是devServer, vite是server
    server: {
      proxy: {
        // 因为env对象可以获取到当前对应环境文件的数据, 所以可以直接使用env.xxx来获取对应和的数据
        [env.VITE_APP_BASE_API]: { // env.VITE_APP_BASE_API === '/api'
          target: env.VITE_SERVE, // 协议+ 域名 + 端口号
          changeOrigin: true, // 是否跨域
          rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径, 只要是以'/api'开头的都会走代理, 且真正发请求的时候会把'/api'变为空
        }
      }
    }
  }
})
