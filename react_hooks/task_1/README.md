# 1. Convert Login component

The `Login` component is now a functional component. It keeps its state with
hooks: `enableSubmit` (initially `false`) and `formData` (initially
`{ email: '', password: '' }`).

`handleChangeEmail` and `handleChangePassword` update `formData` and recompute
`enableSubmit` (valid email and password of at least 8 characters).
`handleLoginSubmit` always prevents the default form submission and calls the
`logIn` prop with the current email and password.

`Login` is still wrapped by the `WithLogging` HOC in `App`.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
npm run lint
```
