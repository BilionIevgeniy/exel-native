import { $ } from '../../core/dom';
export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.options = options || {};
		this.components = options.components || [];
		this.emitter = options.emitter;
		this.store = options.store;
		this.subscriber = options.subscriber;
	}

	getRootNode() {
		const $rootDomEl = $.createElement('div', 'excel');

		this.components = this.components.map((Component) => {
			const $domEl = $.createElement('div', Component.className);
			const component = new Component($domEl, {
				emitter: this.emitter,
				store: this.store,
			});
			$domEl.html(component.toHTML());
			$rootDomEl.appendChild($domEl);
			return component;
		});

		return $rootDomEl.$el;
	}

	render() {
		this.$el.appendChild(this.getRootNode());
		this.subscriber.subscribeComponents(this.components);
		const initialState = JSON.parse(localStorage.getItem('store'));
		initialState && this.store.setState(initialState);
		this.components.forEach((component) => component.init());
	}

	destroy() {
		this.components.forEach((component) => component.destroy());
		this.subscriber.unsubscribeFromStore();
	}
}
