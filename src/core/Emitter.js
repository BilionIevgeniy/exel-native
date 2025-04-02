export class Emitter {
	constructor() {
		this.listeners = {};
	}

	// Send event to listeners
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false;
		}
		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
		return true;
	}

	// Subscribe to event
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);
		return () => {
			// Unsubscribe from event
			this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
		};
	}
}

