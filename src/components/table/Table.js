import { ExcelComponent } from '../../core/ExcelComponent';
import { tableResize } from './table.resize';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	rowsCount = 20;
	colsCount = 25;

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown'],
		});
	}

	toHTML() {
		return createTable(this.rowsCount, this.colsCount);
	}

	onMousedown(event) {
		tableResize(event);
	}
}