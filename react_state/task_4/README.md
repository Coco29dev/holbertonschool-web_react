# 3. Log Out implementation

`Header` reads `user` and `logOut` from `newContext` with `contextType`.

When `user.isLoggedIn` is `true`, it displays a section with the id
`logoutSection` under the header: `Welcome email (logout)`. Clicking on the
`logout` link calls `logOut` from the context, which resets the `user` object
in the `App` state and displays the `Login` form again.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
```
