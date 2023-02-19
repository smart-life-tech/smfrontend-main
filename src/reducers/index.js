import { combineReducers } from 'redux';

import user from './user';
import mints from './mints';
import twitter from './twitter';
import giveaways from './giveaways';
import authReducer from './auth';
 
export default combineReducers({ user, mints, twitter, giveaways, authReducer });