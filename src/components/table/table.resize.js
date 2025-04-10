import { $ } from '../../core/dom';

export function resizeAllCells({ col, row, value }) {
	if (col) {
		document.querySelectorAll(`[data-col="${col}"]`).forEach((c) => {
			c.style.width = `${value}px`;
		});
	}
	if (row) {
		document.querySelectorAll(`[data-row="${row}"]`).forEach((r) => {
			r.style.height = `${value}px`;
		});
	}
}

export function tableResize(event) {
	return new Promise((resolve) => {
		const $resizer = $(event.target);
		const resizeType = $resizer.data.resize;
		if (!resizeType) return;
		const $parent = $resizer.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();
		let value;
		let col = null;
		let row = null;

		const mouseMoveHandler = (e) => {
			if (resizeType === 'col') {
				col = $parent.data.col;
				document.body.style.cursor = 'col-resize';
				const delta = e.pageX - coords.right;
				value = coords.width + delta;
				$resizer.css({
					opacity: 1,
					bottom: '-5000px',
					right: -delta + 'px',
				});
			}

			if (resizeType === 'row') {
				const delta = e.pageY - coords.bottom;
				value = coords.height + delta;
				$resizer.css({
					opacity: 1,
					right: '-5000px',
					bottom: -delta + 'px',
				});
				row = $parent.data.row;
				document.body.style.cursor = 'row-resize';
			}
		};

		const mouseUpHandler = () => {
			document.removeEventListener('mousemove', mouseMoveHandler);
			resizeAllCells({ col, row, value });
			resolve({
				value,
				col,
				row,
			});
			$resizer.css({
				opacity: 0,
				right: 0,
				bottom: 0,
			});
			document.body.style.cursor = 'default';
			document.removeEventListener('mousemove', mouseUpHandler);
			value = null;
			col = null;
			row = null;
		};

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	});
}