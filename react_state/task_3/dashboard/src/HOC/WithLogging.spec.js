import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

const WrappedMockApp = WithLogging(MockApp);

describe('WithLogging', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    logSpy.mockRestore();
  });

  test('renders a heading with the wrapped component content', () => {
    render(<WrappedMockApp />);
    expect(
      screen.getByRole('heading', { name: 'Hello from Mock App Component' })
    ).toBeInTheDocument();
  });

  test('logs on mount and on unmount', () => {
    const { unmount } = render(<WrappedMockApp />);
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });

  test('sets the displayName to WithLogging(NAME)', () => {
    expect(WrappedMockApp.displayName).toBe('WithLogging(MockApp)');
  });

  test('falls back to Component when the wrapped component has no name', () => {
    const Anonymous = WithLogging(() => <p>anonymous</p>);
    expect(Anonymous.displayName).toBe('WithLogging(Component)');
  });
});
