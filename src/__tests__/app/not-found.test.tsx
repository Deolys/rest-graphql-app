import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Page404 from '@/app/not-found';
import { LanguageContext } from '@/providers/language';

import { mockLanguageContext } from '../mocks/language-context';

describe('Page404 Component', () => {
  it('renders page 404', () => {
    render(
      <LanguageContext.Provider value={mockLanguageContext}>
        <Page404 />
      </LanguageContext.Provider>,
    );

    expect(screen.getAllByText('4')).toHaveLength(2);
    expect(
      screen.getByText('Запрашиваемая страница не существует'),
    ).toBeInTheDocument();
    const image = screen.getByAltText('404');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/graphql-rest-logo.svg');
  });
});
