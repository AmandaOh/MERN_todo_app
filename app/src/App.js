import React, { Component } from 'react';
import { List, Map } from 'immutable';
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

  handleChange(id, e) {
    const currentTodos = this.state.data;
    const indexToUpdate = currentTodos.findIndex(item => item._id === id);
    const updatedTodos = currentTodos.update(indexToUpdate, item => Map(item).set("todo", e.target.value).toObject());

    this.setState({
      data: updatedTodos
    });
  }

  handleKeyDown(id ,e) {
    if(e.key === 'Enter') {
      this.updateTodoList(id, e.target.value);
    }
  }

  async updateTodoList(id, updatedTodo) {
    try {
      const response = await fetch(`/todos/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: id,
          todo: updatedTodo
        })
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List with React</h1>
        </header>
        {this.state.data &&
          <ul>
            {this.state.data.map((item) =>
              <li>
                <input key={item._id}
                  type="text"
                  value={item.todo}
                  onChange={(e) => this.handleChange(item._id, e)}
                  onKeyDown={(e) => this.handleKeyDown(item._id, e)}
                  className="todo-input" />
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}

export default App;
