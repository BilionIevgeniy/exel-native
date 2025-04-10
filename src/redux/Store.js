import { rootReducer } from './reducers';

class Store {
	#state = {};

	constructor(rootReducer) {
		this.rootReducer = rootReducer;
		this.subscribers = [];
		this.setState(rootReducer(this.#state));
	}

	dispatch(action) {
		const newState = this.rootReducer(this.#state, action);
		this.setState(newState);

		if (Array.isArray(this.subscribers)) {
			this.subscribers.forEach((subscriber) => subscriber(this.#state));
		}
		localStorage.setItem('store', JSON.stringify(newState));
	}

	getState() {
		return this.#state;
	}

	setState(state) {
		const newState = Object.keys(state).reduce((newValue, key) => {
			return {
				...newValue,
				[key]: {
					...this.#state[key],
					...state[key],
				},
			};
		}, {});
		this.#state = newState;
	}

	subscribe(fn) {
		this.subscribers.push(fn);
		return {
			unsubscribe() {
				this.subscribers = this.subscribers.filter((subscriber) => subscriber !== fn);
			},
		};
	}
}

export default new Store(rootReducer);
