
# API de Nexo Learning

## Visión General

La API de Nexo Learning proporciona acceso programático a las funcionalidades de la plataforma. Está diseñada siguiendo principios RESTful y utiliza JSON como formato principal de intercambio de datos.

## Autenticación

Todas las API requieren autenticación mediante token JWT, que se puede obtener a través del endpoint de autenticación:

```
POST /api/auth/login
```

El token debe incluirse en todas las solicitudes posteriores en la cabecera `Authorization`:

```
Authorization: Bearer [token]
```

## Endpoints Principales

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios

- `GET /api/users/me` - Obtener perfil del usuario actual
- `PATCH /api/users/me` - Actualizar perfil
- `GET /api/users/:id` - Obtener información de un usuario (admin)
- `GET /api/users` - Listar usuarios (admin)

### Cursos

- `GET /api/courses` - Listar cursos disponibles
- `GET /api/courses/:id` - Obtener detalles de un curso
- `POST /api/courses` - Crear nuevo curso (instructor)
- `PATCH /api/courses/:id` - Actualizar curso (instructor)
- `DELETE /api/courses/:id` - Eliminar curso (instructor)

### Lecciones

- `GET /api/courses/:courseId/lessons` - Listar lecciones de un curso
- `GET /api/lessons/:id` - Obtener detalles de una lección
- `POST /api/courses/:courseId/lessons` - Crear nueva lección (instructor)
- `PATCH /api/lessons/:id` - Actualizar lección (instructor)
- `DELETE /api/lessons/:id` - Eliminar lección (instructor)

### Inscripciones

- `POST /api/courses/:courseId/enroll` - Inscribirse en un curso
- `GET /api/enrollments` - Listar inscripciones del usuario
- `DELETE /api/courses/:courseId/enroll` - Cancelar inscripción

## Formato de Respuesta

Todas las respuestas siguen un formato estándar:

```json
{
  "success": true|false,
  "data": { ... },  // Presente si success es true
  "error": {        // Presente si success es false
    "code": "ERROR_CODE",
    "message": "Descripción del error"
  },
  "meta": {         // Metadata opcional (paginación, etc.)
    "page": 1,
    "perPage": 10,
    "total": 100
  }
}
```

## Códigos de Estado HTTP

- `200 OK` - Solicitud exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Error en la solicitud
- `401 Unauthorized` - Autenticación requerida o inválida
- `403 Forbidden` - Sin permiso para acceder al recurso
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

## Límites de Tasa

Las API tienen los siguientes límites de solicitudes:

- Endpoints públicos: 100 solicitudes/hora
- Endpoints autenticados: 1000 solicitudes/hora
- Endpoints administrativos: 5000 solicitudes/hora

## Versiones de la API

La versión actual de la API es `v1`, que está implícita en todas las rutas. Para especificar una versión diferente:

```
/api/v2/courses
```

## Documentación Relacionada

- [Esquemas de API](../schemas/README.md)
- [Guía de Integración](../../guides/developers/api-integration.md)
- [Gestión de Errores](../../guides/developers/error-handling.md)

---

Última actualización: 2025-04-04
