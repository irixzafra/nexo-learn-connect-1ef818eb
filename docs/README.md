
# Documentación de Nexo Learning

Este directorio contiene toda la documentación técnica del proyecto Nexo Learning, una plataforma educativa en línea.

## Estructura

La documentación está organizada en las siguientes secciones:

- [Arquitectura del Sistema](arquitectura-del-sistema.md)
- [Estructura de Navegación](estructura-navegacion.md)
- [Mapa de Rutas](MAPA_DE_RUTAS.md)
- [Administración](admin/administracion.md)
- [Componentes](components/README.md)
- [Base de Datos](database/README.md)
- [Seguridad](security/README.md)

## Estándares

La documentación sigue los [estándares definidos](DOCUMENTACION.md) para mantener la consistencia y facilitar el mantenimiento.

## Herramientas

Para gestionar la documentación, disponemos de las siguientes herramientas:

- `npm run normalize-docs` - Normaliza archivos, elimina duplicados y actualiza índices
- `npm run check-docs` - Verifica documentos obsoletos
- `npm run docs-index` - Genera un índice de la documentación

## Para Desarrolladores

Al actualizar o crear documentación:

1. Seguir las [convenciones de nomenclatura](DOCUMENTACION.md#convenciones-de-nomenclatura)
2. Actualizar la fecha al final del documento
3. Utilizar las plantillas disponibles en `docs/templates/`
4. Ejecutar `npm run normalize-docs` para asegurar la consistencia

## Índice Completo

Para un índice completo y actualizado de toda la documentación, consultar el archivo [docs-index.json](docs-index.json) generado automáticamente.
