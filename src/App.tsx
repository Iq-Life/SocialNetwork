import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import Settings from "./components/Setting/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import {ActionTypes, RooTStateType} from "./redux/state";
import DialogsContainer from "./components/Dialogs/DialogContainer";

type AppType ={
    state:RooTStateType
    dispatch: (action:ActionTypes) => void
}
function App () {

    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs'
                       render={ () => <DialogsContainer /> }/>
                <Route path='/profile'
                       render={ () => <Profile /> }/>
                <Route path='/settings'
                       render={ () => <Settings/> }/>
                <Route path='/news'
                       render={ () => <News/> }/>
                <Route path='/music'
                       render={ () => <Music/> }/>
            </div>
        </div>

)}

export default App;
