import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom', () => {
  test('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test">
        <p>test</p>
      </BodySectionWithMarginBottom>
    );

    expect(container.querySelector('div.bodySectionWithMargin')).toBeInTheDocument();
  });

  test('renders the BodySection component with the given props', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>test child</p>
      </BodySectionWithMarginBottom>
    );

    expect(
      container.querySelector('.bodySectionWithMargin > .bodySection')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'test title' })
    ).toBeInTheDocument();
    expect(screen.getByText('test child')).toBeInTheDocument();
  });
});
