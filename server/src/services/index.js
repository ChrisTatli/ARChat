const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const meets = require('./meets/meets.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(messages);
  app.configure(meets);
};
