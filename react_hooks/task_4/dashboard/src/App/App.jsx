/* global process */
import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
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
import newContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

// Relative URLs, so they resolve against the app's base path (see vite.config.js).
const NOTIFICATIONS_URL = 'notifications.json';
const COURSES_URL = 'courses.json';

function logError(message, error) {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
}

function App() {
  // App renders the Provider and is not wrapped by one, so this gives the
  // context default value ({ user, logOut }).
  const { user: defaultUser } = useContext(newContext);

  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  // Notifications are needed as soon as the app loads.
  useEffect(() => {
    let ignore = false;

    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(NOTIFICATIONS_URL);
        if (!ignore) {
          setNotifications(
            data.map((notification) =>
              notification.html
                ? { ...notification, html: { __html: getLatestNotification() } }
                : notification
            )
          );
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
          setCourses(data);
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

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ email: '', password: '', isLoggedIn: false });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  }, []);

  // Keeps the same Provider value until user or logOut change, so consumers
  // do not re-render when only displayDrawer changes.
  const contextValue = useMemo(() => ({ user, logOut }), [user, logOut]);

  return (
    <newContext.Provider value={contextValue}>
      <div className="relative flex min-h-screen flex-col px-3 max-[520px]:px-2">
        <Notifications
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
        />
        <Header />
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
        <Footer />
      </div>
    </newContext.Provider>
  );
}

export default App;
