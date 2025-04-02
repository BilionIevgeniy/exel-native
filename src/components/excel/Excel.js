import { $ } from '../../core/dom';
import { Emitter } from '../../core/Emitter';
export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.options = options || {};
		this.components = this.options.components || [];
		this.emitter = new Emitter();
	}

	getRootNode() {
		const $rootDomEl = $.createElement('div', 'excel');

		this.components = this.components.map((Component) => {
			const $domEl = $.createElement('div', Component.className);
			const component = new Component($domEl, {
				emitter: this.emitter,
			});
			$domEl.html(component.toHTML());
			$rootDomEl.appendChild($domEl);
			return component;
		});

		return $rootDomEl.$el;
	}

	render() {
		this.$el.appendChild(this.getRootNode());
		this.components.forEach((component) => component.init());
	}

	destroy() {
		this.components.forEach((component) => component.destroy());
	}
}
