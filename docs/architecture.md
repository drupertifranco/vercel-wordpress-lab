# Documentación Técnica: Headless WordPress Frontend

Este documento detalla la arquitectura técnica y las decisiones de diseño del frontend en Next.js.

## Arquitectura

La aplicación utiliza un patrón **Headless**, donde WordPress actúa únicamente como gestor de contenidos (CMS) y proveedor de APIs, mientras que Next.js se encarga de la presentación.

### Diagrama de Flujo de Datos

1.  **Browser**: Solicita `https://sitio.com/blog/mi-post`.
2.  **Next.js (Servidor)**:
    - Identifica la ruta dinámica `[slug]`.
    - Llama a `getPostBySlug(slug)` en `lib/wordpress.js`.
3.  **Service Layer**:
    - Hace un `fetch` a `WP_API_URL/wp/v2/posts?slug=mi-post&_embed`.
4.  **WordPress API**: Retorna JSON con el post y sus metadatos (autor, imagenes).
5.  **Next.js (Render)**:
    - Genera el HTML con el contenido.
    - Optimiza imágenes usando `next/image`.
6.  **Response**: Entrega el HTML listo al navegador.

## Capa de Servicios (`lib/wordpress.js`)

Es el núcleo de la comunicación con WordPress.

### Funciones Principales

-   `getAllPosts(limit)`:
    -   Obtiene una lista de posts recientes.
    -   Argumentos: `limit` (default: 10).
    -   Retorna: Array de objetos `Post`.

-   `getPostBySlug(slug)`:
    -   Buca un post específico por su slug.
    -   Retorna: Objeto `Post` o `null` si no existe.

### Manejo de Errores

Las funciones envuelven las llamadas a `fetch` en bloques `try/catch`. En caso de fallo (conexión rechazada, timeout), retornan valores seguros (arrays vacíos o `null`) para evitar que el build de Next.js falle completamente.

## Consideraciones de Seguridad

-   **HTML Render**: Se utiliza `dangerouslySetInnerHTML` para renderizar el contenido que viene de WordPress. **Importante**: Confiar en la fuente (tu propio CMS). Si se acepta contenido de usuarios, sería necesario sanitizar el HTML.
-   **No Auth**: Esta implementación solo consume endpoints públicos (GET). No maneja autenticación ni escritura en la base de datos de WP.

## Despliegue (Vercel)

El proyecto está optimizado para Vercel:
1.  Las imágenes externas requiren configuración en `next.config.mjs` (`remotePatterns`).
2.  La variable `NEXT_PUBLIC_WORDPRESS_API_URL` debe configurarse en el panel de Vercel.
