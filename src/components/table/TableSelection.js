import { matrix } from '../../core/utils';

export class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
		this.current = null;
	}

	// $el - DOM element
	select($el) {
		this.clear();
		this.group.push($el);
		this.current = $el;
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
		cells.forEach((id) => {
			const $el = $target.find(`[data-id="${id}"]`);
			this.group.push($el);
			$el.addClass('selected');
		});
	}

	clear() {
		this.group.forEach((el) => el.removeClass(TableSelection.className));
		this.group = [];
	}
}
