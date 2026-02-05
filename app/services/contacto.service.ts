import { Contacto } from "../models/Contacto";
import { StoreContactoData } from "@/types";
import { sendMail } from "../helpers/sendMail";
import { generateRequestCode } from "../helpers/generate_code";

export const storeContacto = async (data: StoreContactoData) : Promise<boolean> => {

    if (!data.celular || !data.email || data.estado_politica === undefined || !data.mensaje || !data.nombre_completo) {
        throw new Error("All fields are required");
    }

    // Generar el código antes de crear el contacto
    const codigo = await generateRequestCode("Contacto");

    const contacto = await Contacto.create({
        codigo: codigo,
        nombre_completo: data.nombre_completo,
        celular: data.celular,
        email: data.email,
        asunto: data.asunto || null,
        mensaje: data.mensaje,
        dni: data.dni || null,
        estado_politica: data.estado_politica,
    });

    // Envio de correo de notificación del mensaje a "academico@cearlatinoamericano.edu.pe"
    await sendMail({
        to: data.email,
        bcc: "academico@cearlatinoamericano.edu.pe",
        subject: "Nuevo mensaje de contacto",
        template: "contacto.ejs",
        data: {
            contacto: contacto
        }
    });

    return true;
}