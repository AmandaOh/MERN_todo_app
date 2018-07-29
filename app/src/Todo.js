import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = {
  todoInput: {
    width: '80%',
    'font-size': '1em',
    border: 'none',
    padding: '2%',
  }
}

class Todo extends Component {

  render() {
    const {todo, index, handleChange, handleKeyDown, classes} = this.props;

    return (
      <input key={todo._id}
             type="text"
             value={todo.todo}
             onChange={(e) => handleChange(index, e)}
             onKeyDown={(e) => handleKeyDown(todo.id, e)}
             className={classes.todoInput}/>
    );
  }
}
export default withStyles(styles)(Todo);
