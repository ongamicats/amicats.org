import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { GatoCard } from './index';

describe('GatoCard (unit)', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render name with truncate class and description with line-clamp-2', () => {
    const props = {
      nome: 'Mittens',
      descricao: 'A friendly cat who loves naps',
      imagem: '/img/mittens.jpg',
    };

    render(<GatoCard {...props} />);

    // name should be rendered inside Card.Title which is a heading-like element
    const name = screen.getByText(props.nome);
    expect(name).toBeInTheDocument();
    // ensure the title element includes the truncate class to keep it one line
    expect(name).toHaveClass('truncate');

    const description = screen.getByText(props.descricao);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('line-clamp-2');

    // Card.Body should include the flex / column / grow layout contract
    const body = name.closest('.card-body');
    expect(body).not.toBeNull();
    if (body) {
      expect(body).toHaveClass('flex');
      expect(body).toHaveClass('flex-col');
      expect(body).toHaveClass('flex-1');
    }

    // Card.Actions should align to bottom via mt-auto; find a button inside the same card
    const cardRoot = name.closest('.card');
    expect(cardRoot).not.toBeNull();
    let actions: Element | null = null;
    if (cardRoot) {
      const actionButton = cardRoot.querySelector('button');
      expect(actionButton).not.toBeNull();
      if (actionButton) actions = actionButton.closest('.card-actions');
    }
    expect(actions).not.toBeNull();
    if (actions) {
      expect(actions).toHaveClass('mt-auto');
    }
  });
});

export {};
