import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function isFormValid(email, password) {
  return (
    email !== '' &&
    password !== '' &&
    EMAIL_REGEX.test(email) &&
    password.length >= MIN_PASSWORD_LENGTH
  );
}

function Login({ logIn = () => {} }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    logIn(email, password);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, email: value });
    setEnableSubmit(isFormValid(value, password));
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, password: value });
    setEnableSubmit(isFormValid(email, value));
  };

  return (
    <div className="App-body border-t-3 border-(--main-color) pt-6 pb-80 pl-10 max-[912px]:pb-10 max-[520px]:pl-0">
      <p className="mb-8 text-xl max-[520px]:mb-4 max-[520px]:text-lg">Login to access the full dashboard</p>
      <form
        className="flex flex-wrap items-center gap-2 text-lg max-[520px]:flex-col max-[520px]:items-start"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          className="h-[30px] w-52 rounded border border-gray-500 px-1 max-[520px]:w-full"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
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

export default Login;
