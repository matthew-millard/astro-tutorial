import { describe, expect, test } from 'vitest';
import { renderAstroComponent } from './utils';
import Header from '@components/ui/Header.astro';
import { getByRole } from '@testing-library/dom';

describe('Header', async () => {
  const result = await renderAstroComponent(Header);
  test('renders logo, theme toggle and side panel toggle button', () => {
    getByRole(result, 'button', { name: 'Toggle side panel' });
  });

  test;
});
