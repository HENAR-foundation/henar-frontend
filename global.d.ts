// Use type safe message keys with `next-intl`
type Messages = typeof import('./messages/en.json');
type MessagesLanding = typeof import('./messages/landing/en.json');
type AllMessages = Messages & MessagesLanding;
declare interface IntlMessages extends AllMessages {}
