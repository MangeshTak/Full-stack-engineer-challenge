import { combineReducers  } from 'redux';
import dataStreamUpdate from './dataStreamUpdate.js';
import sort from './sort.js';
import filter from './filter.js';
import favourites from './favourites.js';

export default combineReducers({
	dataStreamUpdate,
	sort,
	filter,
	favourites,
})