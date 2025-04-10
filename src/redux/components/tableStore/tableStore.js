import { TABLE_ACTION_TYPES } from '../../../core/Consts';

const initialState = {
	currentCellValue: '',
	activeCells: [],
	colState: {},
	rowState: {},
	cellContent: {},
};

export const tableReducer = (
	state = initialState,
	action = {}
) => {
	const { type, payload } = action;
	switch (type) {
		case TABLE_ACTION_TYPES.TABLE_RESIZE: {
			const { value, col, row } = payload;
			let newState = state;
			if (col) {
				newState = {
					...state,
					colState: {
						...state.colState,
						[col]: value,
					},
				};
			} else {
				newState = {
					...state,
					rowState: {
						...state.rowState,
						[row]: value,
					},
				};
			}
			return newState;
		}

		case TABLE_ACTION_TYPES.SET_CURRENT_CELL_VALUE: {
			return {
				...state,
				currentCellValue: payload.value,
			};
		}

		case TABLE_ACTION_TYPES.SET_CELL_VALUE: {
			const { value, id } = payload;
			const newState = {
				...state,
				cellContent: {
					...state.cellContent,
					[id]: {
						value,
					},
				},
			};

			return newState;
		}

		case TABLE_ACTION_TYPES.SET_CELL_BTN_STATE: {
			const newState = {
				...state,
				cellContent: {
					...state.cellContent,
					...payload,
				},
			};

			return newState;
		}

		case TABLE_ACTION_TYPES.SET_ACTIVE_CELLS: {
			return {
				...state,
				activeCells: payload,
			};
		}

		default:
			return state;
	}
};