import { $ } from '../../core/dom';
import { FORMULA_EVENTS, TABLE_EVENTS } from '../../core/Events';
import { ExcelComponent } from '../../core/ExcelComponent';
import { nextSelection } from '../../core/utils';
import { tableResize } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	rowsCount = 20;
	colsCount = 25;

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	toHTML() {
		return createTable(this.rowsCount, this.colsCount);
	}

	onMousedown(event) {
		tableResize(event);
		const $cell = $(event.target);
		const id = $cell.data.id;
		if (id) {
			if (event.shiftKey) {
				this.selection.selectGroup($cell);
			} else {
				this.selection.select($cell);
			}
		}
		this.$emit(TABLE_EVENTS.DISPATCH_VALUE, $cell.text());
	}

	onInput(event) {
		const $cell = $(event.target);
		const id = $cell.data.id;
		if (id) {
			this.$emit(TABLE_EVENTS.DISPATCH_VALUE, event.target.textContent);
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowRight',
			'ArrowLeft',
			'ArrowDown',
			'ArrowUp',
		];

		keys.forEach((key) => {
			if (event.key === key && !event.shiftKey) {
				event.preventDefault();
				const nextCell = nextSelection(key, this.selection.current);
				this.selection.select(nextCell);
				this.$emit(TABLE_EVENTS.DISPATCH_VALUE, nextCell.text());
			}
		});
	}

	init() {
		super.init();
		this.selection = new TableSelection();
		const initialCell = this.$root.find('[data-id="1:A"]');
		this.selection.select(initialCell);
		this.$emit(TABLE_EVENTS.DISPATCH_VALUE, initialCell.text());
		this.$on(FORMULA_EVENTS.FORMULA_INPUT, (value) => {
			this.selection.current.text(value);
		});
		this.$on(FORMULA_EVENTS.FORMULA_DONE, () => {
			this.selection.current.setCaretToEnd();
		});
	}
}