import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name;
	}

	// return tamplate of component
	toHTML() {
		return '';
	}

	init() {
		this.initDOMListeners();
	}
	destroy() {
		this.removeDOMListeners();
	}
}