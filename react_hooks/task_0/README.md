# 0. Convert Header Component

The `Header` component is now a functional component. It reads `user` and
`logOut` from `newContext` with the `useContext` hook, and keeps the exact same
JSX structure: when `user.isLoggedIn` is `true`, the `logoutSection` displays
`Welcome email (logout)`, and clicking on the `logout` link calls `logOut`
from the context.

React is only imported in `src/main.jsx`; component files import only the named
exports they need from `react`.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
npm run lint
```
