# 2. Context

- `src/Context/context.js` creates and default-exports `newContext`, a React
  context whose default value is `{ user, logOut }` (`user` has an empty
  `email` and `password`, and `isLoggedIn: false`).
- `App` keeps `user` and `logOut` in its local state, with a `logIn(email,
  password)` method that logs the user in and a `logOut` method that resets
  `user`. It wraps the whole app in `newContext.Provider`, and reuses the same
  value object until `user` or `logOut` change.
- `App` displays `CourseList` when `user.isLoggedIn` is `true`, `Login`
  otherwise. It passes `logIn`, `email` and `password` to `Login`.
- `Login` calls `logIn` from its props when the form is submitted.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
```
