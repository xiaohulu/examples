import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/todoHeader.m.css';

export interface TodoHeaderProperties {
	allCompleted: boolean;
	todo: string;
	todoCount: number;
	toggleTodos: (payload: object) => void;
	addTodo: (payload: object) => void;
	setCurrentTodo: (payload: { todo: string }) => void;
}

@theme(css)
export default class TodoHeader extends I18nMixin(ThemedMixin(WidgetBase))<TodoHeaderProperties> {

	protected toggleTodos() {
		this.properties.toggleTodos({});
	}

	protected addTodo(event: KeyboardEvent) {
		if (event.which === 13) {
			this.properties.addTodo({});
		}
	}

	protected setCurrentTodo({ target: { value: todo } }: any): void {
		this.properties.setCurrentTodo({ todo });
	}

	protected render() {
		const { allCompleted, todo, todoCount } = this.properties;
		const { messages } = this.localizeBundle(appBundle);

		return v('header', [
			v('h1', { classes: this.theme(css.title) }, [ messages.appTitle ]),
			v('input', {
				key: 'todo-input',
				focus: true,
				classes: this.theme(css.newTodo),
				onkeydown: this.addTodo,
				oninput: this.setCurrentTodo,
				value: todo,
				placeholder: messages.editPlaceholder
			}),
			v('input', {
				classes: this.theme(css.toggleAll),
				onchange: this.toggleTodos,
				checked: allCompleted,
				type: 'checkbox',
				disabled: todoCount === 0 ? true : false
			})
		]);
	}
}
