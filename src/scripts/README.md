
# Scripts de Utilidad para el Proyecto

Este directorio contiene scripts de utilidad para facilitar tareas comunes de mantenimiento del proyecto.

## Haciendo los scripts ejecutables

En sistemas Unix/Linux/Mac, primero necesitas hacer los scripts ejecutables:

```bash
node src/scripts/make-scripts-executable.js
```

## Scripts Disponibles

### Consolidación de Documentación

Este script consolida toda la documentación de `docs_nexo` a `docs` y elimina `docs_nexo`:

```bash
node src/scripts/consolidate-docs.js
```

### Normalización de Estructura de Archivos

Normaliza la estructura de archivos (nombres en minúsculas, elimina duplicados):

```bash
node src/scripts/normalize-file-structure.js [comando]
```

Comandos disponibles:
- `normalize` - Normalizar nombres de archivos
- `duplicates` - Eliminar archivos duplicados
- `fix-docs` - Corregir nomenclatura en documentación
- `all` - Ejecutar todas las correcciones

### Gestión de Documentación

Script para verificar y mantener la documentación:

```bash
node src/scripts/docs-manager.js [comando]
```

Comandos disponibles:
- `check` - Verificar documentos desactualizados
- `update-dates` - Actualizar fechas en documentos principales
- `generate-index` - Generar índice de documentación
- `all` - Ejecutar todas las funciones

### Normalización de Documentación

Orquestador para normalizar toda la documentación:

```bash
node src/scripts/normalize-docs.js
```

## Uso sin package.json

Estos scripts están diseñados para funcionar sin necesidad de estar definidos en package.json. 
Simplemente ejecuta cualquiera de ellos directamente con Node.js como se muestra en los ejemplos anteriores.
