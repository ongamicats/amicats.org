// Re-exports route-scoped component used by unit tests.
// Tests import from @/routes/landing/-components/introducao but the
// canonical implementation lives under src/components/pages/landing.
// Providing this tiny re-export keeps tests stable without changing
// component locations.
export { IntroducaoSection } from '@/components/pages/landing/introducao';
