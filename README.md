# Headless WordPress Frontend (Next.js)

Una aplicación web moderna construida con **Next.js** y **Tailwind CSS** que actúa como frontend para un sitio de WordPress headless.

## Características

- **Stack Moderno**: Next.js 14+ (App Router), React, Tailwind CSS.
- **Headless CMS**: Consume contenido de WordPress vía REST API.
- **Optimizado**: Generación estática y manejo eficiente de imágenes con `next/image`.
- **Diseño**: UI limpia y responsive con Tailwind CSS.

## Requisitos Previos

- Node.js 18.17.0 o superior.
- Un sitio de WordPress con la REST API habilitada (viene por defecto en WP 4.7+).

## Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone <tu-repositorio-url>
    cd vercel-wordpress
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto basándote en el archivo de ejemplo o usa el siguiente formato:

    ```env
    NEXT_PUBLIC_WORDPRESS_API_URL=https://tu-sitio-wordpress.com/wp-json
    ```

4.  **Correr el Servidor de Desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

- `app/`: Rutas de la aplicación (Home, Post Detail).
- `lib/`: Capa de servicios y lógica de fetch (`wordpress.js`).
- `docs/`: Documentación técnica detallada.

## Documentación Técnica

Para más detalles sobre la arquitectura y la integración con la API, consulta la carpeta `/docs`.
