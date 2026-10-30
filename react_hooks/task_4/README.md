# 4. Modernizing the Parent

`App` is now a functional component. Its state lives in hooks: `displayDrawer`
(initially `true`), `user` (initially the context user object) and
`notifications` (initially `notificationsList`).

The handlers `handleDisplayDrawer`, `handleHideDrawer`, `logIn`, `logOut` and
`markNotificationAsRead` are memoized with `useCallback`, and the context value
is memoized with `useMemo`. The `Ctrl + H` key handler and its lifecycle methods
were removed.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
npm run lint
```
