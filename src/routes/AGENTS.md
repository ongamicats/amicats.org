# routes/

> Inherits all rules from [`../../AGENTS.md`](../../AGENTS.md). Only route-specific additions below.

## Role

File-based routes for TanStack Router. Each file in this directory becomes a route. The generated route tree (`src/routeTree.gen.ts`) is built automatically by the router plugin.

## Structure

```txt
routes/
├── __root.tsx           # Root layout (HTML shell, head, providers)
├── index.tsx            # "/" route
├── landing/
│   ├── index.tsx        # "/landing/" route
│   └── -components/     # Route-scoped UI (ignored by router)
├── app.tsx              # "/app" layout route
│   └── app/
│       └── home/
│           └── index.tsx  # "/app/home" route
└── not-found/
    └── index.tsx        # 404 page
```

## Conventions

- Route files export `Route` using `createFileRoute(path)({...})`
- Route-scoped components go in `-components/` subdirectories (the `-` prefix makes the router ignore them)
- Route component functions are declared with `function` keyword, not arrow functions
- Data loading uses TanStack Query (provider in `src/integrations/tanstack-query/`)

## Do's

- Export `Route` as a named const from every route file
- Place route-scoped UI in `-components/` next to the route
- Use `Link` from `@tanstack/react-router` for navigation

## Don'ts

- Don't edit `src/routeTree.gen.ts` — regenerated on every route change
- Don't use `<a>` tags for internal navigation — use `Link`
- Don't put reusable components here — those go in `src/components/`

## Examples

### New route file

```tsx
// src/routes/adocao/index.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/adocao/')({
  component: AdocaoPage,
});

function AdocaoPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Adoção</h1>
    </div>
  );
}
```

### Route with scoped components

```txt
routes/adocao/
├── index.tsx              # Route definition
└── -components/
    ├── filtros/index.tsx   # Only used by this route
    └── listagem/index.tsx  # Only used by this route
```

```tsx
// src/routes/adocao/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Filtros } from './-components/filtros';
import { Listagem } from './-components/listagem';

export const Route = createFileRoute('/adocao/')({
  component: AdocaoPage,
});

function AdocaoPage() {
  return (
    <div>
      <Filtros />
      <Listagem />
    </div>
  );
}
```

### Route with data loading (TanStack Query)

```tsx
// src/routes/gatos/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/gatos/')({
  component: GatosPage,
});

function GatosPage() {
  const { data: gatos, isLoading } = useQuery({
    queryKey: ['gatos'],
    queryFn: () => fetch('/api/gatos').then((r) => r.json()),
  });

  if (isLoading) return <span className="loading loading-spinner" />;

  return (
    <ul>
      {gatos?.map((gato: { id: string; nome: string }) => (
        <li key={gato.id}>{gato.nome}</li>
      ))}
    </ul>
  );
}
```
