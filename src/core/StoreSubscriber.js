import _ from 'lodash';

export class StoreSubscriber {
	constructor(store) {
		this.store = store;
		this.sub = null;
	}

	subscribeComponents(components) {
		let prevState = this.store.getState();
		this.sub = this.store.subscribe((state) => {
			Object.keys(state).forEach((key) => {
				if (!_.isEqual(state[key], prevState[key])) {
					components.forEach((component) => {
						if (component.subscribe.includes(key)) {
							component.onStoreChange({ [key]: state[key] });
						}
					});
				}
			});
			prevState = state;
		});
	}

	unsubscribeFromStore() {
		this.sub.unsubscribe();
	}
}