# 0. Adding a local state for notifications

The `App` component now holds a local state with a `displayDrawer` value
(default `false`).

- `handleDisplayDrawer` sets `displayDrawer` to `true`.
- `handleHideDrawer` sets `displayDrawer` to `false`.

Both functions are passed to `Notifications`, which calls
`handleDisplayDrawer` when `Your notifications` is clicked and
`handleHideDrawer` when the close button is clicked.

`shouldComponentUpdate` in `Notifications` now also re-renders when the
`displayDrawer` prop changes.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
```
