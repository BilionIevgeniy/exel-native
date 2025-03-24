import { capitalize } from './utils';

export class DomListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('You must pass a root element');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDOMListeners() {
		this.listeners.forEach((listener) => {
			const callback = getMethodName(listener);
			if (!this[callback]) {
				throw new Error('No ' + callback + ' registered in ' + this.name);
			}
			this[callback] = this[callback].bind(this);
			// same as addEventListener
			this.$root.on(listener, this[callback]);
		});
	}

	removeDOMListeners(eventType, callback) {
		this.listeners.forEach((listener) => {
			const callback = getMethodName(listener);
			if (!this[callback]) {
				throw new Error('No ' + callback + ' registered in ' + this.name);
			}
			// same as removeEventListener
			this.$root.off(listener, this[callback]);
		});
	}
}

function getMethodName(eventName) {
	return 'on' + capitalize(eventName);
}
