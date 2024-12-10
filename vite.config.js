import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // vite config
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: "named",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 3001
    },
  }
})
