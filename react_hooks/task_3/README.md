# 3. Update the Notifications component

`Notifications` is now a functional component wrapped in `memo`, which replaces
`PureComponent`: it only re-renders when memo's props comparison returns
`false`. Its props (`notifications`, `displayDrawer`, `handleDisplayDrawer`,
`handleHideDrawer`, `markNotificationAsRead`) and the behavior of
`NotificationItem` are unchanged.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
npm run lint
```
