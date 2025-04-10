import { $ } from '../../core/dom';
import { FORMULA_EVENTS, TABLE_EVENTS } from '../../core/Consts';
import { ExcelComponent } from '../../core/ExcelComponent';
import { nextSelection } from '../../core/utils';
import { resizeAllCells, tableResize } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { cellInputAction, resizeAction, setCurrentSellValueAction } from '../../redux/components/tableStore/tableActions';

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

	async resizeTable(event) {
		const resizer = await tableResize(event);
		try {
			this.$dispatch(resizeAction(resizer));
		} catch (error) {
			console.error(error);
		}
	}

	onMousedown(event) {
		this.resizeTable(event);
		const $cell = $(event.target);
		const id = $cell.data.id;
		if (id) {
			if (event.shiftKey) {
				this.selection.selectGroup($cell);
			} else {
				this.selection.select($cell);
			}
		}
		this.$dispatch(setCurrentSellValueAction({
			value: $cell.text(),
		}));
	}

	onInput(event) {
		const $cell = $(event.target);
		const id = $cell.data.id;
		if (id) {
			const value = event.target.textContent;
			this.$dispatch(cellInputAction({
				id,
				value,
			}));
			this.$dispatch(setCurrentSellValueAction({
				value,
			}));
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

	setInitialValues() {
		const { tableState: { colState, rowState, cellContent } } = this.store.getState();
		Object.keys(colState).forEach((col) => {
			resizeAllCells({ col, value: colState[col] });
		});
		Object.keys(rowState).forEach((row) => {
			resizeAllCells({ row, value: rowState[row] });
		});
		Object.keys(cellContent).forEach((id) => {
			const $cell = this.$root.findById(id);
			$cell.text(cellContent[id].value);
		});
	}

	initialSelection() {
		this.selection = new TableSelection(this.$dispatch.bind(this), this.$root);
		const initialCell = this.$root.findById('1:A');
		this.selection.select(initialCell);
		this.$dispatch(setCurrentSellValueAction({
			value: initialCell.text(),
		}));
	}

	initSubscribers() {
		this.$on(FORMULA_EVENTS.FORMULA_INPUT, (value) => {
			this.selection.current.text(value);
			this.$dispatch(cellInputAction({
				id: this.selection.current.id(),
				value,
			}));
		});
		this.$on(FORMULA_EVENTS.FORMULA_DONE, () => {
			this.selection.current.setCaretToEnd();
		});
	}

	init() {
		super.init();
		this.setInitialValues();
		this.initialSelection();
		this.initSubscribers();
	}
}