import { Excel } from './components/excel/Excel';
import { Formula } from './components/formula/Formula';
import { Header } from './components/header/Header';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import { Emitter } from './core/Emitter';
import { StoreSubscriber } from './core/StoreSubscriber';
import store from './redux/Store';

import './scss/index.scss';

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store,
	emitter: new Emitter(),
	subscriber: new StoreSubscriber(store),
});

excel.render();
