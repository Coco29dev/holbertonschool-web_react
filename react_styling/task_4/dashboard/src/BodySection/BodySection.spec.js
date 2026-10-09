import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  test('renders a heading with the title prop value', () => {
    render(<BodySection title="test title" />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'test title' })
    ).toBeInTheDocument();
  });

  test('renders any number of children passed to it', () => {
    const { container } = render(
      <BodySection title="test">
        <p>first child</p>
        <p>second child</p>
        <span>third child</span>
      </BodySection>
    );

    expect(container.querySelector('.bodySection')).toBeInTheDocument();
    expect(screen.getByText('first child')).toBeInTheDocument();
    expect(screen.getByText('second child')).toBeInTheDocument();
    expect(screen.getByText('third child')).toBeInTheDocument();
  });
});
