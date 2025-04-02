import { ExcelComponent } from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['click'],
			...options,
		});
	}
	toHTML() {
		return `
		<input type="text" value="New Table" class="input"></input>
        <div>
          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
		`;
	}

	onClick(event) {
		console.log('Header: click', event);
	}
}