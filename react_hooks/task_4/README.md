# 4. Modernizing the Parent

`App` is now a functional component. Its state lives in hooks: `displayDrawer`
(initially `true`), `user` (initially the context user object) and
`notifications` (initially `notificationsList`).

The handlers `handleDisplayDrawer`, `handleHideDrawer`, `logIn`, `logOut` and
`markNotificationAsRead` are memoized with `useCallback`, and the context value
is memoized with `useMemo`. The `Ctrl + H` key handler and its lifecycle methods
were removed.

The hardcoded lists are gone: `public/notifications.json` and
`public/courses.json` are fetched with `axios` in `useEffect`. Notifications are
fetched once when the app loads (the latest one still uses
`getLatestNotification()`), and courses are fetched again whenever the `user`
changes. Errors are caught and logged to the console in development only.
In the tests, `axios` is mapped to `jest-mock-axios`.

## Usage

```bash
cd dashboard
npm install
npm i axios jest-mock-axios
npm run dev
npm test
npm run lint
```
