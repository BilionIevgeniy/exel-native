import { TABLE_ACTION_TYPES } from '../../../core/Consts';

export function resizeAction(payload) {
	return ({
		type: TABLE_ACTION_TYPES.TABLE_RESIZE,
		payload,
	});
}

export function cellInputAction(payload) {
	return ({
		type: TABLE_ACTION_TYPES.SET_CELL_VALUE,
		payload,
	});
}

export function cellBtnStateAction(payload) {
	return ({
		type: TABLE_ACTION_TYPES.SET_CELL_BTN_STATE,
		payload,
	});
}

export function setCurrentSellValueAction(payload) {
	return ({
		type: TABLE_ACTION_TYPES.SET_CURRENT_CELL_VALUE,
		payload,
	});
}

export function setActiveCellsAction(payload) {
	return ({
		type: TABLE_ACTION_TYPES.SET_ACTIVE_CELLS,
		payload,
	});
}