
# Nexo Learning - Registro de Cambios

Este documento contiene el historial detallado de actualizaciones y mejoras de la plataforma Nexo Learning, organizadas por versión y fecha.

## v0.2.0 - Actualización de Panel Administrativo

**Fecha:** 2024-05-18

### Añadido
- Sistema de gestión administrativa de cursos con visualización completa del catálogo
- Panel de administración de cursos con filtros por estado (todos, publicados, borradores)
- Funcionalidad de búsqueda de cursos por título e instructor
- Componente `ManualEnrollmentDialog` para matricular usuarios manualmente en cursos
- Políticas RLS para proteger operaciones CRUD en la tabla de cursos
- Columnas adicionales en la tabla `courses` para mejorar la gestión administrativa
- Función `calculate_course_students_count` para calcular estadísticas de matriculación

### Mejorado
- Interface de administración con gestión de errores y estados de carga
- Documentación técnica con detalles sobre el sistema administrativo
- Estructura de navegación en el panel administrativo

### Corregido
- Problema de conectividad con la base de datos para visualizar cursos en panel de administración
- Errores de carga y visualización en el componente `AdminCourses`

## v0.1.0 - Versión Inicial

**Fecha:** 2024-05-10

### Añadido
- Estructura base del proyecto Nexo Learning
- Sistema de autenticación con roles (estudiante, instructor, administrador)
- Catálogo básico de cursos y visualización de contenidos
- Interfaz de administración inicial
- Documentación técnica fundamental
