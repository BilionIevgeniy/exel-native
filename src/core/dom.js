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

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.innerHTML.trim();
	}

	text(value) {
		if (typeof value === 'string') {
			if (this.$el.tagName.toLowerCase() === 'input') {
				this.$el.value = value;
			} else {
				this.$el.textContent = value;
			}
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}
		return this.$el.textContent.trim();
	}

	clearHtml() {
		this.html('');
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

	findClosestWithDataAttr(el, attribute) {
		while (el) {
			const hasDataAttr = [...el.attributes].some((attr) => attr.name.startsWith(attribute));
			if (hasDataAttr) return el;
			el = el.parentElement;
		}
		return null;
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	findAll(selector) {
		return document.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object
			.keys(styles)
			.forEach((key) => {
				this.$el.style[key] = styles[key];
			});
	}

	id(parse = false) {
		if (parse) {
			const [row, col] = this.data.id.split(':');
			return { row, col };
		}
		return this.data.id;
	}

	addClass(className) {
		this.$el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.$el.classList.remove(className);
		return this;
	}

	focus() {
		this.$el.focus();
		return this;
	}

	blur() {
		this.$el.blur();
		return this;
	}

	find(selector) {
		const el = this.$el.querySelector(selector);
		return el ? $(el) : null;
	}

	findById(id) {
		const el = this.find(`[data-id="${id}"]`);
		return el ? el : null;
	}

	setCaretToEnd() {
		const range = document.createRange();
		const selection = window.getSelection();

		range.selectNodeContents(this.$el);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
		this.$el.focus();

		return this;
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