import {combineReducers} from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers if you have more state slices
});

export default rootReducer;
