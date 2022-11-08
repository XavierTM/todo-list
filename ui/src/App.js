

import './App.css';
import ToDoList from './components/ToDoList';
import { Provider } from 'react-redux';
import store from './store';
import React from 'react';
import actions from './actions';
import { VIEW_PORT } from './constants';

class App extends React.Component {

	componentDidMount() {

		actions.initTodoList();

		document.documentElement.style.setProperty('--viewport-height', VIEW_PORT.HEIGHT + 'px');
		document.documentElement.style.setProperty('--viewport-width', VIEW_PORT.WIDTH + 'px');
		
	}

	render() {
		return <Provider store={store}>
			<ToDoList />
		</Provider>
	}
}

export default App;
