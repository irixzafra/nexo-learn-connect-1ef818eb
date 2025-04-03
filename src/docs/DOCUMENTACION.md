
# Estándares de Documentación

## Convenciones de Nomenclatura

Para mantener una documentación consistente y fácil de mantener, se deben seguir estas convenciones:

### Archivos y Carpetas

1. **Nombres en minúsculas**: Todos los archivos y carpetas de documentación deben usar nombres en minúsculas, separados por guiones si es necesario.
   - ✅ `estructura-navegacion.md`
   - ❌ `ESTRUCTURA_NAVEGACION.md`

2. **Sin prefijos numéricos**: No usar prefijos numéricos como `01_`, `02_` en nombres de archivos o carpetas.
   - ✅ `arquitectura/`
   - ❌ `01_arquitectura/`

3. **Extensión .md**: Todos los documentos deben usar la extensión `.md` en minúsculas.
   - ✅ `index.md`
   - ❌ `index.MD`

4. **README.md**: La única excepción es el archivo `README.md` que puede usar mayúsculas.

### Estructura de Contenido

1. **Título principal**: Cada documento debe comenzar con un título principal (`# Título`).

2. **Secciones**: Usar encabezados de nivel 2 (`## Sección`) para dividir el contenido principal.

3. **Subsecciones**: Usar encabezados de nivel 3 y 4 (`### Subsección`, `#### Detalles`) para detalles más específicos.

4. **Fecha de actualización**: Incluir al final del documento la fecha de la última actualización:
   ```
   ---
   
   Última actualización: [YYYY-MM-DD]
   ```

## Estructura de Directorios

La documentación se organiza en las siguientes carpetas principales:

- `src/docs/` - Directorio raíz de la documentación
  - `architecture/` - Arquitectura del sistema
  - `features/` - Documentación de funcionalidades
  - `guides/` - Guías y tutoriales
  - `modules/` - Módulos del sistema
  - `tech/` - Documentación técnica

## Herramientas de Gestión

Para mantener la documentación, usar:

1. **Script de normalización**: `npm run normalize-docs` - Normaliza nombres de archivos y elimina duplicados.

2. **Script de verificación**: `npm run check-docs` - Verifica documentos obsoletos y problemas de formato.

3. **Generador de índice**: `npm run generate-docs-index` - Genera un índice actualizado de la documentación.

## Proceso de Actualización

1. Al crear documentación nueva, usar las plantillas disponibles en `src/docs/templates/`.

2. Al actualizar documentación existente, asegurarse de modificar la fecha de última actualización.

3. Ejecutar periódicamente los scripts de mantenimiento para mantener la calidad y coherencia.

## Convenciones Adicionales

1. **Enlaces internos**: Usar enlaces relativos para referenciar otros documentos dentro del proyecto.
   ```markdown
   [Arquitectura del Sistema](../architecture/overview.md)
   ```

2. **Imágenes**: Almacenar las imágenes en `src/docs/assets/` y referenciarlas con rutas relativas.
   ```markdown
   ![Diagrama de arquitectura](../assets/architecture-diagram.png)
   ```

3. **Tablas**: Usar tablas markdown para información estructurada.

4. **Bloques de código**: Especificar el lenguaje en los bloques de código para mejorar el resaltado.
   ```markdown
   ```typescript
   const example: string = 'Ejemplo de código';
   ```
   ```

---

Última actualización: 2024-07-31
