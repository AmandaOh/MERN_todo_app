import React, {Component} from 'react';
import './Todo.css';

class Todo extends Component {

  render() {
    const {todo, index, handleChange, handleKeyDown} = this.props;

    return (
      <input key={todo._id}
             type="text"
             value={todo.todo}
             onChange={(e) => handleChange(index, e)}
             onKeyDown={(e) => handleKeyDown(todo.id, e)}
             className="todo-input"/>
    );
  }
}

export default Todo;
