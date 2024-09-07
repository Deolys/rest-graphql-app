import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from '@/components/footer/footer';

describe('Footer component', () => {
  it('renders footer correctly', () => {
    render(<Footer />);

    expect(
      screen.getByText('© 2024 REST/GraphiQL Client'),
    ).toBeInTheDocument();

    const rsLogo = screen.getByAltText('RS School');
    expect(rsLogo).toBeInTheDocument();
    expect(rsLogo).toHaveAttribute('src', '/rss-logo.svg');

    const githubLogo = screen.getByAltText('Github');
    expect(githubLogo).toBeInTheDocument();
    expect(githubLogo).toHaveAttribute('src', '/github.png');

    const rsLink = screen.getByTitle('RS School');
    expect(rsLink).toBeInTheDocument();
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
