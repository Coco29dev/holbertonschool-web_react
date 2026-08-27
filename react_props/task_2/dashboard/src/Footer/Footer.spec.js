import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

describe('Footer', () => {
  test('renders the copyright text with the current year and Holberton School', () => {
    render(<Footer />);

    const expectedCopy = getFooterCopy(true);
    const copyrightText = new RegExp(`copyright ${getCurrentYear()}.*${expectedCopy}`, 'i');

    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });
});
