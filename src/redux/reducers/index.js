import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import resumeReducer from './resume.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resume: resumeReducer,
});

export default rootReducer;
