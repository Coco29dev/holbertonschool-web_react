# 6. Reducer

The Context API was replaced by the `useReducer` hook.

- `src/App/appReducer.js` exports `APP_ACTIONS` (`LOGIN`, `LOGOUT`,
  `TOGGLE_DRAWER`, `MARK_NOTIFICATION_READ`, `SET_NOTIFICATIONS`,
  `SET_COURSES`), `initialState` and the `appReducer` function, which updates the
  state immutably and returns the current state for unknown actions.
- `App` uses a single `useReducer(appReducer, initialState)` and dispatches
  actions from its handlers and from the data fetching effects. There is no
  Provider anymore: `Header` receives `user` and `logOut` as props, and `Footer`
  receives `user`.
- `TOGGLE_DRAWER` toggles the drawer, or sets it when its payload is a boolean.

## Usage

```bash
cd dashboard
npm install
npm i axios jest-mock-axios
npm run dev
npm test
npm run lint
```
