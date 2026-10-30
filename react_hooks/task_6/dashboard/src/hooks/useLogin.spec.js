import { renderHook, act } from '@testing-library/react';
import useLogin from './useLogin';

const changeEvent = (value) => ({ target: { value } });

describe('useLogin', () => {
  test('starts with empty values and a disabled submit', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.enableSubmit).toBe(false);
  });

  test('enables the submit only with a valid email and a password of at least 8 characters', () => {
    const { result } = renderHook(() => useLogin());

    act(() => result.current.handleChangeEmail(changeEvent('not-an-email')));
    act(() => result.current.handleChangePassword(changeEvent('password123')));
    expect(result.current.enableSubmit).toBe(false);

    act(() => result.current.handleChangeEmail(changeEvent('test@example.com')));
    expect(result.current.enableSubmit).toBe(true);

    act(() => result.current.handleChangePassword(changeEvent('short')));
    expect(result.current.enableSubmit).toBe(false);
  });

  test('prevents the default submission and calls onLogin with the email and password', () => {
    const onLogin = jest.fn();
    const preventDefault = jest.fn();
    const { result } = renderHook(() => useLogin(onLogin));

    act(() => result.current.handleChangeEmail(changeEvent('test@example.com')));
    act(() => result.current.handleChangePassword(changeEvent('password123')));
    act(() => result.current.handleLoginSubmit({ preventDefault }));

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
