import { $ } from '../../core/Dom';

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.options = options || {};
		this.components = this.options.components || [];
	}

	getRootNode() {
		const $rootDomEl = $.createElement('div', 'excel');

		this.components = this.components.map((Component) => {
			const $domEl = $.createElement('div', Component.className);
			const component = new Component($domEl);
			$domEl.setHtml(component.toHTML());
			$rootDomEl.appendChild($domEl);
			return component;
		});

		return $rootDomEl.$el;
	}

	render() {
		this.$el.appendChild(this.getRootNode());
		this.components.forEach((component) => component.init());
	}
}
