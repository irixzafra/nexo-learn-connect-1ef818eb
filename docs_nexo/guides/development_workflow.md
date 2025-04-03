
# Guía de Flujo de Desarrollo

## Visión General

Esta guía describe el flujo de trabajo para el desarrollo de nuevas características en Nexo Learning. Está diseñada para maximizar la eficiencia, mantener la calidad del código y facilitar la colaboración entre el equipo.

## Ciclo de Desarrollo

```
+--------------------+     +--------------------+     +--------------------+
|                    |     |                    |     |                    |
|  Planificación     +---->+  Implementación    +---->+   Revisión         |
|                    |     |                    |     |                    |
+--------------------+     +--------------------+     +----------+---------+
                                                                 |
+--------------------+     +--------------------+                |
|                    |     |                    |                |
|   Producción       +<----+   Pruebas          |<---------------+
|                    |     |                    |
+--------------------+     +--------------------+
```

### 1. Planificación

- Clarificación de requisitos con stakeholders
- Desglose en tareas específicas
- Estimación de esfuerzo
- Priorización y asignación
- Creación de issues en el sistema de seguimiento

#### Resultado
- Issues bien definidos con aceptación clara
- Asignación de responsabilidades
- Estimación de tiempos

### 2. Implementación

- Creación de rama de característica desde `develop`
- Desarrollo del código siguiendo estándares
- Pruebas unitarias
- Documentación inicial

#### Convención de Ramas
```
feature/nombre-descriptivo       # Para nuevas características
fix/nombre-del-fix               # Para correcciones de bugs
refactor/nombre-del-refactor     # Para refactorizaciones
docs/nombre-documentacion        # Para cambios en documentación
```

#### Convención de Commits
Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: añadir nueva funcionalidad
fix: corregir bug específico
docs: actualizar documentación
style: cambios de formato (no funcionales)
refactor: reorganizar código sin cambiar comportamiento
test: añadir o corregir pruebas
chore: tareas de mantenimiento
```

### 3. Revisión

- Creación de Pull Request (PR) hacia `develop`
- Revisión de código por al menos un desarrollador
- Comentarios y sugerencias
- Correcciones necesarias

#### Lista de Verificación para PR
- [ ] Código sigue estándares y convenciones
- [ ] Pruebas unitarias implementadas y pasando
- [ ] No hay código duplicado o "dead code"
- [ ] Documentación actualizada
- [ ] Sin conflictos con la rama base

### 4. Pruebas

- Pruebas en entorno de desarrollo/staging
- Verificación de que cumple criterios de aceptación
- Pruebas de integración
- Verificación de rendimiento (si aplica)

### 5. Producción

- Merge a `develop` después de aprobación
- Deploy automático a staging
- Validación en staging
- Merge a `main` para release
- Deploy automático a producción

## Estándares de Código

### Estructura de Carpetas

Seguimos una estructura basada en características:

```
/src
  /features
    /nombre-feature
      /components     # Componentes específicos de la feature
      /hooks          # Hooks personalizados
      /utils          # Utilidades específicas
      /types.ts       # Tipos y interfaces
      index.ts        # Punto de entrada, exportaciones
```

### Componentes React

- Un componente por archivo
- Nombres en PascalCase
- Props tipadas con TypeScript
- Uso de hooks preferido sobre clases
- Comentarios JSDoc para funcionalidad compleja

```typescript
/**
 * Componente que muestra información detallada de un curso
 */
export const CourseDetail: React.FC<CourseDetailProps> = ({ 
  course, 
  isEnrolled 
}) => {
  // Implementación...
};
```

### Hooks

- Prefijo `use` obligatorio
- Un hook por archivo
- Documentación clara de parámetros y retorno

```typescript
/**
 * Hook para gestionar la inscripción a cursos
 * @param courseId ID del curso
 * @returns Estado y funciones para gestionar inscripción
 */
export const useEnrollment = (courseId: string) => {
  // Implementación...
};
```

### Estilos

Usamos Tailwind CSS para estilos:

- Clases Tailwind directamente en componentes
- Para estilos complejos, usar componentes base de shadcn/ui
- Evitar CSS inline o archivos CSS separados

## Flujo de Trabajo con Supabase

### Migraciones de Base de Datos

1. Desarrollar cambios localmente en Supabase CLI
2. Generar migración: `supabase db diff -f nombre-cambio`
3. Verificar archivo de migración en `/supabase/migrations/`
4. Incluir archivo en el PR

### Funciones y Triggers

1. Desarrollar y probar localmente
2. Añadir a `/supabase/functions/` o `/supabase/migrations/`
3. Documentar comportamiento en comentarios

## Resolución de Problemas

### Conflictos de Merge

1. Mantener PRs pequeños para minimizar conflictos
2. Actualizar frecuentemente desde `develop`
3. Resolver conflictos localmente antes de push

### Bugs y Issues

1. Reproducir el problema
2. Crear issue con pasos detallados
3. Añadir etiquetas apropiadas
4. Asignar prioridad basada en impacto

## Recursos Adicionales

- [Documentación del Proyecto](../README.md)
- [Estándares de Código](./coding_standards.md)
- [Guía de Testing](./testing_guidelines.md)

---

**Nota**: Este documento debe actualizarse conforme evolucione el proceso de desarrollo.
