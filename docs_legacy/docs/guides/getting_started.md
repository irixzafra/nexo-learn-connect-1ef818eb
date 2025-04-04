
# Getting Started

Esta sección proporciona la información necesaria para comenzar a trabajar con Nexo Learning Platform, incluyendo una visión general del producto, los principios que guían su diseño y el stack tecnológico utilizado.

## Visión del Producto

Nexo Learning es una plataforma educativa integral diseñada para facilitar el aprendizaje continuo y desarrollo profesional. La plataforma conecta a instructores, estudiantes y administradores en un ecosistema educativo completo que permite la creación, distribución y consumo de contenido educativo estructurado.

### Objetivos Principales
- Democratizar el acceso a educación de calidad
- Facilitar la creación y distribución de contenido educativo
- Crear comunidades de aprendizaje colaborativo
- Proporcionar herramientas administrativas eficientes

## Principios de Diseño

El desarrollo de Nexo Learning se guía por los siguientes principios:

### Enfoque Mobile-First
- Diseño responsivo para todos los componentes
- Optimización para interacción táctil
- Pruebas exhaustivas en múltiples dispositivos

### Accesibilidad (WCAG 2.1 AA)
- Etiquetado semántico de elementos
- Contraste adecuado de colores
- Soporte completo para navegación por teclado

### Seguridad Proactiva
- Revisión de código enfocada en seguridad
- Políticas RLS para protección de datos
- Actualización regular de dependencias

### Experiencia de Usuario Intuitiva
- Flujos de interacción simplificados
- Feedback visual y notificaciones claras
- Consistencia en patrones de interacción

## Stack Tecnológico Principal

### Frontend
- React + TypeScript
- Vite como bundler
- Tailwind CSS para estilos
- Shadcn/UI como biblioteca de componentes
- React Query para gestión de estado y datos

### Backend
- Supabase como plataforma backend
- PostgreSQL como base de datos
- Row Level Security (RLS) para protección de datos
- Edge Functions para lógica de servidor
- Storage para gestión de archivos

### Herramientas de Desarrollo
- ESLint + Prettier para linting y formateo
- Vitest para pruebas unitarias
- Lovable AI para asistencia en desarrollo

## Configuración del Entorno

### Prerequisitos
- Node.js v18 o superior
- npm v8 o superior
- Cuenta en Supabase

### Pasos de Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/your-organization/nexo-learning.git
cd nexo-learning
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con las credenciales apropiadas
```

4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

5. Acceder a la aplicación
La aplicación estará disponible en `http://localhost:5173/`
