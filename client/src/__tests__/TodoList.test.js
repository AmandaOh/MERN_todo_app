import React from 'react';

import {_TestTodoList} from '../TodoList';

describe('TodoList', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    describe('getTodos', () => {
        it('returns a a list of todos', async () => {
          const component = shallow(<_TestTodoList classes={{root: ""}} />);
          const response = {
            data: ["todo1", "todo2"]
          };
    
          fetch.mockResponse(JSON.stringify(response));
    
          const todos = await component.instance().getTodos();
    
          expect(todos).toEqual(response);
        });
      });
})