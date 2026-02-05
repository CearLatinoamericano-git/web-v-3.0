import { sequelize } from '../config/db.ts';  
import './Contacto.ts';
import './Denuncia.ts';
import './Quejas.ts';

export const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
    // Definir asociaciones después de cargar todos los modelos
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};