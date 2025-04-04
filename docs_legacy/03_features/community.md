
# Módulo de Comunidad

Este módulo implementa las funcionalidades sociales y de comunidad en Nexo Learning Platform, permitiendo a los usuarios interactuar, compartir conocimientos y participar en actividades colaborativas.

## Descripción Funcional

### Feed de Actividad
El feed de actividad es la interfaz principal del módulo de comunidad, mostrando:
- Posts de usuarios seguidos
- Actividad reciente de la comunidad
- Contenido destacado por categorías
- Anuncios oficiales de la plataforma

### Sistema de Gamificación
La plataforma implementa mecánicas de gamificación para fomentar la participación:
- Puntos por actividades (completar cursos, publicar, comentar)
- Niveles de usuario basados en puntos acumulados
- Insignias por logros específicos
- Tabla de clasificación (Leaderboard)

### Interacciones Sociales
Los usuarios pueden interactuar entre sí mediante:
- Creación de posts con texto enriquecido y multimedia
- Comentarios en posts y contenido educativo
- Reacciones (likes, útil, etc.)
- Seguimiento a otros usuarios
- Mensajería directa

## Esquema BD

### Posts
```
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
content TEXT NOT NULL
media_urls JSONB
is_public BOOLEAN DEFAULT true
category_id UUID REFERENCES post_categories(id)
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

### Post_Comments
```
id UUID PRIMARY KEY
post_id UUID REFERENCES posts(id)
user_id UUID REFERENCES profiles(id)
content TEXT NOT NULL
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

### Post_Likes
```
id UUID PRIMARY KEY
post_id UUID REFERENCES posts(id)
user_id UUID REFERENCES profiles(id)
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

### Follows
```
id UUID PRIMARY KEY
follower_id UUID REFERENCES profiles(id)
following_id UUID REFERENCES profiles(id)
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

### User_Points
```
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
total_points INTEGER DEFAULT 0
points_history JSONB
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

### Badges
```
id UUID PRIMARY KEY
name TEXT NOT NULL
description TEXT
icon_url TEXT NOT NULL
badge_type BADGE_TYPE NOT NULL
points INTEGER DEFAULT 0
requirements JSONB
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

### User_Badges
```
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
badge_id UUID REFERENCES badges(id)
awarded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
```

## Políticas RLS

Las siguientes políticas de Row Level Security (RLS) están implementadas para proteger los datos del módulo de comunidad:

```sql
-- Políticas para posts
CREATE POLICY "Cualquiera puede ver posts públicos"
ON posts FOR SELECT
USING (is_public = true);

CREATE POLICY "Usuarios pueden ver sus propios posts privados"
ON posts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden crear sus propios posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar sus propios posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar sus propios posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- Políticas similares para comentarios, likes y otras entidades
```

## Funciones RPC/API

### Feed y Posts
- `get_user_feed(user_id, page, page_size)`: Obtiene el feed personalizado
- `get_trending_posts(category_id, limit)`: Obtiene posts populares
- `create_post(content, media_urls, category_id, is_public)`: Crea un nuevo post

### Interacciones Sociales
- `like_post(post_id)`: Añade/quita like a un post
- `follow_user(user_id_to_follow)`: Sigue a un usuario
- `unfollow_user(user_id_to_unfollow)`: Deja de seguir a un usuario

### Gamificación
- `get_leaderboard(limit)`: Obtiene la tabla de clasificación
- `get_user_points(user_id)`: Obtiene los puntos de un usuario
- `get_user_badges(user_id)`: Obtiene las insignias de un usuario
- `award_points(user_id, points, activity_type)`: Otorga puntos por actividad

## Componentes Principales

### Componentes de Feed
- `CommunityFeed`: Contenedor principal del feed de actividad
- `PostItem`: Visualización de un post individual
- `CreatePostForm`: Formulario para crear nuevos posts
- `PostEditorView`: Editor rico para contenido de posts

### Componentes de Gamificación
- `UserLevelChart`: Visualización del nivel y progreso
- `Leaderboard`: Tabla de clasificación de usuarios
- `BadgeDisplay`: Visualización de insignias obtenidas

### Hooks Relevantes
- `useCommunityFeed`: Gestión del feed de actividad
- `useLeaderboard`: Acceso a datos de la tabla de clasificación
- `useUserPoints`: Acceso a los puntos y nivel del usuario
- `usePostInteractions`: Gestión de likes y comentarios

## Estrategias de Escalabilidad

El módulo está diseñado para manejar un volumen creciente de interacciones sociales mediante:

1. **Paginación eficiente**: Carga incremental de contenido
2. **Caché selectiva**: Almacenamiento en caché de contenido popular
3. **Optimizaciones de consultas**: Índices y consultas optimizadas
4. **Procesamiento asíncrono**: Tareas en segundo plano para cálculos intensivos
