import React from 'react';

import TodoList from '../TodoList';

describe('TodoList', () => {
    describe('getTodos', () => {
        it('returns a a list of todos', async () => {
          const component = shallow(<TodoList />);
          const response = {
            data: ["todo1", "todo2"]
          };
    
          window.fetch = jest.fn().mockImplementationOnce(() => {
            return {
              json: () => new Promise((resolve, reject) => resolve(response))
            };
          });
    
          const todos = await component.instance().getTodos();
    
          expect(todos).toEqual(response);
        });
      });
})