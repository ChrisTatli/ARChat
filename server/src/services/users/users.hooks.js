const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const errors = require('feathers-errors');
const { hashPassword } = require('feathers-authentication-local').hooks;
const crypto = require('crypto');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

// User gravatars
const gravatarUrl = 'https://www.gravatar.com/avatar/';
const query = 's=60&d=retro';


module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [
		hashPassword(), 
		hook => {
			const { email } = hook.data;
			const hash = crypto.createHash('md5').update(email).digest('hex');

			hook.data.avatar = `${gravatarUrl}${hash}?${query}`;
		}	
		],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      hook => {
       if(`${hook.error}`.includes('email')) {
        throw new Error('Email already in use.');
       } 
       if(`${hook.error}`.includes('username')) {
        throw new Error('Username already in use.'); 
       }
      } 
    ],
    update: [],
    patch: [],
    remove: []
  }
};



