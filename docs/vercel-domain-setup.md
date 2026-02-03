# Guía de Configuración: Dominio Personal en Vercel con Cloudflare

Esta guía explica cómo conectar tu dominio `alquimist.dpdns.org` (gestionado en Cloudflare) a tu proyecto de Vercel.

## Paso 1: Agregar el Dominio en Vercel

1.  Ve a tu Dashboard de **Vercel**.
2.  Selecciona tu proyecto (`vercel-wordpress`).
3.  Navega a **Settings** > **Domains**.
4.  Introduce tu dominio: `alquimist.dpdns.org`.
5.  Haz clic en **Add**.

Vercel te mostrará una configuración requerida. Normalmente para un subdominio o un dominio principal gestionado externamente, te pedirá configurar registros DNS.

## Paso 2: Configurar DNS en Cloudflare

Dependiendo de lo que Vercel te pida, deberás configurar un registro en Cloudflare.

### Opción A: Vercel pide un registro A (para dominios raíz)
Si Vercel te pide apuntar a una IP:
1.  En Cloudflare, ve a **DNS** > **Records**.
2.  Crea un registro **A**.
    *   **Name**: `alquimist` (o `@` si es el raíz de tu zona).
    *   **IPv4 Address**: `76.76.21.21` (La IP estándar de Vercel).
    *   **Proxy status**: Puedes dejarlo en **Proxied** (nube naranja) o **DNS Only** (nube gris). Se recomienda **DNS Only** inicial para validación rápida, pero **Proxied** funciona si ajustas el SSL (ver Paso 3).

### Opción B: Vercel pide un CNAME (para subdominios)
Si Vercel te pide apuntar a `cname.vercel-dns.com`:
1.  En Cloudflare, ve a **DNS** > **Records**.
2.  Crea un registro **CNAME**.
    *   **Name**: `alquimist` (o el subdominio que corresponda).
    *   **Target**: `cname.vercel-dns.com`.
    *   **Proxy status**: Igual que arriba.

## Paso 3: Configuración Crítica de SSL (Si usas Proxy de Cloudflare)

Si dejas la nube en color **Naranja (Proxied)** en Cloudflare, es **CRUCIAL** que ajustes la configuración SSL para evitar errores de "Too many redirects":

1.  En Cloudflare, ve a **SSL/TLS**.
2.  Cambia el modo de encriptación a **Full** o **Full (Strict)**.
    *   **Nunca** uses "Flexible" con Vercel.

## Verificación

1.  Vuelve a Vercel y espera que los checks de validación se pongan en verde.
2.  Tu sitio debería estar accesible en `https://alquimist.dpdns.org`.

> **Nota:** Ya hemos pre-configurado tu `next.config.mjs` para permitir imágenes desde este dominio, así que las imágenes de WordPress deberían cargar correctamente.
