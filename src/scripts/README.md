
# Scripts de Utilidad

Scripts para simplificar el mantenimiento del proyecto.

## Scripts Disponibles

### Simplificar Documentación

Consolida y simplifica la documentación del proyecto:

```bash
node src/scripts/consolidate-docs.js
```

Este script:
1. Crea una estructura minimalista de documentación
2. Mueve documentación obsoleta a `docs/legacy`
3. Migra contenido de `docs_nexo` (si existe)

### Hacer Scripts Ejecutables

En sistemas Unix/Linux/Mac:

```bash
node src/scripts/make-scripts-executable.js
```

## Uso

Ejecuta cualquier script directamente con Node.js como se muestra en los ejemplos anteriores.
