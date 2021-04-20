import React from "react";
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import Settings from "./components/Setting/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";


function App() {



    return <div className="all">
        <div className='app-wrapper'>
            <div className='header'><HeaderContainer /></div>
            <div className="NavAndDisp">
                <div className="navbar"><Navbar/></div>
                <div className='display'>
                    <Route path='/login'
                           render={() => <Login/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/settings'
                           render={() => <Settings/>}/>
                    <Route path='/news'
                           render={() => <News/>}/>
                    <Route path='/music'
                           render={() => <Music/>}/>
                </div>
            </div>
        </div>

    </div>
}

export default App;