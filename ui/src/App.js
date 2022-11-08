

import './App.css';
import ToDoList from './components/ToDoList';
import { Provider } from 'react-redux';
import store from './store';
import React from 'react';
import actions from './actions';

class App extends React.Component {

	componentDidMount() {
		actions.initTodoList();
	}

	render() {
		return <Provider store={store}>
			<ToDoList />
		</Provider>
	}
}

export default App;
