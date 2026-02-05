import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/db.ts';

export class Contacto extends Model {
    declare id: number;
    declare codigo?: string;
    declare nombre_completo: string;
    declare celular: string;
    declare email: string;
    declare asunto?: string;
    declare mensaje: string;
    declare dni: string;
    declare estado_politica: boolean;
}

Contacto.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        codigo: { type: DataTypes.STRING(50), allowNull: true, unique: true },
        nombre_completo: { type: DataTypes.STRING(255), allowNull: false },
        celular: { type: DataTypes.STRING(20), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false },
        asunto: { type: DataTypes.STRING(255), allowNull: true },
        mensaje: { type: DataTypes.TEXT, allowNull: false },
        dni: { type: DataTypes.STRING(20), allowNull: true },
        estado_politica: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        sequelize,
        tableName: 'contacto',
    }
);