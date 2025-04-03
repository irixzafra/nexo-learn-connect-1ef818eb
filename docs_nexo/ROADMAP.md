
# Hoja de Ruta de Nexo Learning

## Visión General

Este documento detalla la hoja de ruta del desarrollo de Nexo Learning, organizando las funcionalidades en épicas, historias de usuario y tareas específicas. El estado de cada ítem se actualiza regularmente para reflejar el progreso del proyecto.

## Estados

- 🔄 **En Progreso**: Actualmente en desarrollo
- ✅ **Validado CTO**: Completado y validado por el CTO
- 🟢 **Validado Usuario**: Completado y validado por usuarios/stakeholders
- ⏱️ **Pendiente**: En espera de ser iniciado
- 🔒 **Bloqueado**: Bloqueado por dependencias

## Prioridades

- 🔴 **Alta**: Crítico para la funcionalidad principal
- 🟠 **Media**: Importante pero no crítico
- 🟡 **Baja**: Mejora deseable

## Estado Actual del Proyecto

La plataforma ha completado recientemente una importante refactorización estructural, con mejoras en la organización del código y la estructura de navegación. Actualmente se están conectando las diferentes secciones y asegurando la consistencia del sistema.

---

## Épicas y Tareas

### 1. 🏗️ Arquitectura y Base del Proyecto

#### Refactorización Estructural
- ✅ **Validado CTO** 🔴 Reorganizar estructura de carpetas basada en características
- ✅ **Validado CTO** 🔴 Implementar sistema de layouts anidados
- ✅ **Validado CTO** 🔴 Crear sistema de navegación adaptativa por roles
- ✅ **Validado CTO** 🔴 Definir sistema de tipos global

#### Integración Supabase
- ✅ **Validado CTO** 🔴 Configurar cliente Supabase
- ✅ **Validado CTO** 🔴 Implementar sistema de autenticación
- ✅ **Validado CTO** 🔴 Crear políticas RLS básicas
- 🔄 **En Progreso** 🔴 Completar esquema de base de datos

#### Sistema UI Base
- ✅ **Validado CTO** 🔴 Integrar shadcn/ui components
- ✅ **Validado CTO** 🔴 Configurar temas (claro/oscuro)
- ✅ **Validado CTO** 🔴 Implementar componentes reutilizables principales

### 2. 📚 Sistema de Cursos

#### Catálogo de Cursos
- ✅ **Validado CTO** 🔴 Implementar listado de cursos
- ✅ **Validado CTO** 🔴 Crear página de detalle de curso
- 🔄 **En Progreso** 🔴 Desarrollar filtros y búsqueda
- ⏱️ **Pendiente** 🟠 Implementar sistema de categorías

#### Gestión de Contenido
- ✅ **Validado CTO** 🔴 Crear estructura de módulos y lecciones
- ✅ **Validado CTO** 🔴 Implementar visualizador de lecciones
- 🔄 **En Progreso** 🟠 Desarrollar editor de contenido para instructores
- ⏱️ **Pendiente** 🟠 Implementar sistema de multimedia (videos, archivos)

#### Aprendizaje y Progreso
- ✅ **Validado CTO** 🔴 Implementar sistema de inscripción
- 🔄 **En Progreso** 🔴 Desarrollar seguimiento de progreso
- ⏱️ **Pendiente** 🟠 Crear sistema de marcadores y notas
- ⏱️ **Pendiente** 🟡 Implementar recordatorios de estudio

### 3. 👥 Gestión de Usuarios

#### Sistema de Roles
- ✅ **Validado CTO** 🔴 Implementar roles básicos (admin, instructor, estudiante)
- ✅ **Validado CTO** 🔴 Crear sistema de cambio de rol
- 🔄 **En Progreso** 🟠 Desarrollar asignación de permisos granulares
- ⏱️ **Pendiente** 🟡 Implementar roles personalizados

#### Perfiles de Usuario
- ✅ **Validado CTO** 🔴 Crear páginas de perfil
- 🔄 **En Progreso** 🟠 Implementar edición de perfil
- ⏱️ **Pendiente** 🟡 Desarrollar badges y logros
- ⏱️ **Pendiente** 🟡 Crear portfolios de proyectos

#### Administración de Usuarios
- ✅ **Validado CTO** 🔴 Desarrollar listado de usuarios
- 🔄 **En Progreso** 🟠 Implementar gestión de usuarios
- ⏱️ **Pendiente** 🟠 Crear sistema de notas administrativas
- ⏱️ **Pendiente** 🟡 Implementar sistema de reportes/flags

