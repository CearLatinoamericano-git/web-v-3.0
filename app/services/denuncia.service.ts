import { StoreDenunciaData } from "@/types";
import { Denuncia } from "../models/Denuncia";
import { sendMail } from "../helpers/sendMail";
import { generateRequestCode } from "../helpers/generate_code";
import { saveMultipleFiles } from "../helpers/fileStorage";
import path from "path";

export const storeDenuncia = async (data: StoreDenunciaData) : Promise<boolean> => {

    if (!data.correo || !data.presunto_hecho || !data.fecha_desde || data.continua === undefined || !data.involucrados) {
        throw new Error("All fields are required");
    }

    // 1. Generar el código primero para poder crear la carpeta
    const codigo = await generateRequestCode("Denuncia");

    // 2. Almacenar todos los archivos en la carpeta basada en el código
    const archivosGuardados = saveMultipleFiles({
        nombre: "denuncias",
        codigo: codigo,
        subfolder: "archivos",
        archivos: data.archivos || [],
    });

    // 3. Crear el registro en la base de datos con el código y el array de archivos
    const denuncia = await Denuncia.create({
        codigo: codigo,
        correo: data.correo,
        presunto_hecho: data.presunto_hecho,
        fecha_desde: data.fecha_desde,
        fecha_hasta: data.fecha_hasta,
        continua: data.continua,
        involucrados: data.involucrados,
        archivos: archivosGuardados.length > 0 ? archivosGuardados : null,
    });

    // 4. Preparar attachments en el formato que espera nodemailer
    const attachments = archivosGuardados.map((relativePath) => {
        const absolutePath = path.join(process.cwd(), relativePath);
        const filename = path.basename(relativePath);
        return {
            filename: filename,
            path: absolutePath,
        };
    });

    // 5. Envío de correo de notificación del mensaje a "denuncias@cearlatinoamericano.pe"
    await sendMail({
        to: data.correo,
        bcc: "denuncias@cearlatinoamericano.pe",
        subject: "Nueva denuncia registrada",
        template: "denuncia.ejs",
        data: {
            denuncia: denuncia
        },
        attachments: attachments,
    });

    return true;

}