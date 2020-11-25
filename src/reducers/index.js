import { combineReducers } from 'redux';

import reduxStore from '../components/LoginPage/reducer';

const rootReducer = () => combineReducers({
  reduxStore,
});

export default rootReducer;
