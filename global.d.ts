// Use type safe message keys with `next-intl`
type Messages = typeof import('./messages/en.json');
type MessagesLanding = typeof import('./messages/landing/en.json');
type MessagesFormErrors = typeof import('./messages/formErrors/en.json');
type AllMessages = Messages & MessagesLanding & MessagesFormErrors;
declare interface IntlMessages extends AllMessages {}
