import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

describe('notificationsSlice', () => {
  const initialState = { notifications: [], displayDrawer: true };

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  it('should return the initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should fetch notifications and replace notification 3', async () => {
    const dispatched = [];
    const promise = fetchNotifications()((a) => dispatched.push(a), () => ({}), undefined);
    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 3, type: 'urgent', html: { __html: '' } },
        ],
      },
    });
    const result = await promise;
    expect(result.type).toBe('notifications/fetchNotifications/fulfilled');
    expect(result.payload).toEqual([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ]);

    const state = notificationsReducer(initialState, result);
    expect(state.notifications).toEqual(result.payload);
  });

  it('should remove a notification on markNotificationAsRead', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = notificationsReducer(
      {
        notifications: [
          { id: 1, type: 'default', value: 'a' },
          { id: 2, type: 'urgent', value: 'b' },
        ],
        displayDrawer: true,
      },
      markNotificationAsRead(1)
    );
    expect(state.notifications).toEqual([{ id: 2, type: 'urgent', value: 'b' }]);
    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });

  it('should toggle displayDrawer with showDrawer and hideDrawer', () => {
    let state = notificationsReducer(initialState, hideDrawer());
    expect(state.displayDrawer).toBe(false);
    state = notificationsReducer(state, showDrawer());
    expect(state.displayDrawer).toBe(true);
  });
});
