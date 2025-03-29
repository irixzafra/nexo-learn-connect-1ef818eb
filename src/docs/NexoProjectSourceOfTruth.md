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
