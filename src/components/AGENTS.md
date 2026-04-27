# components/

> Inherits all rules from [`../AGENTS.md`](../AGENTS.md). Only component-specific additions below.

## Role

Reusable UI components. Organized in layers: `daisy/` wraps DaisyUI primitives, `ui/` builds domain components on top, `shared/` holds cross-cutting helpers and types.

## Structure

```txt
components/layout/
├── daisy/              # DaisyUI wrappers (Card, Button, Badge, Hero...)
│   ├── actions/        # Interactive (Button)
│   └── data-display/   # Display (Card, Badge, Avatar, Carousel)
├── ui/                 # Domain components (GatoCard, GatosCarousel...)
└── shared/
    ├── helpers/         # cn(), createDaisyClassBuilder()
    ├── constants/       # daisyColors, daisySizes, daisyShapes
    └── types/           # ComponentColor, ComponentSize, ComponentShape
```

## Conventions

- One component per directory: `kebab-case/index.tsx`
- Co-located files: `<name>.types.ts`, `<name>.constants.ts`, `<name>.stories.tsx`
- Use `cn()` from `shared/helpers/class.helper.ts` for all class merging
- Use `createDaisyClassBuilder(prefix)` for DaisyUI variant classes
- Compound components: `Object.assign(Root, { Sub })` pattern

## Storybook

Stories use CSF3 format. Meta uses `satisfies Meta<typeof Component>`.

```bash
npm run storybook   # http://localhost:6006
```

## Do's

- Destructure props and spread `{...props}` on the root DOM element
- Use `forwardRef` + `displayName` for components that wrap native elements
- Use `interface` extending HTML attributes for props that pass through to DOM
- Import from `@/` for cross-layer imports, relative for same subtree
- Add or update co-located tests when changing component behavior or adding UI. Prefer `<component>.test.tsx` next to the component implementation.
- During development use `npm run test:watch` (Vitest watch mode) for a fast TDD loop: write failing tests, implement until they pass, then refactor.

## Don'ts

- Don't use inline styles — use Tailwind classes via `cn()`
- Don't create DaisyUI class strings manually — use `createDaisyClassBuilder()`
- Don't use default exports for components
- Don't put route-specific components here — those go in `routes/<route>/-components/`

## Examples

### Simple component (function declaration)

```tsx
// src/components/layout/ui/status-tag/index.tsx
import { cn } from '@/components/layout/shared/helpers/class.helper'
import { Badge } from '@/components/layout/daisy/data-display/badge'

export interface StatusTagProps {
  status: 'disponivel' | 'adotado' | 'apadrinhado'
  className?: string
}

export function StatusTag({ status, className }: StatusTagProps) {
  const variants: Record<StatusTagProps['status'], string> = {
    disponivel: 'badge-success',
    adotado: 'badge-info',
    apadrinhado: 'badge-warning',
  }

  return <Badge className={cn(variants[status], className)}>{status}</Badge>
}
```

### forwardRef component (DaisyUI wrapper)

```tsx
// src/components/layout/daisy/actions/input/index.tsx
import { forwardRef } from 'react'
import {
  cn,
  createDaisyClassBuilder,
} from '@/components/layout/shared/helpers/class.helper'
import {
  daisyColors,
  daisySizes,
} from '@/components/layout/shared/constants/class.constants'

import type {
  ComponentColor,
  ComponentSize,
} from '@/components/layout/shared/types/types.constants'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: ComponentColor
  inputSize?: ComponentSize
}

const buildInputClass = createDaisyClassBuilder('input')

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'input',
          buildInputClass(variant && daisyColors[variant]),
          buildInputClass(inputSize && daisySizes[inputSize]),
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
```

### Compound component

```tsx
// src/components/layout/daisy/data-display/card/index.tsx
import { cn } from '@/components/layout/shared/helpers/class.helper'
import { CardBody } from './body'
import { CardTitle } from './title'
import { CardActions } from './actions'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'compact' | 'side'
}

export function Card({
  children,
  className,
  variant = 'normal',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'card',
        variant === 'compact' && 'card-compact',
        variant === 'side' && 'card-side',
        'bg-base-100 shadow-xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardComponent = Object.assign(Card, {
  Body: CardBody,
  Title: CardTitle,
  Actions: CardActions,
})
```

### Storybook story (CSF3)

```tsx
// src/components/layout/daisy/actions/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const meta = {
  title: 'Daisy/Actions/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'link', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm', 'xs'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
}
```
