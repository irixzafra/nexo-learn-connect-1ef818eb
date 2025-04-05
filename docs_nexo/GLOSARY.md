# Glosario de Términos del Proyecto Nexo

Este documento define la terminología clave utilizada en el desarrollo y la documentación del proyecto Nexo para asegurar una comunicación clara y consistente.

## 1. Elementos de la Interfaz de Usuario (UI)

*   **`Página` (o `Vista`):**
    *   Una pantalla principal de la aplicación asociada a una URL específica (ruta), que ocupa el área de contenido central y presenta información o funcionalidades al usuario.
    *   *Ejemplos:* Página de Inicio de Sesión (`/auth/login`), Dashboard del Participante (`/app/dashboard`), Página de Gestión de Usuarios (`/app/admin/users`).

*   **`Layout`:**
    *   La estructura visual general que organiza los `Elementos de Navegación Global` y el área de contenido principal de una `Página`. Define la disposición general (dónde va el header, la sidebar, etc.).
    *   *Ejemplos:* `AppLayout` (para usuarios autenticados), `AdminLayout` (variante para administradores), `AuthLayout` (para páginas de autenticación).

*   **`Elemento de Navegación Global`:**
    *   Componente UI persistente o semi-persistente que ayuda al usuario a orientarse y moverse entre las `Páginas` o secciones principales de la aplicación.
    *   *Ejemplos Específicos:*
        *   **`Header` (Cabecera):** Barra superior, generalmente con logo, acciones rápidas, menú de usuario.
        *   **`Sidebar` (Barra Lateral):** Menú vertical (usualmente izquierdo) con la estructura de navegación jerárquica principal, a menudo específica por rol y colapsable.
        *   **`Footer` (Pie de Página Global):** Barra inferior común a la mayoría de las páginas (si existe), con información legal, enlaces, etc.
        *   **`Sidebar Footer` (Pie de Sidebar):** Sección inferior *dentro* de la `Sidebar` con acciones como idioma, tema, logout, cambio de rol.
        *   **`Breadcrumbs` (Migas de Pan):** Indicador de ruta jerárquica de la página actual (ej. Inicio > Cursos > Mi Curso). *(Planeado/Futuro)*

*   **`Elemento de Navegación Interna de Página`:**
    *   **Propósito:** Componentes UI utilizados *dentro* de una `Página` para organizar su contenido o permitir la navegación entre sub-secciones de la misma página sin cambiar la URL principal drásticamente.
    *   **Ejemplos Específicos:**
        *   **`Tabs` (Pestañas):** Componente que muestra diferentes paneles de contenido dentro del mismo espacio de la página, permitiendo al usuario cambiar entre ellos haciendo clic en las cabeceras de las pestañas. (ej. Usado en `/app/admin/users` para cambiar entre "Lista de Usuarios" y "Gestión de Roles").
        *   **`Stepper` (Pasos):** Componente que guía al usuario a través de un proceso de varios pasos (ej. un wizard de configuración o un formulario multi-página), mostrando el progreso y permitiendo navegar entre pasos.
        *   **`Accordion` (Acordeón):** Componente que permite mostrar/ocultar secciones de contenido dentro de una página haciendo clic en sus cabeceras. Útil para FAQs o contenido extenso.
        *   **`Menú Secundario / Submenú:`** Enlaces de navegación adicionales específicos de una sección o página, que pueden aparecer bajo el header o en una barra lateral secundaria dentro del área de contenido.

*   **`Widget Funcional` (o `Módulo de Página`):**
    *   Un bloque o componente **dentro de una `Página`** que encapsula una **funcionalidad específica y autocontenida**. Muestra información dinámica (a menudo conectada a datos) o permite interacciones concretas. Es una "mini-aplicación" dentro de la página.
    *   *Ejemplos:* Widget de Estadísticas, Lista "Mis Cursos", Tabla de Usuarios con Filtros, Formulario de Edición de Perfil, Visor de Lecciones, Gráfico de Progreso.

*   **`Componente UI Base` (o `Componente de Diseño`):**
    *   Bloque de construcción fundamental y reutilizable de la interfaz, definido por el `DESIGN_SYSTEM.md` (basado en `shadcn/ui` y Tailwind). Se utilizan para construir `Páginas`, `Widgets Funcionales` y otros elementos. No suelen tener lógica de negocio compleja por sí mismos.
    *   *Ejemplos:* `Button`, `Card`, `Input`, `Avatar`, `Table`, `Dialog`, `Tooltip`, `Badge`, `Switch`.

## 2. Conceptos de Desarrollo y Arquitectura

*   **`Funcionalidad Transversal`:**
    *   Una capacidad del sistema que no está limitada a una única `Página` o `Widget Funcional`, sino que afecta a múltiples partes de la aplicación.
    *   *Ejemplos:* Autenticación y Autorización, Sistema Multi-idioma (i18n), Gestión de Temas (Claro/Oscuro), Notificaciones Toast, Sistema de Feature Flags, Role Switching (Admin).

*   **`SPA (Single Page Application)`:**
    *   Tipo de aplicación web donde la navegación entre `Páginas` ocurre principalmente en el navegador del cliente sin recargar la página HTML completa, ofreciendo una experiencia más fluida. (Nuestra arquitectura).

