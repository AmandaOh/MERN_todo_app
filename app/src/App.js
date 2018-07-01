import React, {Component} from 'react';
import {List, Map} from 'immutable';
import Icon from '@material-ui/core/Icon';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: List([])
    };
  }

  async componentDidMount() {
    const todos = await this.getTodos();
    this.setState({data: List(todos)});
  }

  async getTodos() {
    try {
      const response = await fetch('/todos');
      return response.json();
    } catch (err) {
      console.log(err)
    }
  }

  handleChange(index, e) {
    const currentTodos = this.state.data;
    const updatedTodos = currentTodos.update(index, item => Map(item).set("todo", e.target.value).toObject());

    this.setState({data: updatedTodos});
  }

  handleKeyDown(id, e) {
    if (e.key === 'Enter') {
      this.updateTodoList(id, e.target.value);
    }
  }

  async updateTodoList(id, updatedTodo) {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, todo: updatedTodo})
      });
    } catch (err) {
      console.log(err);
    }
  }

  addAnotherRow(index, e) {
    const currentTodos = this.state.data;
    const lastId = currentTodos.get(-1).id;

    const updatedTodos = currentTodos.insert(index + 1, {
      id: lastId + 1,
      todo: ""
    })

    this.setState({data: updatedTodos})
  }

  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Todo List with React</h1>
      </header>
      {
        this.state.data && <ul>
            {
              this.state.data.map((item, index) =>
              <li>
                <input key={item._id} type="text" value={item.todo} onChange={(e) => this.handleChange(index, e)} onKeyDown={(e) => this.handleKeyDown(item.id, e)} className="todo-input"/>
                <Icon color="primary" onClick={(e) => this.addAnotherRow(index, e)} className="add-todo">add_circle</Icon>
              </li>)
            }
          </ul>
      }
    </div>);
  }
}

export default App;
