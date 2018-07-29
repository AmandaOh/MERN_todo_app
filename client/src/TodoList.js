import React, { Component } from 'react';
import { List, Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import Todo from './Todo';

const styles = {
  root: {
    margin: 'auto',
    width: '50%',
  },
  addCircle: {
    color: '#76d6e8',
  },
  addTodo: {
    cursor: 'pointer',
  }
}

class TodoList extends Component {
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

  handleChange = (index, e) => {
    const currentTodos = this.state.data;
    const updatedTodos = currentTodos.update(index, item => Map(item).set("todo", e.target.value).toObject());

    this.setState({data: updatedTodos});
  }

  handleKeyDown = (id, e) => {
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
    const { classes } = this.props;

    return(this.state.data &&
          <ul className={classes.root}>
            {
              this.state.data.map((item, index) =>
              <li>
                <Todo todo={item} index={index} handleChange={this.handleChange} handleKeyDown={this.handleKeyDown} />
                <Icon onClick={(e) => this.addAnotherRow(index, e)} className="add-todo" classes={{ root: classes.addCircle }}>add_circle</Icon>
              </li>)
            }
          </ul>
    );
  }

}

export default withStyles(styles)(TodoList);
