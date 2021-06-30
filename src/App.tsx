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
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {initializedApp} from "./redux/app-reducer";

class App extends React.Component <AppContainerType>{
    componentDidMount() {
        this.props.initializedApp()
    }
    render() {
        return <div className="all">
            <div className='app-wrapper'>
                <div className='header'><HeaderContainer/></div>
                <div className="NavAndDisp">
                    <div className="navbar"><Navbar/></div>
                    <div className='display'>
                        <Route path='/login' render={() => <Login/>}/>
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
}

export default connect <MapStateToProps, MapDispatchToProps, {}, AppStateType>
(null , {initializedApp})(App);

//types
type AppContainerType = MapStateToProps & MapDispatchToProps
type MapStateToProps = {}
type MapDispatchToProps = {
    initializedApp: () => void
}