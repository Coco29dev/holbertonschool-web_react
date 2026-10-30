# 2. Update the NotificationItem component

`NotificationItem` is now a functional component wrapped in `memo`, which
replaces `PureComponent`: it only re-renders when one of its props changes.
The props (`type`, `html`, `value`, `markAsRead`, `id`) and the click handler
that calls `markAsRead(id)` are unchanged.

## Usage

```bash
cd dashboard
npm install
npm run dev
npm test
npm run lint
```
