import React from 'react';
import {shallow, mount} from 'enzyme';
import {Todo} from './Todo';

test('rendered Todo component', () => {
    const todoModel = {
        name: 'egy',
        key: '1',
        categoryId: '3.3',
        description: 'agsdgxdhbxfgncfncvhm',
        done: true
    };
    const wrapper = shallow(
        <Todo todo={todoModel} />
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.todoFinished').at(0).prop('checked')).toBe(true);
    expect(wrapper.text()).toMatch(todoModel.name);
//    const a = wrapper.find('a');
//    console.log('B', a.at(0));
//    wrapper.find('.todoFinished').at(0).simulate('click');
//    expect(a).toEqual('/todo/' + todoModel.key);
    //expect(wrapper.find('a').at(0).prop('href')).toEqual('/todo/' + todoModel.key);
});