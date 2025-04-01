
# Documentación de Administración

## Índice

1. [Introducción](#introducción)
2. [Panel de Administración](#panel-de-administración)
3. [Gestión de Características](#gestión-de-características)
4. [Configuración del Sistema](#configuración-del-sistema)
5. [Buenas Prácticas](#buenas-prácticas)

## Introducción

Este documento contiene la información necesaria para administrar la plataforma, configurar sus características y mantener el sistema funcionando correctamente.

## Panel de Administración

El panel de administración es el centro de control principal para la gestión de la plataforma. Este panel está accesible únicamente para usuarios con roles de administrador o sistemas.

### Acceso al Panel

- URL: `/admin`
- Autenticación requerida: Sí
- Roles permitidos: `admin`, `sistemas`

### Secciones Principales

1. **Dashboard**: Vista general de la actividad del sistema
2. **Usuarios**: Gestión de cuentas y permisos
3. **Contenido**: Administración de contenidos y recursos
4. **Características**: Activación/desactivación de funcionalidades
5. **Configuración**: Ajustes generales del sistema
6. **Herramientas**: Utilidades para administradores

## Gestión de Características

El sistema implementa un enfoque modular para sus características. Cada funcionalidad puede ser activada o desactivada independientemente, con respeto a las dependencias entre ellas.

### Estructura de Características

Las características están organizadas en categorías:

1. **Core**: Funcionalidades esenciales del sistema
   - Modo oscuro
   - Notificaciones
   - Analíticas
   - Feedback

2. **Onboarding**: Funcionalidades de introducción para usuarios nuevos
   - Sistema de onboarding
   - Disparador de onboarding
   - Inicio automático de onboarding

3. **Aprendizaje**: Funcionalidades relacionadas con cursos
   - Cursos
   - Rutas de aprendizaje
   - Certificados
   - Evaluaciones

4. **Comunidad**: Funcionalidades sociales
   - Comunidad
   - Foros
   - Discusiones grupales
   - Mensajería

5. **Comercio**: Funcionalidades de comercio electrónico
   - Comercio
   - Suscripciones
   - Cupones

6. **Administración**: Funcionalidades administrativas
   - Categorías anidadas
   - Registros de auditoría
   - Acceso basado en roles
   - Flujos de trabajo de contenido

### Dependencias

Algunas características dependen de otras para funcionar correctamente. Por ejemplo:

- El login social depende del registro de usuarios
- Las discusiones grupales dependen de la comunidad y los foros
- Los certificados dependen de los cursos

El sistema gestiona automáticamente estas dependencias, impidiendo que se desactive una característica si hay otras que dependen de ella.

## Configuración del Sistema

El sistema puede configurarse a través del panel de configuración en `/admin/settings`.

### Opciones Principales

1. **General**: Configuración básica del sistema
2. **Apariencia**: Temas, colores y diseño
3. **Contenido**: Opciones para la gestión de contenido
4. **Onboarding**: Configuración del proceso de onboarding
5. **Seguridad**: Opciones de seguridad y autenticación
6. **Conexiones**: Integraciones con servicios externos
7. **Datos**: Gestión de datos y copias de seguridad

## Buenas Prácticas

### Para Administradores

1. **Planificar cambios**: Antes de desactivar una característica, evalúe el impacto en los usuarios
2. **Cambios graduales**: Implemente cambios importantes de forma gradual
3. **Comunicación**: Informe a los usuarios sobre cambios importantes con antelación
4. **Monitorización**: Supervise el rendimiento del sistema después de realizar cambios
5. **Copias de seguridad**: Realice copias de seguridad regulares de la configuración

### Para Desarrolladores

1. **Dependencias**: Mantenga un gráfico actualizado de dependencias entre características
2. **Documentación**: Documente cada característica nueva y sus dependencias
3. **Pruebas**: Pruebe exhaustivamente el funcionamiento con diferentes combinaciones de características
4. **Retrocompatibilidad**: Asegúrese de que los cambios no rompen la compatibilidad con versiones anteriores

---

## Nota Importante

La documentación antigua ha sido movida a la carpeta `/docs/legacy/`. Esta documentación ya no está vigente y se mantiene únicamente con fines históricos. Por favor, no la utilice como referencia para implementaciones actuales.

Para más información sobre la transición a la nueva estructura, consulte el documento `/docs/sistema-caracteristicas-modular.md`.
