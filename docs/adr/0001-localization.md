---
adr: 0001
title: Localization rollout for amicats.org
status: proposed
date: 2026-04-24
deciders: Frontend maintainers
---

## Decision

Roll out a pragmatic, UI-layer localization for the marketing/landing parts of amicats.org with these locked decisions:

- Supported locales: `pt-BR` (default) and `en`.
- Locale selection: client-side only, persisted to `localStorage` (use existing `useLandingLocale` hook).
- Language switcher: the existing `components/layout/ui/language-select` is the single user control.
- Storage format: message files as plain JSON under `src/locales/{pt-BR,en}`; load per-locale files on demand (code-split).
- Implementation: a thin translation helper (e.g. `src/lib/translator.ts`) and `useTranslator` hook. No heavyweight i18n framework initially.

## Context

The project already contains a language selector component and `useLandingLocale` which persists the choice in `localStorage` and syncs across tabs. There is no central translation store or message files yet. Product requires bilingual public-facing pages quickly for outreach.

## Alternatives considered

1. Adopt a full i18n framework (i18next / FormatJS / lingui)
   - Pros: robust pluralization, ICU messages, extraction tooling, proven SSR support.
   - Cons: higher integration cost, bundle/runtime complexity, learning curve.

2. Route-based locales (URL prefix or subdomain)
   - Pros: SEO-friendly, server-side locale resolution, canonical URLs per locale.
   - Cons: requires router/SSR changes, more infra and content work.

3. Client-only JSON lookup (chosen)
   - Pros: fast to implement, minimal dependencies, integrates with `useLandingLocale` and current components, easy to code-split.
   - Cons: weaker SEO (client-rendered translations), limited advanced i18n features initially.

## Consequences

Benefits

- Fast delivery and low engineering overhead for a bilingual landing site.

Trade-offs

- SEO: crawlers may index only the default locale. Full SEO parity requires route-based or SSR-aware localization in a later phase.
- Features: no built-in pluralization/ICU formatting; these will be added if needed or via migration to a framework.
- Migration: future migration to a full i18n library will require refactoring message access and extraction tooling. Design the translator API as a thin adapter to reduce friction.

## Files / Areas to change

- Add: `docs/adr/0001-localization.md` (this ADR).
- Add: `src/locales/en/*.json` and `src/locales/pt-BR/*.json` — translation files organized by namespace (component or route).
- Add: `src/lib/translator.ts` — thin runtime loader and key lookup with fallbacks.
- Add: `src/hooks/useTranslator.ts` — returns t(key) and current locale; integrates with `useLandingLocale`.
- Update: landing components (routes/landing, navbar, footer, hero) to use `t('...')` incrementally.
- Update: `components/layout/ui/language-select` to prefetch the selected locale messages when switching.
- Tests: basic unit tests for translator fallback behaviour and for integration with `useLandingLocale`.
- Docs: update project README/AGENTS.md with localization conventions and translation workflow.

## Next steps

1. Create skeleton translation files for high-impact landing content (navbar, hero, footer).
2. Implement `src/lib/translator.ts` and `src/hooks/useTranslator.ts` and export a small API: t(key: string): string, loadLocale(locale): Promise<void>.
3. Replace static strings in landing components with `t()` calls, starting with navbar and hero.
4. Add a Vitest check to ensure basic key parity between locales for keys used in code.
5. After rollout, reassess: if pluralization/ICU needed, evaluate migration to a full i18n framework and draft migration ADR.
6. If SEO/SSR becomes a priority, plan route-based locale support and server-side locale detection (new ADR).

## Open questions

- Translation ownership and process (who supplies and reviews translations?).
- Long-term choice for SSR/SEO: keep `localStorage` fallback or move to URL-prefixed locales/cookies? (Recommend URL-prefixed locales for SEO.)

## What I documented

This ADR records the decision to implement a lightweight, client-side JSON-based localization for `pt-BR` and `en`, the alternatives considered, consequences, files to change, and an actionable rollout plan.

## Audience

Frontend engineers, product managers, and maintainers responsible for content and internationalization.

## Gaps

1. Translation workflow and ownership (people/process).
2. SEO/SSR timeline and requirements.
3. Final decision on message syntax (plain strings vs ICU) if a framework is adopted in future.

The words are ready.
