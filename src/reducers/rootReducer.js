import { combineReducers } from 'redux';
import transient from './transient.js';
import logs from './logs.js';

export default combineReducers({
  transient,
  logs,
})