*   **`Feature-based`:**
    *   Estructura de organización del código donde los archivos relacionados con una característica o dominio funcional específico (ej. cursos, usuarios) se agrupan juntos, en lugar de agruparlos por tipo técnico (ej. todos los componentes en una carpeta, todos los servicios en otra).

*   **`Serverless`:**
    *   Arquitectura donde la lógica del backend se ejecuta en servicios gestionados (como Supabase Functions) que escalan automáticamente, sin necesidad de administrar servidores directamente.

*   **`Supabase`:**
    *   Plataforma Backend-as-a-Service (BaaS) que usamos. Provee base de datos (PostgreSQL), autenticación, almacenamiento, APIs y funciones serverless.

*   **`PostgreSQL`:**
    *   El sistema de gestión de bases de datos relacionales que utiliza Supabase.

*   **`RLS (Row Level Security)`:**
    *   Característica de PostgreSQL (usada por Supabase) que permite definir políticas de seguridad para controlar qué filas de una tabla puede ver o modificar cada usuario.

*   **`Edge Function`:**
    *   Funciones serverless (código backend) que se ejecutan en la red de Supabase, cerca del usuario, para lógica personalizada o tareas intensivas.

*   **`React Query (TanStack Query)`:**
    *   Librería que usamos en el frontend para gestionar la obtención, caché, sincronización y actualización de datos del servidor (Supabase). Simplifica el manejo del estado del servidor.

*   **`Context API`:**
    *   Mecanismo de React para compartir estado global (como información del usuario autenticado o el tema actual) entre componentes sin pasarlo manualmente a través de props.

*   **`Tailwind CSS`:**
    *   Framework CSS de "utilidades primero" que usamos para estilizar rápidamente la interfaz aplicando clases directamente en el HTML/JSX.

*   **`shadcn/ui`:**
    *   Colección de `Componentes UI Base` reutilizables, construidos sobre Radix UI y estilizados con Tailwind CSS, que usamos como base de nuestro `DESIGN_SYSTEM.md`.

*   **`Vite`:**
    *   Herramienta de build y servidor de desarrollo extremadamente rápida que usamos para el frontend React/TypeScript.

*   **`pnpm`:**
    *   Gestor de paquetes rápido y eficiente en uso de disco que usamos para manejar las dependencias del proyecto (alternativa a npm/yarn).

*   **`Storybook`:**
    *   Herramienta para desarrollar y visualizar `Componentes UI Base` y `Widgets Funcionales` de forma aislada, facilitando la iteración y documentación visual. *(Pendiente de implementación/verificación)*.

*   **`i18n (Internacionalización)`:**
    *   El proceso de diseñar y preparar la aplicación para que pueda ser adaptada a diferentes idiomas y regiones. *(Pendiente de implementación)*.

*   **`Feature Flag`:**
    *   Mecanismo para activar o desactivar `Funcionalidades Transversales` o `Widgets Funcionales` específicos de forma remota, sin necesidad de redesplegar código. Permite lanzamientos graduales o pruebas A/B.

## 3. Términos de Estado y Calidad (Usados en Auditorías)

*   **`Placeholder`:**
    *   Elemento (Página, Widget, Componente) presente en la estructura o UI básica, pero sin funcionalidad real o lógica significativa implementada todavía. Sirve como un marcador de posición para desarrollo futuro.

*   **`Mock Data`:**
    *   Datos falsos o de ejemplo utilizados durante el desarrollo o en `Placeholders` para simular la apariencia de la UI antes de que la conexión a datos reales esté completa.

*   **`Estado Percibido (Indicadores)`:**
    *   `✅ Funcional:` Parece completo y operativo según su propósito definido.
    *   `⚠️ Parcial:` Implementado en parte, con limitaciones o funcionalidades clave faltantes.
    *   `🚧 Placeholder:` Existe la estructura/UI básica, pero sin lógica funcional o con datos mock.
    *   `❌ Con Errores:` Se detectan problemas claros, no funciona como se espera o causa fallos.
    *   `🤔 Desconocido/No Determinado:` No se pudo evaluar el estado con la información disponible.

*   **`Conexión DB (Indicadores):`**
    *   `✅ Sí:` Parece estar obteniendo/guardando datos reales de Supabase correctamente.
    *   `⚠️ Parcialmente:` Usa una mezcla de datos reales y mock, o la conexión es incompleta.
    *   `❌ No:` No hay conexión aparente a datos reales; usa solo datos mock o está vacío.
    *   `💾 N/A:` No aplica (ej. componente puramente visual, página estática).

*   **`Diseño (Indicadores):`**
    *   `✅ Alta:` Sigue fielmente el `DESIGN_SYSTEM.md` (colores, espaciado, tipo, componentes).
    *   `⚠️ Media:` Sigue el Design System en general, pero presenta algunas inconsistencias menores.
    *   `❌ Baja:` Se desvía notablemente del Design System o tiene problemas visuales evidentes.
    *   `✨ N/A:` No aplica (ej. funcionalidad puramente lógica).