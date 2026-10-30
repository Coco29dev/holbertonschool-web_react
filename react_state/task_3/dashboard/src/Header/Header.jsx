import { Component, Fragment } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

class Header extends Component {
  static contextType = newContext;

  constructor(props) {
    super(props);
    this.handleLogOutClick = this.handleLogOutClick.bind(this);
  }

  handleLogOutClick(event) {
    event.preventDefault();
    this.context.logOut();
  }

  render() {
    const { user } = this.context;

    return (
      <Fragment>
        <div className="App-header flex items-center max-[520px]:flex-col max-[520px]:text-center">
          <img src={holbertonLogo} alt="holberton logo" className="h-63 w-63 max-[912px]:h-48 max-[912px]:w-48 max-[520px]:h-36 max-[520px]:w-36" />
          <h1 className="text-5xl font-bold text-(--main-color) max-[912px]:text-4xl max-[520px]:text-2xl">School Dashboard</h1>
        </div>
        {user.isLoggedIn && (
          <section id="logoutSection" className="mt-2 max-[520px]:text-center">
            Welcome <b>{user.email}</b> (
            <a href="#" className="underline" onClick={this.handleLogOutClick}>
              logout
            </a>
            )
          </section>
        )}
      </Fragment>
    );
  }
}

export default Header;
