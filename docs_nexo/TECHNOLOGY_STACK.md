
# Stack Tecnológico de Nexo Learning

## Frontend

### Core
- **React**: v18 - Biblioteca principal de UI
- **TypeScript**: v5 - Tipado estático para JavaScript
- **Vite**: Sistema de construcción y bundling rápido

### Enrutamiento y Navegación
- **React Router**: v6 - Navegación y gestión de rutas
- **@tanstack/react-location**: Para gestión avanzada de rutas
- **History API**: Para manipulación programática del historial

### Estado y Gestión de Datos
- **React Context API**: Estado global de aplicación
- **React Query**: v5 - Fetching, caching y sincronización de estado servidor
- **Zustand/Jotai**: Estado global ligero (usado en módulos específicos)

### Interfaz de Usuario
- **Tailwind CSS**: Framework de utilidades CSS
- **Shadcn/UI**: Componentes UI modulares basados en Radix
- **Framer Motion**: Animaciones fluidas
- **Lucide React**: Iconografía
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas

### Utilidades
- **date-fns**: Manipulación de fechas
- **lodash-es**: Utilidades de programación funcional
- **react-helmet-async**: Gestión de metadatos de documento

## Backend (Supabase)

### Base de Datos
- **PostgreSQL**: 15+ - Sistema de base de datos relacional
- **Row Level Security (RLS)**: Políticas de seguridad a nivel de fila
- **Supabase Schema**: Estructura de base de datos optimizada

### Autenticación y Autorización
- **Supabase Auth**: Sistema completo de identidad
- **JWT**: Tokens para autenticación
- **OAuth**: Integración con proveedores externos (Google, etc.)
- **Row Level Security**: Políticas de acceso basadas en roles

### APIs y Funciones
- **Supabase Client**: Cliente JavaScript para acceso a API
- **RESTful API**: Endpoints para operaciones CRUD
- **Realtime API**: Suscripciones para actualizaciones en tiempo real
- **Edge Functions**: Funciones serverless para lógica personalizada

### Almacenamiento
- **Supabase Storage**: Sistema de almacenamiento para archivos
- **Políticas de Acceso**: Control granular sobre archivos

## Testing

### Unitarios y de Componentes
- **Vitest**: Framework de testing rápido
- **React Testing Library**: Testing de componentes
- **MSW**: Mocking de API

### E2E
- **Playwright**: Testing end-to-end automatizado
- **Cypress**: Testing de integración (en consideración)

## DevOps

### CI/CD
- **GitHub Actions**: Automatización de pipeline
- **Husky**: Git hooks para calidad de código

### Calidad de Código
- **ESLint**: Linting de JavaScript/TypeScript
- **Prettier**: Formateo de código
- **TypeScript**: Verificación de tipos

### Monitoreo y Analíticas
- **Sentry**: Monitoreo de errores en producción
- **LogRocket**: Reproducción de sesiones de usuario (en consideración)
- **Supabase Analytics**: Análisis de uso de la plataforma

## Herramientas de Desarrollo

- **VS Code**: IDE principal
- **Docker**: Contenedores para desarrollo local
- **Node.js**: v18+ - Entorno de ejecución de JavaScript
- **pnpm**: Gestor de paquetes rápido y eficiente
- **Postman/Insomnia**: Testing de API

## Producción y Despliegue

- **Supabase Hosting**: Para servicios de backend
- **Vercel/Netlify**: Para el frontend
- **Cloudflare**: CDN y protección
- **GitHub**: Control de versiones

## Bibliotecas Principales

| Categoría | Bibliotecas |
|-----------|-------------|
| UI | tailwindcss, shadcn/ui, framer-motion, cmdk, sonner |
| Formularios | react-hook-form, zod, @hookform/resolvers |
| Data | @tanstack/react-query, @supabase/supabase-js |
| Tablas | @tanstack/react-table |
| Gráficos | recharts |
| Editors | react-quill, @tiptap/react |
| Utilidades | clsx, tailwind-merge, date-fns, lodash |
