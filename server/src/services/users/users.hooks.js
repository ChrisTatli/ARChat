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
    update: [
      hook => {
        if(JSON.stringify(hook.data).includes('{"$pull":{"friends"')) {
          
          hook.app.service('users').get(hook.data.$pull.friends._id).then(result => {
            let found = false;
            let friends = result.friends;
            for(let i=0; i < friends.length; i++) {
              if(friends[i]._id == hook.params.user._id) {
                found = true;
                break;
              }
            }
            if(found) {
              hook.app.service('users').update(result._id,
                 { $pull: { friends: { username: hook.params.user.username } } })
              .then(result => {
             console.log('Successfully removed friend from both users.');
             }).catch(error => {
              console.log('Error removing friend from both users.');
             });
          }
        }).catch(error => {
            console.log('Error updating both user friends arrays.', error);    
          });
        }
      }
    ],
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



