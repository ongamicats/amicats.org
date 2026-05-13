import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  resolveLocale,
  setLocaleCookie,
} from '@/integrations/lingui/resolve-locale';

describe('I18n routing and resolveLocale', () => {
  beforeEach(() => {
    // clear cookie before each test
    document.cookie = 'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  afterEach(() => {
    document.cookie = 'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  test('visiting root with no cookie should resolve to default and indicate redirect', () => {
    const res = resolveLocale({});
    expect(res.locale).toBe('pt-BR');
    expect(res.redirected).toBe(true);
  });

  test('visiting /en/ param returns en and no redirect', () => {
    const res = resolveLocale({ params: { locale: 'en' } });
    expect(res.locale).toBe('en');
    expect(res.redirected).toBe(false);
  });

  test('visiting invalid locale param falls back to cookie or default', () => {
    // set cookie to en and ensure param invalid falls back to cookie
    setLocaleCookie(document, 'en');
    const res = resolveLocale({ params: { locale: 'xx' } });
    expect(res.locale).toBe('en');
    expect(res.redirected).toBe(false);
  });

  test('visiting invalid locale with no cookie returns default and redirected true', () => {
    const res = resolveLocale({ params: { locale: 'xx' } });
    expect(res.locale).toBe('pt-BR');
    expect(res.redirected).toBe(true);
  });
});

export {};
