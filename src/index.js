import React from 'react';
import ReactDOM from 'react-dom';
import Users from './Users';
import './App.css';
import store from './UserStore';



ReactDOM.render(
    <Users UserStore={store}/>, document.getElementById('root')
);
