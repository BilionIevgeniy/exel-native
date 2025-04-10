import { matrix } from '../../core/utils';
import { setActiveCellsAction } from '../../redux/components/tableStore/tableActions';

export class TableSelection {
	static className = 'selected';

	constructor(dispatch, root) {
		this.$root = root;
		this.$dispatch = dispatch;
		this.group = [];
		this.current = null;
	}

	setCurrent($el) {
		this.current = $el;
		this.$dispatch(setActiveCellsAction([$el.id()]));
	}

	// $el - DOM element
	select($el) {
		this.clear();
		this.group.push($el);
		this.setCurrent($el);
		$el.focus().addClass(TableSelection.className);
	}

	// $target - DOM element
	selectGroup($target) {
		if (!this.current) return;

		const current = this.current.id(true);
		const target = $target.id(true);

		const cells = matrix(current, target);
		// Select all cells in the range
		this.clear();

		this.$dispatch(setActiveCellsAction(cells));
		cells.forEach((id) => {
			const $el = this.$root.findById(id);

			this.group.push($el);
			$el.addClass('selected');
		});
	}

	clear() {
		this.group.forEach((el) => el.removeClass(TableSelection.className));
		this.group = [];
	}
}
