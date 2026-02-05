import { StoreQuejasData } from "@/types";
import { Quejas } from "../models/Quejas";
import { sendMail } from "../helpers/sendMail";
import { generateRequestCode } from "../helpers/generate_code";

export const storeQuejas = async (data: StoreQuejasData) : Promise<boolean> => {

    if (!data.tipo_queja || !data.celular || !data.email || data.estado_politica === undefined || !data.mensaje || !data.nombre_completo) {
        throw new Error("All fields are required");
    }

    // Generar el código según el tipo de queja
    const tipoParaCodigo = data.tipo_queja === "Reclamo" ? "Reclamo" : "Sugerencia";
    const codigo = await generateRequestCode(tipoParaCodigo);

    const quejas = await Quejas.create({
        codigo: codigo,
        tipo_queja: data.tipo_queja,
        nombre_completo: data.nombre_completo,
        email: data.email,
        celular: data.celular,
        mensaje: data.mensaje,
        estado_politica: data.estado_politica,
    });

    // Determinar el template según el tipo de queja
    const template = quejas.tipo_queja === "Reclamo" ? "reclamo.ejs" : "sugerencia.ejs";
    const subject = quejas.tipo_queja === "Reclamo" 
        ? "Nuevo reclamo registrado" 
        : "Nueva sugerencia registrada";

    // Envio de correo de notificación del mensaje a "academico@cearlatinoamericano.edu.pe"
    await sendMail({
        to: data.email,
        bcc: "academico@cearlatinoamericano.edu.pe",
        subject: subject,
        template: template,
        data: {
            quejas: quejas
        }
    });

    return true;
}