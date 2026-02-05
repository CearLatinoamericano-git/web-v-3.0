import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/db.ts';

export class Quejas extends Model {
    declare id: number;
    declare codigo?: string;
    declare tipo_queja: string;
    declare nombre_completo: string;
    declare email: string;
    declare celular: string;
    declare mensaje: string;
    declare estado_politica: boolean;
}

Quejas.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        codigo: { type: DataTypes.STRING(50), allowNull: true, unique: true },
        tipo_queja: { type: DataTypes.STRING(255), allowNull: false },
        nombre_completo: { type: DataTypes.STRING(255), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false },
        celular: { type: DataTypes.STRING(20), allowNull: false },
        mensaje: { type: DataTypes.TEXT, allowNull: false },
        estado_politica: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        sequelize,
        tableName: 'quejas',
    }
);