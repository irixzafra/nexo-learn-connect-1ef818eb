
## CORE-UI-EDIT-01: Edición Inline y Reordenamiento de Contenido

### Resumen
Sistema que permite a los administradores editar textos directamente en la página y reorganizar elementos de la interfaz. Proporciona feedback visual y notificaciones durante la edición.

### Componentes Clave
- **EditModeContext**: Gestiona el estado global del modo de edición y proporciona funciones para actualizar textos y reordenar elementos.
- **InlineEdit**: Componente que convierte cualquier elemento en un campo editable cuando se activa el modo de edición.
- **DraggableContent**: Componente que permite reordenar elementos mediante arrastrar y soltar cuando el modo de edición está activo.

### Base de Datos
- Utiliza tablas existentes con campos de texto editables.
- Para la reordenación, requiere campos de orden en las tablas correspondientes.

### Puntos de Integración
- **EditModeToggle**: Botón en la barra de navegación para activar/desactivar el modo de edición.
- **Toasts**: Proporciona retroalimentación sobre las acciones de edición y reordenamiento.
- **Sonner**: Librería utilizada para las notificaciones toast.

### Flujo de Uso
1. El administrador activa el modo de edición desde la barra de navegación.
2. Los textos editables muestran indicadores visuales al pasar el cursor.
3. Al hacer clic en un texto, aparece un campo de entrada con botones de guardar/cancelar.
4. Para reordenar elementos, el administrador arrastra los items usando los controladores visibles.
5. Al desactivar el modo de edición, todas las modificaciones quedan guardadas y se muestra una notificación.

### Implementación de Seguridad
- Solo los usuarios con rol de administrador pueden ver y utilizar el toggle de edición.
- Las operaciones de actualización están protegidas mediante RLS a nivel de BD.
- Validaciones para evitar textos vacíos o incorrectos.

### Uso del Sistema
```tsx
// Ejemplo de uso de InlineEdit
<InlineEdit 
  table="content" 
  id="page-title" 
  field="text" 
  value="Título de la página" 
  as="h1"
  className="text-3xl font-bold"
/>

// Ejemplo de uso de DraggableContent
<DraggableContent 
  items={itemsArray}
  table="content_items"
  className="grid grid-cols-3 gap-4"
/>
```

### Limitaciones y Consideraciones
- La edición inline está diseñada principalmente para textos y no para contenido enriquecido.
- El reordenamiento funciona mejor con colecciones homogéneas de elementos.
- Requiere configuración de la base de datos con campos de orden apropiados.

## CORE-PROFILE-EDIT-01: Edición Básica de Perfil

### Resumen
Funcionalidad que permite a los usuarios editar y actualizar su nombre completo en su perfil desde la interfaz de usuario. Proporciona validación de datos, retroalimentación visual y notificaciones sobre el resultado de la operación.

### Componentes Clave
- **useProfileEdit**: Hook personalizado que utiliza React Query para manejar la mutación de actualización del perfil.
- **ProfileEditForm**: Componente de formulario que utiliza React Hook Form para la validación y gestión del estado del formulario.
- **Form**: Componentes de shadcn/ui utilizados para construir el formulario con un diseño consistente.

### Base de Datos
- Actualiza el campo `full_name` en la tabla `profiles` para el usuario autenticado.
- Utiliza la función `update` de Supabase para modificar el registro correspondiente.

### SQL
```sql
-- Esta funcionalidad utiliza la tabla profiles existente
-- Operación de actualización:
UPDATE profiles
SET full_name = 'Nuevo Nombre', updated_at = now()
WHERE id = 'user-id';
```

### Puntos de Integración
- **AuthContext**: Obtiene información del usuario autenticado.
- **React Query**: Gestiona el estado de la mutación (loading, error, success).
- **Sonner Toast**: Proporciona notificaciones de éxito o error.

### Flujo de Uso
1. El usuario navega a la página de perfil (`/profile`).
2. El usuario hace clic en el botón "Editar Perfil".
3. Se muestra un formulario con el nombre actual prellenado.
4. El usuario modifica su nombre y hace clic en "Guardar cambios".
5. Se valida el formulario (nombre no vacío y mínimo 2 caracteres).
6. Se envía la solicitud a Supabase para actualizar el perfil.
7. Se muestra una notificación de éxito o error según corresponda.
8. En caso de éxito, la interfaz se actualiza para mostrar el nuevo nombre.

### Implementación de Seguridad
- La actualización está limitada al propio perfil del usuario autenticado.
- Validación en el cliente para garantizar datos correctos.
- El campo de rol está deshabilitado para evitar modificaciones no autorizadas.
- Las operaciones de actualización requieren autenticación válida en Supabase.

### Uso del Sistema
```tsx
// Ejemplo de uso del hook useProfileEdit
const profileMutation = useProfileEdit(userId);
profileMutation.mutate({ full_name: "Nuevo Nombre" });

// Ejemplo de uso del formulario
<ProfileEditForm
  profile={userProfile}
  user_id={userId}
  onSuccess={handleEditSuccess}
/>
```

### Limitaciones y Consideraciones
- Solo permite editar el nombre completo, no otros campos del perfil.
- El campo de rol se muestra pero está deshabilitado (solo administradores pueden cambiar roles).
- Se requiere un mínimo de 2 caracteres para el nombre para asegurar datos válidos.
