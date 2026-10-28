# 1. Controlled components and state callback

`Login` is now a class component with a local state:

| Key | Default | Role |
| --- | ------- | ---- |
| `isLoggedIn` | `false` | Set to `true` by `handleLoginSubmit` |
| `email` | `''` | Controlled by `handleChangeEmail` |
| `password` | `''` | Controlled by `handleChangePassword` |
| `enableSubmit` | `false` | Enables the submit input |

The submit input is enabled only when the email is a valid address and the
password has at least 8 characters. Submitting the form calls
`preventDefault()`, so the page is not reloaded.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
```
