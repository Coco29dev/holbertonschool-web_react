import { Component } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

class Login extends Component {
  static defaultProps = {
    email: '',
    password: '',
    logIn: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      password: props.password,
      enableSubmit: Login.isFormValid(props.email, props.password),
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState((prevState) => ({
      email,
      enableSubmit: Login.isFormValid(email, prevState.password),
    }));
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState((prevState) => ({
      password,
      enableSubmit: Login.isFormValid(prevState.email, password),
    }));
  }

  static isFormValid(email, password) {
    return (
      email !== '' &&
      password !== '' &&
      EMAIL_REGEX.test(email) &&
      password.length >= MIN_PASSWORD_LENGTH
    );
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body border-t-3 border-(--main-color) pt-6 pb-80 pl-10 max-[912px]:pb-10 max-[520px]:pl-0">
        <p className="mb-8 text-xl max-[520px]:mb-4 max-[520px]:text-lg">Login to access the full dashboard</p>
        <form
          className="flex flex-wrap items-center gap-2 text-lg max-[520px]:flex-col max-[520px]:items-start"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
            className="h-[30px] w-52 rounded border border-gray-500 px-1 max-[520px]:w-full"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
            className="h-[30px] w-52 rounded border border-gray-500 px-1 max-[520px]:w-full"
          />
          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className="cursor-pointer rounded border border-gray-500 px-1 disabled:cursor-not-allowed disabled:opacity-50 max-[520px]:w-full"
          />
        </form>
      </div>
    );
  }
}

export default Login;
