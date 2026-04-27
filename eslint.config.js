//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

// Minimal flat-config ignore for generated build artifacts (.output)
// Ensures eslint invoked by `npm run check` does not attempt to parse
// generated JS files outside the TSConfig project.
export default [{ ignores: ['.output/**'] }, ...tanstackConfig]
