import React from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { getLatestNotification } from '../utils/utils';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends React.Component {
  static defaultProps = {
    isLoggedIn: false,
    logOut: () => {},
  };

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <div className="relative flex min-h-screen flex-col px-3 max-[520px]:px-2">
        <Notifications displayDrawer notifications={notificationsList} />
        <Header />
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseListWithLogging courses={coursesList} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <LoginWithLogging />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
        </BodySection>
        <Footer />
      </div>
    );
  }
}

export default App;
