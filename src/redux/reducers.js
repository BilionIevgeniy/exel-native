import { tableReducer } from './components/tableStore/tableStore';

/*
	reducers = {
		reducer1: (state, action) => state,
		reducer2: (state, action) => state,
	}
*/
const combineReducer = (reducers) => {
	return (state, action) => {
		return Object.keys(reducers).reduce((newState, key) => {
			return {
				...newState,
				[key]: reducers[key](state[key], action),
			};
		}, {});
	};
};

export const rootReducer = combineReducer({
	tableState: tableReducer,
});