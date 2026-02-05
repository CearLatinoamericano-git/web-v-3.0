import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/db.ts';

export class Denuncia extends Model {
    declare id: number;
    declare codigo?: string;
    declare correo: string;
    declare presunto_hecho: string;
    declare fecha_desde: Date;
    declare fecha_hasta?: Date;
    declare continua: boolean;
    declare involucrados: string;
    declare archivos?: string[];
}

Denuncia.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        codigo: { type: DataTypes.STRING(50), allowNull: true, unique: true },
        correo: { type: DataTypes.STRING(255), allowNull: false },
        presunto_hecho: { type: DataTypes.TEXT, allowNull: false },
        fecha_desde: { type: DataTypes.DATE, allowNull: false },
        fecha_hasta: { type: DataTypes.DATE, allowNull: true },
        continua: { type: DataTypes.BOOLEAN, allowNull: false },
        involucrados: { type: DataTypes.TEXT, allowNull: false },
        archivos: { type: DataTypes.JSON, allowNull: true },
    },
    {
        sequelize,
        tableName: 'denuncia',
    }
);