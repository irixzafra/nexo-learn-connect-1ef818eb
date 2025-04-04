
# Documentación de API

Esta sección contiene la documentación técnica de las APIs del sistema.

## Endpoints principales

- Autenticación
- Usuarios
- Cursos
- Contenido

## Autenticación

Todas las APIs requieren autenticación mediante token JWT.

## Formatos de respuesta

Las APIs responden en formato JSON con la siguiente estructura:

```json
{
  "success": true|false,
  "data": { ... },
  "error": { "code": "ERROR_CODE", "message": "Descripción del error" }
}
```
