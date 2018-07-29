import React from 'react';

import App from '../App';
import TodoList from '../TodoList';

describe('App', () => {
    it('renders TodoList', () => {
        const component = shallow(<App />);

        expect(component.find(TodoList)).toExist();
    });
});

