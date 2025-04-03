
# Guía de Contribución - Nexo Learning

## Bienvenido

Gracias por tu interés en contribuir al proyecto Nexo Learning. Esta guía te ayudará a configurar tu entorno de desarrollo y a entender nuestro flujo de trabajo.

## Configuración del Entorno

### Requisitos Previos

- Node.js (v18+)
- pnpm
- Git

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/nexo-learning/nexo-platform.git
cd nexo-platform
```

### Paso 2: Instalar Dependencias

```bash
pnpm install
```

### Paso 3: Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y completa las variables necesarias para desarrollo.

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
pnpm dev
```

## Flujo de Trabajo

### Ramas

Utilizamos un modelo basado en features:

- `main` - Rama principal, siempre en estado deployable
- `develop` - Rama de desarrollo, integración continua
- `feature/nombre-feature` - Para nuevas características
- `fix/nombre-bug` - Para correcciones de bugs
- `refactor/nombre` - Para refactorizaciones
- `docs/nombre` - Para cambios en la documentación

### Creación de Ramas

Para trabajar en una nueva característica:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-feature
```

### Commits

Seguimos la convención de [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espaciado, punto y coma, etc)
- `refactor`: Refactorización del código sin cambios funcionales
- `test`: Adición o corrección de tests
- `chore`: Tareas de mantenimiento, actualizaciones de dependencias, etc

Ejemplo:

```
feat(courses): add filter functionality to course list
```

### Pull Requests

1. Asegúrate de que tu código pasa todas las pruebas: `pnpm test`
2. Haz push de tu rama: `git push origin feature/nombre-feature`
3. Crea un Pull Request hacia `develop`
4. Completa la plantilla de PR describiendo tus cambios
5. Solicita revisión del código a los mantenedores

## Estándares de Código

### Estilo

Usamos ESLint y Prettier para mantener la consistencia del código. Configura tu editor para usar estos archivos o ejecuta:

```bash
pnpm lint
pnpm format
```

### TypeScript

- Todo el código nuevo debe ser escrito en TypeScript
- Define interfaces para todas las props de componentes
- Utiliza tipos explícitos, evita `any`
- No desactives el type checking con `@ts-ignore` sin una buena razón

### Componentes React

- Usa componentes funcionales con hooks
- Un componente por archivo
- Nombres en PascalCase
- Archivos `.tsx` para componentes, `.ts` para utilidades
- Evita usar clases CSS directamente, usa el sistema de Tailwind

### Organización de Archivos

```
src/
  features/
    nombre-feature/
      components/       # Componentes específicos de la feature
      hooks/            # Hooks personalizados de la feature  
      types.ts          # Tipos y interfaces
      utils.ts          # Utilidades
      index.ts          # Exportaciones públicas
```

## Testing

### Tipos de Tests

- **Unitarios**: Para funciones aisladas y componentes pequeños (Vitest)
- **Integración**: Para características completas (Testing Library)
- **End-to-End**: Para flujos completos (Playwright)

### Ejecutar Tests

```bash
# Todos los tests
pnpm test

# Tests específicos
pnpm test:unit
pnpm test:integration
pnpm test:e2e

# En modo watch
pnpm test:watch
```

## Documentación

- Documenta todas las características nuevas
- Actualiza la documentación existente cuando cambies algo
- Usa JSDoc para funciones y componentes complejos
- Actualiza el README.md cuando sea necesario

## Proceso de Revisión

Las PRs son revisadas por al menos un mantenedor. El proceso incluye:

1. Revisión de código (legibilidad, mantenibilidad)
2. Verificación de funcionalidad
3. Análisis de rendimiento
4. Revisión de accesibilidad
5. Comprobación de tests

## Despliegue

El despliegue se realiza automáticamente:

- `develop` → Entorno de staging
- `main` → Producción

## Contacto

Si tienes dudas o necesitas ayuda:

- Abre un Issue en GitHub
- Contacta al equipo de desarrollo en el canal de Slack `#dev-nexo-learning`

---

¡Gracias por contribuir a Nexo Learning! Tu esfuerzo ayuda a mejorar la plataforma para todos.
