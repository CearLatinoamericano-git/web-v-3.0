/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly DEV?: boolean;
  // Agrega aquí otras variables de entorno que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly DEV?: boolean;
  }
}