### 4. 🏢 Panel de Administración

#### Dashboard Admin
- ✅ **Validado CTO** 🔴 Crear estructura base del panel
- ✅ **Validado CTO** 🔴 Implementar navegación administrativa
- 🔄 **En Progreso** 🟠 Desarrollar widgets de resumen
- ⏱️ **Pendiente** 🟡 Crear sistema de alertas y notificaciones

#### Configuración del Sistema
- 🔄 **En Progreso** 🟠 Implementar ajustes globales
- ⏱️ **Pendiente** 🟠 Desarrollar gestión de características
- ⏱️ **Pendiente** 🟡 Crear editor de correos/plantillas
- ⏱️ **Pendiente** 🟡 Implementar copias de seguridad

#### Analíticas
- ⏱️ **Pendiente** 🟠 Desarrollar dashboard de analíticas
- ⏱️ **Pendiente** 🟠 Implementar reportes de uso
- ⏱️ **Pendiente** 🟡 Crear sistema de exportación de datos
- ⏱️ **Pendiente** 🟡 Desarrollar predicciones y tendencias

### 5. 💬 Sistema de Comunidad

#### Comentarios y Foros
- 🔄 **En Progreso** 🟠 Implementar comentarios en lecciones
- ⏱️ **Pendiente** 🟠 Desarrollar foros por curso
- ⏱️ **Pendiente** 🟡 Crear foros generales
- ⏱️ **Pendiente** 🟡 Implementar sistema de moderación

#### Mensajería
- ⏱️ **Pendiente** 🟠 Desarrollar mensajería directa
- ⏱️ **Pendiente** 🟠 Crear chats grupales
- ⏱️ **Pendiente** 🟡 Implementar notificaciones en tiempo real
- ⏱️ **Pendiente** 🟡 Desarrollar mensajes enriquecidos

#### Social
- ⏱️ **Pendiente** 🟡 Implementar perfiles públicos
- ⏱️ **Pendiente** 🟡 Crear sistema de seguimiento
- ⏱️ **Pendiente** 🟡 Desarrollar feed de actividad
- ⏱️ **Pendiente** 🟡 Implementar grupos de interés

### 6. 💰 Sistema de Pagos

#### Procesamiento de Pagos
- ⏱️ **Pendiente** 🔴 Integrar Stripe
- ⏱️ **Pendiente** 🔴 Implementar checkout seguro
- ⏱️ **Pendiente** 🟠 Desarrollar gestión de métodos de pago
- ⏱️ **Pendiente** 🟠 Crear sistema de facturación

#### Suscripciones
- ⏱️ **Pendiente** 🟠 Implementar planes de suscripción
- ⏱️ **Pendiente** 🟠 Desarrollar renovaciones automáticas
- ⏱️ **Pendiente** 🟡 Crear gestión de cancelaciones/reembolsos
- ⏱️ **Pendiente** 🟡 Implementar cupones y descuentos

#### Monetización para Instructores
- ⏱️ **Pendiente** 🟠 Desarrollar sistema de revenue share
- ⏱️ **Pendiente** 🟠 Crear dashboard financiero para instructores
- ⏱️ **Pendiente** 🟡 Implementar pagos a instructores
- ⏱️ **Pendiente** 🟡 Desarrollar analíticas de ventas

## Próximas Tareas Prioritarias

1. 🔴 **Completar Seed Data**: Configurar datos iniciales para demostración
2. 🔴 **Finalizar Conexiones**: Conectar componentes y páginas restantes
3. 🔴 **Mejorar Sistema de Roles**: Completar intercambiador de roles
4. 🔴 **Optimizar Queries**: Revisar y mejorar consultas a Supabase
5. 🟠 **Auditoría de Componentes**: Identificar y eliminar componentes huérfanos
6. 🟠 **Documentación**: Completar documentación técnica y de usuario

## Hitos (Milestones)

| Hito | Descripción | Fecha Objetivo | Estado |
|------|-------------|----------------|--------|
| MVP Interno | Versión mínima funcional para testing interno | Q2 2024 | 🔄 En Progreso |
| Beta Privada | Versión para testers seleccionados | Q3 2024 | ⏱️ Pendiente |
| Lanzamiento | Primera versión pública | Q4 2024 | ⏱️ Pendiente |
| Expansión | Implementación de features avanzadas | Q1 2025 | ⏱️ Pendiente |

---

**Última actualización**: Junio 2024
