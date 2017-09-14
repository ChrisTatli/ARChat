const { authenticate } = require('feathers-authentication').hooks;
const { setCreatedAt } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ setCreatedAt() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
				hook => {
					setTimeout(() => {
						hook.app.service('meet-requests').remove(hook.result._id)
						.then(result => {
							console.log(`successfully removed meet request ${JSON.stringify(hook.result._id)}`);
						}).catch(error => {
							console.log(`error removing meet request ${JSON.stringify(hook.result._id)} after expiry, error`);
						});
					}, 20000);
				}
		],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
