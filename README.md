# Asistente Tributario RD

Incluye:

- Chat tributario con diccionario interno.
- Fallback a IA cuando no encuentra una palabra o consulta.
- Módulos IR-2, IT-1, IR-3 y TSS.
- Contenido Pro visible para usuarios Pro.
- Vista de prueba para Usuario Pro / Usuario Gratis.

## Instalación

```bash
npm install
npm run dev
```

## Variable de entorno

Crea un archivo `.env.local` y coloca:

```env
OPENAI_API_KEY=tu_clave_de_openai
```

## Nota importante

El endpoint `/app/api/tax-ai/route.js` está diseñado para Next.js.  
Si usas Vite puro, debes mover ese endpoint a un backend separado, por ejemplo Express, Node, Supabase Functions, Vercel Functions o Netlify Functions.

Para producción real, conecta `isProUser` con el plan real del usuario desde tu sistema de autenticación o base de datos.
