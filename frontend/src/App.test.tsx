import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { applyMiddleware, createStore, Store } from 'redux';
import reducer, { AppState } from './reducer';
import { AppAction } from './actions';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
test('renders onClick button', () => {
});


