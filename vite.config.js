import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  
  // Uncomment the server configuration below if you need to proxy API requests
  // to avoid CORS issues during development
  /*
  server: {
    proxy: {
      '/api': {
        target: 'https://bulls-bear-backend.vercel.app',
        changeOrigin: true,
        secure: true
      }
    }
  }
  */
})