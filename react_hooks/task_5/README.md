# 7. Custom React hook

The form state and logic of `Login` moved into the custom hook
`src/hooks/useLogin.jsx`. It takes an `onLogin` callback and returns `email`,
`password`, `enableSubmit` and the handlers `handleChangeEmail`,
`handleChangePassword` and `handleLoginSubmit`.

`enableSubmit` is `true` only when the email is valid and the password has at
least 8 characters. `Login` only renders the form and receives its `logIn` prop
as the `onLogin` callback.

## Usage

```bash
cd dashboard
npm install
npm i axios jest-mock-axios
npm run dev
npm test
npm run lint
```
