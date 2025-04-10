import { $ } from '../../core/dom';
import { FORMULA_EVENTS } from '../../core/Consts';
import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options,
		});
		this.subscribe = ['tableState'];
	}

	toHTML() {
		return `
		<div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false" data-input></div>
		`;
	}

	onInput(event) {
		const inputValue = $(event.target).text();
		this.$emit(FORMULA_EVENTS.FORMULA_INPUT, inputValue);
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			event.target.blur();
			this.$emit(FORMULA_EVENTS.FORMULA_DONE);
		}
	}

	onStoreChange({ tableState }) {
		this.formula.text(tableState.currentCellValue);
	}

	init() {
		super.init();
		this.formula = this.$root.find('[data-input]');
	}
}