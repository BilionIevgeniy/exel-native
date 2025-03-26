class Dom {
	constructor(selector) {
		switch (typeof selector) {
			case 'string':
				this.$el = document.querySelector(selector);
				break;
			default:
				this.$el = selector;
		}
	}

	setHtml(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.innerHTML.trim();
	}

	clearHtml() {
		this.setHtml('');
		return this;
	}

	appendChild(node) {
		this.$el.appendChild(
			node instanceof Dom ? node.$el : node
		);
		return this;
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	get data() {
		return this.$el.dataset;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach((key) => {
				this.$el.style[key] = styles[key];
			});
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.createElement = (tagName, classes = '') => {
	const element = document.createElement(tagName);
	if (classes) {
		element.classList.add(classes);
	}
	return $(element);
};