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
		this.$el.appendChild(node instanceof Dom ? node.$el : node);
		return this;
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
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