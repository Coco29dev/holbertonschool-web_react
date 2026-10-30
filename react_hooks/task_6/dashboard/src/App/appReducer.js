export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES',
};

export const initialState = {
  displayDrawer: true,
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  notifications: [],
  courses: [],
};

// Payloads can be given either bare (an id, a list) or wrapped in an object.
const getList = (payload, key) =>
  Array.isArray(payload) ? payload : (payload?.[key] ?? []);
const getId = (payload) =>
  payload !== null && typeof payload === 'object' ? payload.id : payload;

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN: {
      const { email = '', password = '' } = action.payload?.user ?? action.payload ?? {};
      return { ...state, user: { email, password, isLoggedIn: true } };
    }
    case APP_ACTIONS.LOGOUT:
      return { ...state, user: initialState.user };
    case APP_ACTIONS.TOGGLE_DRAWER:
      // An explicit boolean payload sets the visibility, otherwise it toggles.
      return {
        ...state,
        displayDrawer:
          typeof action.payload === 'boolean'
            ? action.payload
            : !state.displayDrawer,
      };
    case APP_ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== getId(action.payload)
        ),
      };
    case APP_ACTIONS.SET_NOTIFICATIONS:
      return { ...state, notifications: getList(action.payload, 'notifications') };
    case APP_ACTIONS.SET_COURSES:
      return { ...state, courses: getList(action.payload, 'courses') };
    default:
      return state;
  }
}
