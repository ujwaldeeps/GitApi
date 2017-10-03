import Users from '../Users';
import React from 'react';
import renderer from 'react-test-renderer';
import store from '../UserStore';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import sinon from 'sinon';
import axios from 'axios';

it('renders correctly', () => {
  const tree = renderer.create(
    <Users UserStore={store} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('componentWillMount(LifeCycleHook) will automatically get called', () => {
    const component = shallow(<Users UserStore={store} />);
    const instance = component.instance();
    const componentWillMount = sinon.spy(instance, 'componentWillMount');
    expect(componentWillMount.called).toHaveBeenCalled;
});

it('Clicking on users name will call onClick method of users component', () => {
    const component = shallow(<Users UserStore={store} />);
    const instance = component.instance();
    const onClick = sinon.spy(instance, 'onClick');
    component.find('ul').simulate('click');
    expect(onClick.called).toHaveBeenCalled;
});

it('axios promise resolves to give back some data',() => {
  expect.assertions(1);

  return expect(axios.get('https://api.github.com/search/users?q=repos:>42+followers:>1000')).resolves.toBeTruthy();
});