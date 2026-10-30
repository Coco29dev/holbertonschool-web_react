/* global process */
import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { getLatestNotification } from '../utils/utils';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

// Files served from the public folder by the Vite dev server (port 5173).
const NOTIFICATIONS_URL = 'http://localhost:5173/notifications.json';
const COURSES_URL = 'http://localhost:5173/courses.json';

function logError(message, error) {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { displayDrawer, user, notifications, courses } = state;

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: true });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: false });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: { id } });
  }, []);

  // Notifications are needed as soon as the app loads.
  useEffect(() => {
    let ignore = false;

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(NOTIFICATIONS_URL);
        if (!ignore) {
          dispatch({
            type: APP_ACTIONS.SET_NOTIFICATIONS,
            payload: data.map((notification) =>
              notification.html
                ? { ...notification, html: { __html: getLatestNotification() } }
                : notification
            ),
          });
        }
      } catch (error) {
        logError('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();

    return () => {
      ignore = true;
    };
  }, []);

  // Courses depend on the authentication state, so they are fetched again
  // whenever the user changes.
  useEffect(() => {
    let ignore = false;

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(COURSES_URL);
        if (!ignore) {
          dispatch({ type: APP_ACTIONS.SET_COURSES, payload: data });
        }
      } catch (error) {
        logError('Failed to fetch courses:', error);
      }
    };

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <div className="relative flex min-h-screen flex-col px-3 max-[520px]:px-2">
      <Notifications
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
      <Header user={user} logOut={logOut} />
      {user.isLoggedIn ? (
        <BodySectionWithMarginBottom title="Course list">
          <CourseListWithLogging courses={courses} />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Log in to continue">
          <LoginWithLogging logIn={logIn} />
        </BodySectionWithMarginBottom>
      )}
      <BodySection title="News from the School">
        <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
      </BodySection>
      <Footer user={user} />
    </div>
  );
}

export default App;
