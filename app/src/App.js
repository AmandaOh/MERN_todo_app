import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const todos = await this.getTodos();
    this.setState({data: todos});
  }

  async getTodos() {
    try {
      const response = await fetch('http://localhost:3001');
      return response.json();
    } catch (err) {
      console.log(err)
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
                <input key={item.id} placeholder={item.todo}></input>
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}

export default App;
