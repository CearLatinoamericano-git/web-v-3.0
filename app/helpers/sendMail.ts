import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ejs from "ejs";
import { transporter } from "../config/nodemailer";
import { SendMailOptions } from "@/types";

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



/**
 * Function to send an email using a template
 * @param options - Email options including recipient, subject, template path, and template data
 * @returns Promise with success status and optional error message
 */
export const sendMail = async (
    options: SendMailOptions
): Promise<{ success: boolean; error?: string }> => {
    try {
        // Verificar configuración de nodemailer
        if (!process.env.HOST_MAIL || !process.env.USERNAME_MAIL || !process.env.PASSWORD_MAIL) {
            const errorMsg = 'Configuración de correo incompleta. Verifica las variables de entorno: HOST_MAIL, USERNAME_MAIL, PASSWORD_MAIL';
            return {
                success: false,
                error: errorMsg
            };
        }

        // Render the template with provided data
        const templatePath = path.join(__dirname, '../templates', options.template);
        const html = await ejs.renderFile(templatePath, options.data || {});

        // Prepare mail options
        const mailOptions = {
            from: options.from || `CEAR LATINOAMERICANO <${process.env.USERNAME_MAIL}>`,
            to: options.to,
            bcc: options.bcc,
            subject: options.subject,
            html: html,
            attachments: options.attachments || [],
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            error: errorMessage
        };
    }
}