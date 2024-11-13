import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],

  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  // server: {
  //   host: '0.0.0.0',
  //   port:3000,
  //   historyApiFallback: true // Đảm bảo server trả về index.html cho tất cả các route
  // }
})

