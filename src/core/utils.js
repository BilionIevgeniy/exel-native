export function capitalize(string) {
	return string.charAt(0).toUpperCase() +
		string.slice(1);
}

export function toChar(index) {
	if (index <= 0) return '';

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';

	while (index > 0) {
		index--; // decrease on 1 because alphabets index starts from 0
		const remainder = index % 26;

		result = alphabet[remainder] + result;
		index = Math.floor(index / 26);
	}

	return result;
}

// Convert letter symbols into numbers
export const colToNumber = (col) => {
	let num = 0;
	for (let i = 0; i < col.length; i++) {
		num = num * 26 + (col.charCodeAt(i) - 64);
	}
	return num;
};

// Convert the number back to a letter designation
export const numberToCol = (num) => {
	let str = '';
	while (num > 0) {
		num--;
		str = String.fromCharCode(65 + (num % 26)) + str;
		num = Math.floor(num / 26);
	}
	return str;
};

export function matrix(current, target) {
	// Defining the selection boundaries
	const cols = {
		start: colToNumber(current.col),
		end: colToNumber(target.col),
	};
	const rows = {
		start: Math.min(current.row, target.row),
		end: Math.max(current.row, target.row),
	};
	const minCols = Math.min(cols.start, cols.end);
	const maxCols = Math.max(cols.start, cols.end);
	const rowsStart = rows.start;
	const rowsEnd = rows.end;

	// Forming an array of cell IDs for selection
	const cells = [];
	for (let row = rowsStart; row <= rowsEnd; row++) {
		for (let col = minCols; col <= maxCols; col++) {
			const colLetter = numberToCol(col);
			const id = `${row}:${colLetter}`;
			cells.push(id);
		}
	}
	return cells;
}

export function nextSelection(key, current) {
	const { col, row } = current.id(true);
	let nextCol;
	let nextRow;
	const letterCol = col.split(':')[0];
	const numberCol = colToNumber(letterCol);

	switch (key) {
		case 'ArrowRight':
		case 'Tab':
			nextCol = numberCol + 1;
			nextRow = +row;
			break;
		case 'ArrowLeft':
			nextCol = numberCol - 1;
			nextRow = +row;
			break;
		case 'ArrowDown':
		case 'Enter':
			nextCol = numberCol;
			nextRow = +row + 1;
			break;
		case 'ArrowUp':
			nextCol = numberCol;
			nextRow = +row - 1;
			break;
		default:
			return current;
	}

	if (nextCol < 1 || nextRow < 1) {
		return current;
	}
	const id = `${nextRow}:${numberToCol(nextCol)}`;
	const newCell = current.findById(id);
	return newCell;
}