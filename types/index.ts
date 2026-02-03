 // File Storage

export interface SaveFileOptions {
    baseFolder?: string;
    nombre: string;
    subfolder?: string;
    filename: string;
    buffer: Buffer;
    codigo?: string; // Optional code for folder structure (e.g., CEAR-CALL-2026-0001)
}

export interface SaveMultipleFilesOptions {
    baseFolder?: string;
    nombre: string;
    subfolder?: string;
    codigo?: string;
    archivos: {
        nombre: string;
        buffer: Buffer;
    }[];
}

// Contacto

export interface StoreContactoData {
    nombre_completo: string;
    celular: string;
    email: string;
    asunto?: string;
    mensaje: string;
    dni?: string;
    estado_politica: boolean;
}

// Send Mail

export interface SendMailOptions {
    to: string;
    subject: string;
    template: string; // Path to the template file (e.g., 'contacto.ejs')
    data?: Record<string, any>; // Data to pass to the template
    from?: string; // Optional custom sender
    bcc?: string; // Optional BCC recipient
    attachments?: any[]; // Optional attachments
}

// Quejas

export interface StoreQuejasData {
    tipo_queja: string;
    nombre_completo: string;
    email: string;
    celular: string;
    mensaje: string;
    estado_politica: boolean;
}

// Denuncia

export interface StoreDenunciaData {
    correo: string;
    presunto_hecho: string;
    fecha_desde: Date;
    fecha_hasta?: Date;
    continua: boolean;
    involucrados: string;
    archivos?: {
        nombre: string;
        path?: string;
        buffer: Buffer;
    }[];
}

