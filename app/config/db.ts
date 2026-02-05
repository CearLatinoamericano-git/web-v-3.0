import { config } from 'dotenv'
import path from 'path';
config({ path: path.resolve(process.cwd(), '.env'), override: true });

import { Sequelize, type Dialect } from "sequelize";

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT as Dialect;

// console.log(dbName, dbUser, dbPass, dbHost, dbDialect);

if (!dbName || !dbUser || !dbHost || !dbDialect) {
  throw new Error("Faltan variables de entorno de DB");
}

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDialect,
  logging: false
});