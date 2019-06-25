import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as user} from './user/user.js';
import {reducer as reviews} from './reviews/reviews.js';

import NameSpace from './name-spaces.js';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.REVIEWS]: reviews,
});
