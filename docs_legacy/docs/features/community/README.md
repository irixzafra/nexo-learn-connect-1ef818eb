
# Módulo de Comunidad

## Visión General

El módulo de comunidad gestiona todas las interacciones sociales y comunicaciones entre usuarios de la plataforma. Incluye sistema de comentarios, mensajería, foros y grupos, fomentando la colaboración y el aprendizaje social.

## Componentes Principales

### Páginas

- **CommunityHome**: Página principal del espacio comunitario
- **Forums**: Listado y navegación de foros
- **ForumTopic**: Tema específico de discusión
- **Messages**: Sistema de mensajería privada
- **Groups**: Grupos de interés o estudio
- **GroupDetail**: Página de un grupo específico

### Componentes UI

- **CommentSection**: Sección de comentarios para lecciones
- **CommentForm**: Formulario para crear/editar comentarios
- **MessageThread**: Hilo de conversación con otro usuario
- **ForumPost**: Publicación en un foro
- **GroupCard**: Tarjeta de información de grupo
- **MembersList**: Listado de miembros de un grupo

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/app/community` | CommunityHome | Página principal de comunidad |
| `/app/forums` | Forums | Listado de foros |
| `/app/forums/:id` | ForumTopic | Tema específico de foro |
| `/app/messages` | Messages | Bandeja de mensajes |
| `/app/messages/:conversationId` | MessageThread | Conversación específica |
| `/app/groups` | Groups | Listado de grupos |
| `/app/groups/:id` | GroupDetail | Información y actividad de un grupo |

## Hooks Personalizados

- **useComments**: Gestión de comentarios
- **useMessages**: Sistema de mensajería
- **useForums**: Interacción con foros
- **useGroups**: Gestión de grupos
- **useConversation**: Manejo de conversaciones individuales
- **useNotifications**: Notificaciones de actividad social

## Modelo de Datos

El módulo trabaja principalmente con estas tablas:

- `comments`: Comentarios en lecciones
- `conversations`: Conversaciones entre usuarios
- `conversation_participants`: Miembros de una conversación
- `messages`: Mensajes individuales
- `groups`: Grupos de interés
- `group_members`: Miembros de grupos
- `group_posts`: Publicaciones en grupos
- `follows`: Relaciones de seguimiento entre usuarios
- `notifications`: Notificaciones de actividad

## Flujos de Trabajo Principales

### Sistema de Comentarios

1. Visualización de comentarios en una lección
2. Creación de nuevo comentario
3. Respuestas a comentarios existentes
4. Moderación básica (reportes, respuestas)

### Mensajería Privada

1. Inicio de conversación con otro usuario
2. Envío de mensajes en tiempo real
3. Notificaciones de nuevos mensajes
4. Historial de conversaciones

### Grupos de Estudio

1. Exploración de grupos disponibles
2. Creación de nuevo grupo
3. Solicitud de ingreso a grupo
4. Publicaciones y discusiones en grupo
5. Administración de grupo (para creadores)

## Estado Actual

- ✅ Estructura base implementada
- 🔄 Sistema de comentarios en desarrollo
- 🔄 Mensajería básica en implementación
- ⏱️ Grupos pendientes
- ⏱️ Foros pendientes
- ⏱️ Sistema de notificaciones en tiempo real pendiente

## API y Funciones

### Consultas Principales

- **getComments**: Obtiene comentarios para una lección
- **getConversations**: Obtiene listado de conversaciones
- **getMessages**: Obtiene mensajes de una conversación
- **getGroups**: Obtiene grupos disponibles o propios

### Mutaciones

- **createComment**: Crea un nuevo comentario
- **sendMessage**: Envía mensaje en una conversación
- **createGroup**: Crea un nuevo grupo
- **joinGroup**: Solicita unirse a un grupo

## Consideraciones de Rendimiento

- Carga paginada de comentarios y mensajes
- Suscripciones en tiempo real para notificaciones
- Optimistic UI para acciones frecuentes
- Caché de conversaciones recientes

## Próximas Mejoras

- Sistema avanzado de notificaciones
- Chat en tiempo real
- Moderación comunitaria
- Menciones y etiquetas en comentarios
- Búsqueda avanzada en foros y grupos
- Archivos compartidos en grupos
- Eventos y calendario para grupos
