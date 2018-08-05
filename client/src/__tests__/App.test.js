import React from 'react';

import {_TestApp} from '../App';
import TodoList from '../TodoList';

describe('App', () => {
    it('renders TodoList', () => {
        const component = shallow(<_TestApp classes={{root: ""}} />);

        expect(component.find(TodoList)).toExist();
    });
});

