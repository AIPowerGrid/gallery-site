import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'
import { resolve } from 'path'

module.exports = defineConfig({
  plugins: [
    createVuePlugin(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Gallery',
          description: 'AI Art Gallery'
        }
      }
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
      //'~bootstrap': 'bootstrap'
    }
  },
  css: {
  }
})
