import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {RooTStateType} from "./redux/state";
import {Provider} from "react-redux";
import store from "./redux/redux-store";

let rerenderEntireTree= (state: RooTStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())
store.subscribe(()=> {
    let state = store.getState()
    rerenderEntireTree(state)})