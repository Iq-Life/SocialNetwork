import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {RooTStateType, StoreType} from "./redux/state";
import store from "./redux/redux-store";

let rerenderEntireTree = (state: RooTStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>, document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())
store.subscribe(()=> {
    let state = store.getState()
    rerenderEntireTree(state)})