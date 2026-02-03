# Resumen del Proyecto: Integración Híbrida WordPress + Next.js

Este documento resume la infraestructura y configuración implementada para desplegar el proyecto Web Alquimist.

## 1. Arquitectura Híbrida

Hemos implementado una arquitectura "Headless" híbrida que combina desarrollo local seguro con despliegue en la nube.

| Componente | Tecnología | Ubicación | Rol | URL |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Next.js (App Router) | Vercel | Interfaz de Usuario (SSR/ISR) | `https://alquimist.dpdns.org` |
| **Backend** | WordPress Docker | Local (PC) | CMS / API Provider | `https://blog-dev.alquimist.dpdns.org` |
| **Conexión** | Cloudflare Tunnel | Docker | Túnel Seguro (Proxy) | - |
| **DNS** | Cloudflare | Nube | Gestión de Dominios | - |

## 2. Decisiones de Infraestructura (DevOps)

### A. Del DNS Local al Túnel Global
Originalmente, intentamos usar un DNS local (`dnsmasq`) para simular un dominio. Sin embargo, para permitir que **Vercel** (en la nube) consumiera la API local sin exponer puertos peligrosos, migramos a **Cloudflare Tunnel**.
*   **Beneficio:** SSL nativo, sin abrir puertos en el router, accesible globalmente para Vercel.

### B. Gestión de Dominios
Se configuró el dominio `alquimist.dpdns.org` en Cloudflare.
*   **Frontend (Raíz):** Apunta a Vercel.
*   **Backend (Subdominio):** `blog-dev` apunta al Túnel que corre en tu Docker local.

## 3. Guías de Configuración Creadas

Se ha generado documentación detallada para cada componente crítico:

*   [Guía de Cloudflare Tunnel](cloudflare-tunnel.md): Cómo conectar el Docker local a internet.
*   [Guía de Dominio Vercel](vercel-domain-setup.md): Cómo configurar el dominio en Vercel y los registros DNS.
*   [Guía de Arquitectura](architecture.md): Detalles técnicos del flujo de datos en Next.js.
*   [Docker Compose](../docker-env/docker-compose.yml): Definición de servicios (MySQL, WordPress, Tunnel).

## 4. Variables de Entorno Clave

### En Vercel
*   `NEXT_PUBLIC_WORDPRESS_API_URL`: `https://blog-dev.alquimist.dpdns.org/wp-json/wp/v2`
    *   *Nota: Es crucial incluir el sufijo `/wp/v2` para que `lib/wordpress.js` funcione correctamente.*

### En Local (.env)
*   `TUNNEL_TOKEN`: El token secreto de Cloudflare Zero Trust.

---
*Documento generado el 03/02/2026 tras la sesión de configuración de infraestructura.*
