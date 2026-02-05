import { config } from 'dotenv';
import path from 'path';
config({ path: path.resolve(process.cwd(), '.env') });

import { sequelize } from '../config/db.ts';
import { initModels } from '../models/index.ts';

const syncDatabase = async () => {
  try {
    console.log('Iniciando sincronización de base de datos...');
    
    // Inicializar modelos y asociaciones
    await initModels();
    
    // Sincronizar tablas
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada correctamente');
    
    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar base de datos:', error);
    process.exit(1);
  }
};

syncDatabase();