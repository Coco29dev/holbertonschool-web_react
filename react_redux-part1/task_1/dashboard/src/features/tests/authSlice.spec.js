import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: { email: '', password: '' },
    isLoggedIn: false,
  };

  it('should return the initial state by default', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const payload = { email: 'test@example.com', password: 'secret' };
    const state = authReducer(initialState, login(payload));
    expect(state.user.email).toBe(payload.email);
    expect(state.user.password).toBe(payload.password);
    expect(state.isLoggedIn).toBe(true);
  });

  it('should handle logout', () => {
    const loggedIn = {
      user: { email: 'test@example.com', password: 'secret' },
      isLoggedIn: true,
    };
    const state = authReducer(loggedIn, logout());
    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
