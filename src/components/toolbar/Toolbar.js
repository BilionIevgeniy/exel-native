import { ExcelComponent } from '../../core/ExcelComponent';
import { cellBtnStateAction } from '../../redux/components/tableStore/tableActions';

export class Toolbar extends ExcelComponent {
	static className = 'excel__toolbar';

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			...options,
		});
		this.subscribe = ['tableState'];
	}

	toHTML() {
		return `
				<div class="button" data-alignleft>
          <i class="material-icons">format_align_left</i>
        </div>

        <div class="button" data-aligncenter>
          <i class="material-icons">format_align_center</i>
        </div>

        <div class="button" data-alignright>
          <i class="material-icons">format_align_right</i>
        </div>

        <div class="button" data-bold>
          <i class="material-icons">format_bold</i>
        </div>

        <div class="button" data-italic>
          <i class="material-icons">format_italic</i>
        </div>

        <div class="button" data-underlined>
          <i class="material-icons">format_underlined</i>
        </div>
		`;
	}

	onStoreChange({ tableState: { activeCells, cellContent } }) {
		this.activeCells = activeCells;
		this.cellContent = cellContent;
		this.setBtnsState(activeCells, cellContent);
	}

	resetAlignBtnsState() {
		this.aligncenterBtn.removeClass('active');
		this.alignleftBtn.removeClass('active');
		this.alignrightBtn.removeClass('active');
		this.activeAlignBtnType = null;
	}

	resetAllBtnsState() {
		this.resetAlignBtnsState();
		this.boldBtn.removeClass('active');
		this.italicBtn.removeClass('active');
		this.underlinedBtn.removeClass('active');
	}

	toggleAlignBtns(textAlign) {
		this.resetAlignBtnsState();
		this[`${textAlign}Btn`].addClass('active');
		this.activeAlignBtnType = textAlign;
	}

	setBtnsState(activeCells, cellContent) {
		const emptyState = {
			bold: null,
			italic: null,
			underlined: null,
			textAlign: null,
		};
		if (activeCells.length === 1) {
			this.shouldSaveMultiState = false;
			const activeCellContent = cellContent[activeCells[0]] || emptyState;
			const {
				bold,
				italic,
				underlined,
				textAlign,
			} = activeCellContent;
			this.btnsState = { ...activeCellContent };

			bold ? this.boldBtn.addClass('active') : this.boldBtn.removeClass('active');
			italic ? this.italicBtn.addClass('active') : this.italicBtn.removeClass('active');
			underlined ? this.underlinedBtn.addClass('active') : this.underlinedBtn.removeClass('active');
			if (textAlign) {
				this.toggleAlignBtns(textAlign);
			} else {
				this.resetAlignBtnsState();
			}
		} else if (!this.shouldSaveMultiState) {
			this.resetAllBtnsState();
			this.btnsState = emptyState;
		}
	}

	setInitialValues() {
		const { tableState: { activeCells, cellContent } } = this.store.getState();
		this.setBtnsState(activeCells, cellContent);
	}

	getButtonsApi() {
		this.alignleftBtn = this.$root.find('[data-alignleft]');
		this.aligncenterBtn = this.$root.find('[data-aligncenter]');
		this.alignrightBtn = this.$root.find('[data-alignright]');
		this.boldBtn = this.$root.find('[data-bold]');
		this.italicBtn = this.$root.find('[data-italic]');
		this.underlinedBtn = this.$root.find('[data-underlined]');
	}

	onClick(event) {
		const btn = this.$root.findClosestWithDataAttr(event.target, 'data-');
		if (btn) {
			const btnType = Object.keys(btn.dataset)[0];
			if (btnType.startsWith('align')) {
				if (this.activeAlignBtnType === btnType) {
					this.btnsState['textAlign'] = null;
					this.resetAlignBtnsState();
				} else {
					this.btnsState['textAlign'] = btnType;
					this.toggleAlignBtns(btnType);
				}
			} else {
				if (btn.classList.contains('active')) {
					this.btnsState[btnType] = false;
					btn.classList.remove('active');
				} else {
					this.btnsState[btnType] = true;
					btn.classList.add('active');
				}
			}
		}
		const newCellContent = { ...this.cellContent };
		this.activeCells.forEach((id) => {
			newCellContent[id] = {
				...newCellContent[id],
				...this.btnsState,
			};
		});

		if (this.activeCells.length > 0) {
			this.shouldSaveMultiState = true;
		}
		this.$dispatch(cellBtnStateAction(newCellContent));
	}

	init() {
		super.init();
		this.getButtonsApi();
		this.setInitialValues();
	}
}