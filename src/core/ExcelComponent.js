import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name;
		this.emitter = options.emitter;

		this.store = options.store;
		this.unsubscribers = [];
		this.subscribe = [];
	}

	// return tamplate of component
	toHTML() {
		return '';
	}

	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	init() {
		this.initDOMListeners();
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	onStoreChange(state) { }

	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach((unsub) => unsub());
	}

	getAllMethods() {
		return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
			.filter((prop) => typeof this[prop] === 'function' && prop !== 'constructor');
	}
}