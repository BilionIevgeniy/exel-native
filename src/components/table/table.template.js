import { toChar } from '../../core/utils';

const createRow = (index, colsCount) => {
	const rowDataCells = [];

	// Create cells for the row
	for (let i = 0; i <= colsCount; i++) {
		if (index === 0) {
			// Column headers (A, B, C, ...)
			rowDataCells.push(`<div class="cell">${toChar(i + 1)}</div>`);
		} else {
			// Regular cells
			rowDataCells.push(`<div class="cell" data-col="${toChar(i + 1)}" 
						data-row="${index}" contenteditable spellcheck="false"></div>`);
		}
	}

	return `
            <div class="row">
                <div class="row-info">${index > 0 ? index : ''}</div>
                <div class="row-data">${rowDataCells.join('')}</div>
            </div>
        `;
};

export function createTable(rowsCount = 20, colsCount = 25) {
	// Generate all rows of the table
	const rows = [];
	for (let i = 0; i <= rowsCount; i++) {
		rows.push(createRow(i, colsCount));
	}

	return rows.join('');
}