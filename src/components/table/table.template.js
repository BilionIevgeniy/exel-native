import { toChar } from '../../core/utils';

const createColumn = (i) => {
	return `
				<div class="column" data-col="${toChar(i + 1)}" data-type="resizable">
					${toChar(i + 1)}
					<div class="col-resize" data-resize="col"></div>
				</div>`;
};

const createCell = (i, row) => {
	const col = toChar(i + 1);
	const id = `${row}:${toChar(i + 1)}`;
	return `
				<div 
					class="cell" 
					data-col="${col}" 
					data-row="${row}" 
					data-id="${id}"
					data-mode="insert"
					contenteditable 
					spellcheck="false"
				>
				</div>`;
};

const createRow = (rowDataCells, index) => {
	return `
    <div class="row">
      <div class="row-info" data-row="${index}" data-type="resizable">
				${index > 0 ? index + '<div class="row-resize" data-resize="row"></div>' : ''}
			</div>
      <div class="row-data">
				${rowDataCells.join('')}
			</div>
    </div>
  `;
};

const generateRow = (index, colsCount) => {
	const rowDataCells = [];

	// Create cells for the row
	for (let i = 0; i <= colsCount; i++) {
		if (index === 0) {
			// Column headers (A, B, C, ...)
			rowDataCells.push(createColumn(i));
		} else {
			// Regular cells
			rowDataCells.push(createCell(i, index));
		}
	}

	return createRow(rowDataCells, index);
};

export function createTable(rowsCount = 20, colsCount = 25) {
	// Generate all rows of the table
	const rows = [];
	for (let i = 0; i <= rowsCount; i++) {
		rows.push(generateRow(i, colsCount));
	}

	return rows.join('');
}