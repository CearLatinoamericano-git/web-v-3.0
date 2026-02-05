import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin para generar .htaccess después del build
const generateHtaccessPlugin = (): Plugin => {
  return {
    name: 'generate-htaccess',
    closeBundle() {
      const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On

  # ===============================
  # EXCLUSIONES (RUTAS REALES)
  # ===============================

  RewriteCond %{REQUEST_URI} ^/sisdocs/ [NC]
  RewriteRule ^ - [L]

  RewriteCond %{REQUEST_URI} ^/cursos/ [NC]
  RewriteRule ^ - [L]

  RewriteCond %{REQUEST_URI} ^/C_CP_5/ [NC]
  RewriteRule ^ - [L]

  RewriteCond %{REQUEST_URI} ^/ws_cursos/ [NC]
  RewriteRule ^ - [L]

  # ===============================
  # ARCHIVOS Y CARPETAS REALES
  # ===============================
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # ===============================
  # SPA FALLBACK (SOLO FRONTEND)
  # ===============================
  RewriteRule ^ index.html [L]
</IfModule>
`
      const outputPath = path.resolve(__dirname, 'dist', '.htaccess')
      writeFileSync(outputPath, htaccessContent, 'utf-8')
      console.log('✓ .htaccess generado exitosamente')
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generateHtaccessPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['*'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})

