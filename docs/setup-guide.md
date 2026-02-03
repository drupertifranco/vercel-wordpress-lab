# Guía de Instalación y Despliegue

## 1. Claves de Configuración

Para que la aplicación funcione correctamente, es crítico configurar la siguiente variable de entorno:

### NEXT_PUBLIC_WORDPRESS_API_URL
Esta es la URL base de tu instalación de WordPress, terminando en `/wp-json`.
- **Correcto**: `https://mi-blog.com/wp-json`
- **Incorrecto**: `https://mi-blog.com` (Falta /wp-json)
- **Incorrecto**: `https://mi-blog.com/wp-json/` (Slash al final)

## 2. Configuración de Next.js (`next.config.mjs`)

Por seguridad, Next.js no carga imágenes de dominios externos por defecto.

El archivo `next.config.mjs` ya incluye una configuración permisiva para desarrollo:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**', // Permite todos los dominios
    },
  ],
},
```
**Recomendación para Producción:**
Cambia `hostname: '**'` por el dominio real de tu WordPress, por ejemplo `hostname: 'mi-blog.com'`.

## 3. Despliegue en Vercel

### Paso 1: Crear Proyecto
1. Ve a [Vercel Dashboard](https://vercel.com).
2. "Add New..." -> "Project".
3. Importa tu repositorio de Git.

### Paso 2: Variables de Entorno
En la pantalla de configuración de "Deploy":
1. Abre la sección "Environment Variables".
2. Añade `NEXT_PUBLIC_WORDPRESS_API_URL` con el valor de tu API.

### Paso 3: Deploy
Haz clic en "Deploy". Vercel instalará las dependencias y construirá el sitio estático.
