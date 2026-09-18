import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useHttps = env.VITE_DEV_HTTPS === 'true'

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      tsconfigPaths(),
      ...(useHttps ? [mkcert()] : []),
    ],
    server: {
      https: useHttps ? {} : undefined,
      port: 9001,
    },
  }
})
