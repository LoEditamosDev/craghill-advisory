# Craghill Advisory

Landing de servicios de LLC construida con Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, Framer Motion y Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- lucide-react
- Framer Motion
- Supabase JS Client
- Vercel ready

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Sin variables de Supabase, el formulario responde en modo demo. Con Supabase configurado, `/api/leads` guarda registros en la tabla `leads`.

## Supabase

Ejecuta la migración:

```sql
supabase/migrations/001_create_leads.sql
```

La migración crea:

- `public.leads` para leads del formulario
- políticas RLS básicas para inserts anónimos y gestión autenticada
- bucket privado `client-documents` para documentos futuros

## Assets

El hero usa `public/hero-placeholder.png` como imagen temporal. Reemplázalo luego por el `.webp` final del slider o actualiza la ruta en `src/components/landing-page.tsx`.

## Checks

```bash
npm run lint
npm run build
```
