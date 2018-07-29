import React, {Component} from 'react';

import './App.css';
import TodoList from './TodoList';
import NavBar from './components/NavBar';


class App extends Component {

  render() {
    return ( 
      <div className="App">
        <NavBar />
        <TodoList />
      </div>
    );
  }
}

export default App;
