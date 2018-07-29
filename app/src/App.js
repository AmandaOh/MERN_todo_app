import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles'; 

import TodoList from './TodoList';
import NavBar from './components/NavBar';

const styles = {
  root: {
    'text-align': 'center',
  },
}

class App extends Component {

  render() {
    const { classes } = this.props;

    return ( 
      <div className={classes.root}>
        <NavBar />
        <TodoList />
      </div>
    );
  }
}

export default withStyles(styles)(App);
