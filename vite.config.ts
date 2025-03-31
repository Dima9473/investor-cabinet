import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), nodePolyfills(), mkcert()],
  server: {
    port: 9001,
    https: {
      key: undefined,
      cert: undefined
    }
  },
  base: './'
})
