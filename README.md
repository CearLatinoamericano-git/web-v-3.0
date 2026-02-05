# CEAR LATINOAMERICANO - Plataforma de Formación Profesional

Plataforma web institucional moderna especializada en formación profesional en arbitraje, contratación pública y resolución de controversias.

## 🎓 Descripción

CEAR Latinoamericano es un centro de formación con alianzas académicas con UNMSM (Universidad Nacional Mayor de San Marcos) y UNHEVAL (Universidad Nacional Hermilio Valdizán). Ofrece diplomados y cursos especializados certificados.

## 🎨 Características de Diseño

- **Estilo ultra-moderno** inspirado en Freepik premium con identidad académica profesional
- **Color principal**: #0B95BA (azul cian) con variaciones monocromáticas
- **Tipografía**: Inter para una apariencia moderna y legible
- **Logo oficial**: SVG vectorial importado desde Figma (solo en Header y Footer)
- **Hero innovador**: Composición asimétrica con 9 tarjetas flotantes, glassmorphism, y animaciones dinámicas 🚀
- **Diseño limpio**: Secciones espaciadas, mucho espacio en blanco, tarjetas minimalistas
- **Animaciones premium**: 15+ animaciones simultáneas con Motion (Framer Motion)
- **Responsive**: Totalmente adaptado para desktop, tablet y móvil

## ✨ Hero Section INNOVATIVE (NUEVO) 🎯

### Características Ultra-Impactantes
- ✅ **Composición asimétrica estilo Freepik** con 9 elementos flotantes
- ✅ **Glassmorphism premium** - backdrop-blur, transparencias, borders sutiles
- ✅ **Imagen central con zoom pronunciado** (scale 1 → 1.08, 20s loop)
- ✅ **6 tarjetas flotantes con contenido real**:
  - Stats card (1,000+ profesionales)
  - Certificate badge (UNMSM + UNHEVAL)
  - Mini course card (Arbitraje)
  - Document icon card
  - User avatar group (+100 nuevos)
  - Progress card (95% satisfacción)
- ✅ **3 iconos flotantes con rotación continua** (GraduationCap, BookOpen)
- ✅ **Animaciones únicas** para cada elemento (y, rotate, scale)
- ✅ **Gradientes monocromáticos** en azul #0B95BA
- ✅ **Profundidad visual dramática** con shadows y glow
- ✅ **Sin logo en Hero** (coherencia visual)

### Animaciones Destacadas
- **Zoom continuo** en imagen principal (20 segundos)
- **Movimiento flotante** en 8 tarjetas (4-10 segundos cada una)
- **Rotación continua** en iconos pequeños (8-10 segundos)
- **Entrada escalonada** con delays de 0-1.9s
- **Progress bar animada** que se llena al cargar
- **Orbes de fondo** con scale y opacity animados

### Efectos Glassmorphism
```css
backdrop-blur-xl
bg-white/10
border-white/20
shadow-2xl
```

**Documentación completa:** Ver `HERO_INNOVATIVE.md`

## ✨ Características Implementadas (Estilo Freepik)

### Hero Limpio y Minimalista
- ✅ **Fondo oscuro** (gradient gray-950 → gray-900)
- ✅ **Imagen central grande** con animación de zoom continuo (scale 1 → 1.05)
- ✅ **Imágenes flotantes** pequeñas alrededor con movimiento suave
- ✅ **Contenido centrado** con texto limpio y espaciado
- ✅ **Un solo CTA principal** destacado en blanco
- ✅ **Badge flotante** con estadística en la imagen principal
- ✅ **Sin logo en Hero** (coherencia visual)

### Secciones Limpias
- ✅ **Stats section** con iconos grandes y números destacados
- ✅ **Partners/Universidades** con fotos reales (UNMSM, UNHEVAL)
- ✅ **Grid de cursos** con hover elegante y zoom en imagen
- ✅ **Benefits cards** con diseño minimalista
- ✅ **Testimonials** con estrellas y avatares
- ✅ **CTA section** final con gradiente

### Componentes Nuevos
- ✅ `HeroFreepik.tsx` - Hero estilo Freepik
- ✅ `PartnersSection.tsx` - Universidades con fotos reales
- ✅ `CoursesGrid.tsx` - Grid limpio de cursos
- ✅ `Logo.tsx` - Logo SVG reutilizable

