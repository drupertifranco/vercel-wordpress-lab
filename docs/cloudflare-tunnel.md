# Guía de Configuración: Cloudflare Tunnel para WordPress Local

Esta guía detalla cómo exponer tu entorno de desarrollo local de WordPress a internet de forma segura utilizando Cloudflare Tunnel.

## ¿Qué es Cloudflare Tunnel?

Cloudflare Tunnel crea una conexión segura y encriptada entre tu máquina local y la red de Cloudflare sin necesidad de abrir puertos en tu router o configurar firewall.

## Requisitos Previos

1.  Una cuenta en [Cloudflare](https://dash.cloudflare.com/).
2.  Un dominio activo gestionado por Cloudflare.
3.  Docker instalado.

## Paso 1: Crear el Tunnel en Cloudflare

1.  Inicia sesión en **Cloudflare Zero Trust** (si no tienes cuenta, habilitar Zero Trust es gratuito).
2.  Navega a **Networks > Tunnels**.
3.  Haz clic en **Create a Tunnel**.
4.  Selecciona **Cloudflared** como tipo de conector y da clic en **Next**.
5.  Asigna un nombre a tu túnel (ej: `wordpress-local`) y guarda.

## Paso 2: Obtener el Token

En la pantalla de instalación ("Install and run a connector"), verás instrucciones para varios sistemas operativos. Busca la sección de Docker o simplemente copia el token largo que aparece en el comando:

`cloudflared.exe service install eyJhIj...`

**Solo necesitamos la cadena que empieza por `eyJhIj...`. Copia este token.**

## Paso 3: Configurar el Entorno Local

1.  En la carpeta `docker-env`, crea un archivo llamado `.env`.
2.  Pega tu token en el archivo con el siguiente formato:

    ```env
    TUNNEL_TOKEN=eyJhIjoi... (tu token completo aquí)
    ```

## Paso 4: Configurar el Hostname Público

1.  De vuelta en el dashboard de Cloudflare, tras copiar el token, haz clic en **Next**.
2.  En la pestaña **Public Hosts**, añade un nuevo host:
    *   **Subdomain**: (ej: `blog-dev`)
    *   **Domain**: Selecciona tu dominio (ej: `misitio.com`)
    *   **Service**:
        *   **Type**: `HTTP`
        *   **URL**: `wordpress:80` (Nota: Usamos el nombre del servicio Docker `wordpress` y el puerto interno `80`).

3.  Guarda el túnel ("Save Tunnel").

## Paso 5: Desplegar

Ejecuta el entorno con Docker Compose:

```bash
cd docker-env
docker-compose up -d
```

Verifica que el túnel esté corriendo:

```bash
docker-compose logs tunnel
```

Deberías ver mensajes indicando `Registered tunnel connection`.

## Validación

Abre tu navegador y visita `https://blog-dev.misitio.com` (o el dominio que configuraste). Deberías ver tu instalación local de WordPress.
