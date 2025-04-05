
# Scripts de Utilidad

Scripts para simplificar el mantenimiento del proyecto Nexo Learning.

## Scripts Disponibles

### Optimizar Documentación

Consolida y optimiza la documentación del proyecto:

```bash
node src/scripts/consolidate-docs.js
```

Este script:
1. Crea una estructura optimizada de documentación con índices y navegación mejorada
2. Organiza documentos por categoría y audiencia
3. Consolida documentos relacionados (desarrollo, arquitectura, etc.)
4. Añade metadatos como versión y fecha de actualización
5. Mueve documentación obsoleta a `docs/legacy`
6. Migra contenido útil de `docs_nexo` (si existe)

### Hacer Scripts Ejecutables

En sistemas Unix/Linux/Mac:

```bash
node src/scripts/make-scripts-executable.js
```

## Uso

Ejecuta cualquier script directamente con Node.js como se muestra en los ejemplos anteriores.

## Estructura de Documentación Optimizada

### Directorios Principales

- `docs/` - Directorio raíz de documentación
  - `desarrollo/` - Guías de desarrollo integral
  - `arquitectura/` - Diseño técnico y decisiones arquitectónicas
  - `guias/` - Manuales y tutoriales para usuarios
  - `api/` - Documentación de endpoints y servicios
  - `admin/` - Guías para administradores
  - `legacy/` - Documentación histórica u obsoleta

### Archivos Clave

- `docs/README.md` - Índice principal y punto de entrada
- `docs/INDEX.md` - Índice completo de toda la documentación
- `docs/CHANGELOG.md` - Registro de cambios del proyecto

## Mantenimiento

Este script está diseñado para ejecutarse periódicamente a medida que la documentación crece.
