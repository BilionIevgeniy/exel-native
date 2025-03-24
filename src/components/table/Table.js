/* eslint-disable max-len */
import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	rowsCount = 20;
	colsCount = 25;
	constructor($root) {
		super($root, {
			name: 'Formula',
			// listeners: ['input'],
		});
	}

	toHTML() {
		return createTable(this.rowsCount, this.colsCount);
	}
}