## ✨ Nuevas Características Implementadas

### Hero Moderno e Impactante
- ✅ **Animaciones con Motion** (Framer Motion)
- ✅ **Orbs animados** con gradientes en el fondo
- ✅ **Grid de imágenes** con efectos hover y parallax
- ✅ **Badge flotantes** con estadísticas animadas
- ✅ **Subrayado animado** en el título principal
- ✅ **Iconos flotantes** con movimiento suave
- ✅ **Wave SVG** en la parte inferior
- ✅ **Contadores animados** de estadísticas
- ✅ **Efectos de escala** en botones hover/tap

### Logo Real Integrado
- ✅ Logo CEAR oficial importado desde Figma (SVG)
- ✅ Variantes blanco y color (#0B95BA)
- ✅ Componente reutilizable para Header, Footer y Hero
- ✅ Vectorial escalable sin pérdida de calidad

## 🧭 Flujo UX Completo

### Flujo del Usuario
1. **Home** → Explorar cursos
2. **Ver detalle del curso** → Temario, docentes, certificación
3. **Crear cuenta / Iniciar sesión**
4. **Proceso de matrícula** → Pago → Confirmación
5. **Ingreso al Campus** → Dashboard del estudiante
6. **Progreso del curso** → Evaluaciones → Certificado

### Flujo de Compra
- Selección de curso
- Registro/Login
- Formulario de matrícula
- Selección de método de pago (Tarjeta, Transferencia, Yape/Plin)
- Confirmación y acceso al campus

## 📐 Estructura de Módulos

### A. Catálogo de Cursos (8 cursos activos)
1. Diplomado en Contratación Pública bajo la Ley 2069
2. Diplomado de Posgrado en Arbitraje en Contratación Pública
3. Diplomado de Posgrado en Derecho Administrativo para Árbitros
4. Curso de Posgrado de Controversias en la Ejecución Contractual

### B. Módulo de Usuarios
- Registro y autenticación
- Perfil personalizado
- Historial académico
- Certificados descargables

### C. Módulo de Matrícula y Pagos
- Múltiples métodos de pago
- Facturación automática
- Confirmación visual clara

### D. Campus Virtual
- Dashboard moderno e intuitivo
- Clases en vivo y grabadas
- Materiales descargables
- Sistema de evaluaciones
- Seguimiento de progreso

### E. Módulo Institucional
- Página "Nosotros"
- Alianzas universitarias
- Testimonios
- Blog/Noticias
- FAQs y Soporte

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler y herramienta de desarrollo
- **Tailwind CSS v4.0** para estilos
- **Lucide React** para iconografía
- **Radix UI** para componentes accesibles
- **Sonner** para notificaciones toast
- **React Hook Form** para formularios
- **Recharts** para gráficos
- **Unsplash** para imágenes profesionales

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ y npm/yarn/pnpm
- MySQL o MariaDB (para la base de datos)
- Servidor SMTP configurado (para envío de emails)

### Pasos de Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

2. **Configurar variables de entorno:**
   
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   # Backend Server Configuration
   PORT=3005

   # Database Configuration
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_HOST=localhost
   DB_DIALECT=mysql

   # Email Configuration (Nodemailer)
   HOST_MAIL=smtp.your-email-provider.com
   PORT_MAIL=587
   EMAIL_SECURE=false
   USERNAME_MAIL=your_email@example.com
   PASSWORD_MAIL=your_email_password

   # Frontend API URL (for development)
   VITE_API_BASE_URL=http://localhost:3005/api
   ```

3. **Sincronizar base de datos:**
   ```bash
   npm run sync:db
   ```
   Esto creará las tablas necesarias en tu base de datos.

4. **Iniciar servidor de desarrollo (Frontend):**
   ```bash
   npm run dev
   ```
   El frontend estará disponible en `http://localhost:3000` por defecto.

5. **Iniciar servidor backend (en otra terminal):**
   ```bash
   npm run dev:server
   ```
   El backend estará disponible en `http://localhost:3005` por defecto.

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo del frontend (Vite)
- `npm run dev:server` - Inicia el servidor backend (Express + TypeScript)
- `npm run build` - Compila el frontend para producción
- `npm run start` - Inicia el servidor backend en modo producción
- `npm run start:prod` - Compila el frontend e inicia el servidor backend
- `npm run sync:db` - Sincroniza los modelos con la base de datos
- `npm run preview` - Previsualiza el build de producción del frontend

### Configuración del Backend

El backend está ubicado en la carpeta `app/` y proporciona las siguientes APIs:

- **POST /api/contacto** - Formulario de contacto
- **POST /api/denuncia** - Formulario de denuncias (con soporte de archivos)
- **POST /api/quejas** - Formulario de quejas y sugerencias
- **GET /api/health** - Health check del servidor
- **GET /api/test** - Endpoint de prueba

Para más detalles sobre las APIs, consulta `DOCUMENTACION_API_FORMULARIOS.md`.

## 📁 Estructura de Archivos

```
/
├── App.tsx                    # Router y lógica principal
├── components/
│   ├── Header.tsx            # Navegación principal
│   ├── Footer.tsx            # Footer institucional
│   ├── Hero.tsx              # Sección hero
│   ├── CourseCard.tsx        # Tarjeta de curso
│   └── LoginModal.tsx        # Modal de autenticación
├── pages/
│   ├── Home.tsx              # Página de inicio
│   ├── Courses.tsx           # Catálogo completo
│   ├── CourseDetail.tsx      # Detalle del curso
│   ├── Dashboard.tsx         # Panel del estudiante
│   ├── Campus.tsx            # Campus virtual
│   ├── Enrollment.tsx        # Proceso de matrícula
│   ├── Profile.tsx           # Perfil del usuario
│   └── About.tsx             # Página institucional
├── data/
│   └── courses.ts            # Datos de cursos y testimonios
└── styles/
    └── globals.css           # Estilos globales
```

## 🎯 Funcionalidades Principales

### Para Visitantes
- ✅ Explorar catálogo de cursos con filtros
- ✅ Ver detalles completos de cada curso
- ✅ Leer testimonios de estudiantes
- ✅ Conocer alianzas universitarias
- ✅ Crear cuenta nueva

### Para Estudiantes
- ✅ Dashboard personalizado con progreso
- ✅ Acceso al campus virtual
- ✅ Visualización de clases en vivo y grabadas
- ✅ Descarga de materiales
- ✅ Realización de evaluaciones
- ✅ Descarga de certificados
- ✅ Gestión de perfil

### Sistema de Matrícula
- ✅ Proceso paso a paso intuitivo
- ✅ Múltiples métodos de pago
- ✅ Confirmación visual clara
- ✅ Acceso inmediato al curso

## 🎨 Paleta de Colores

- **Principal**: #0B95BA (Azul cian)
- **Oscuro**: #087A98
- **Claro**: #3DB5D4
- **Backgrounds**: Grises suaves (#F9FAFB, #F3F4F6)
- **Textos**: Escala de grises (#111827, #6B7280, #9CA3AF)

## 🚀 Características Técnicas

- **SPA (Single Page Application)** con navegación fluida
- **Diseño responsive** mobile-first
- **Componentes reutilizables** y modulares
- **Mock data** para demostración completa
- **Simulación de autenticación** y flujos de pago
- **Tipografía profesional** con Inter

## 📱 Páginas Implementadas

1. ✅ **Home** - Hero, alianzas, cursos destacados, beneficios, testimonios
2. ✅ **Catálogo de Cursos** - Con filtros y búsqueda
3. ✅ **Detalle del Curso** - Temario, docentes, certificación
4. ✅ **Dashboard** - Cursos activos, progreso, estadísticas
5. ✅ **Campus Virtual** - Módulos, lecciones, materiales, foro
6. ✅ **Matrícula/Pago** - Proceso completo en 3 pasos
7. ✅ **Perfil** - Información personal, certificados, preferencias
8. ✅ **Nosotros** - Misión, visión, valores, alianzas

## 💡 Próximas Mejorías Sugeridas

- Integración con backend real (Supabase, Firebase)
- Sistema de notificaciones en tiempo real
- Chat en vivo con soporte
- Videoconferencia integrada para clases
- Sistema de calificaciones automático
- Gamificación del aprendizaje
- App móvil nativa
- Integración con pasarelas de pago reales

## 📞 Contacto (Demo)

- **Email**: info@cearlatinoamericano.com
- **Teléfono**: +51 999 999 999
- **Ubicación**: Lima, Perú

---

**Desarrollado con React + Tailwind CSS**
*Plataforma educativa moderna para formación profesional especializada*