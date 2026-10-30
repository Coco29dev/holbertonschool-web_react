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

function useLogin(onLogin = () => {}) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
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

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;
