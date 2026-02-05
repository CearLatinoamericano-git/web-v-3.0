// Load environment variables FIRST before any other imports
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initModels } from './models/index.ts';
config({ path: path.resolve(process.cwd(), '.env') });
import express from 'express';
import cors from 'cors';
import { existsSync } from 'fs';
import contactoRoutes from './routes/contacto.route.ts';
import denunciaRoutes from './routes/denuncia.route.ts';
import quejasRoutes from './routes/quejas.route.ts';

const app = express();
const PORT = process.env.PORT || '3005';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al directorio dist (frontend build)
const distPath = path.resolve(__dirname, '../dist');

// Verificar que existe la carpeta dist
if (!existsSync(distPath)) {
  console.warn(`⚠️  Advertencia: La carpeta 'dist' no existe en ${distPath}`);
  console.warn('   Ejecuta "npm run build" primero para construir el frontend.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Permitir todos los orígenes para desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint - API de prueba
app.get('/api/test', (_req, res) => {
  res.send('Backend configurado correctamente. El servidor está funcionando.');
});

// Routes with /api prefix
app.use('/api/contacto', contactoRoutes);
app.use('/api/denuncia', denunciaRoutes);
app.use('/api/quejas', quejasRoutes);

// Servir archivos estáticos del frontend (CSS, JS, imágenes, etc.)
if (existsSync(distPath)) {
  app.use(express.static(distPath));

  // Manejar rutas SPA - todas las rutas que no sean /api/* deben servir index.html
  // Usar app.use con middleware para Express 5.x (compatible con catch-all)
  app.use((req, res, next) => {
    // Si la ruta no comienza con /api, servir index.html para SPA routing
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });
} else {
  // Si no existe dist, mostrar mensaje en la ruta raíz
  app.get('/', (_req, res) => {
    res.send(`
      <h1>Servidor Backend Funcionando</h1>
      <p>El frontend no está construido. Ejecuta "npm run build" primero.</p>
      <p>Las APIs están disponibles en <a href="/api/health">/api/health</a></p>
    `);
  });
}

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Serving frontend from: ${distPath}`);
    // Sincroniza modelos con la base de datos primero
    await initModels();
})