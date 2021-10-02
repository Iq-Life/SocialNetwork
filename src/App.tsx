import React from "react";
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Settings from "./components/Setting/Settings";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import {Preloader} from "./components/common/preloader/Preloader";
import {compose} from "redux";
import {withRouter} from "react-router";

//const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogContainer'));
//const Login = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component <AppContainerType> {
    /* catchAllUnhandledErrors = (reason: string, promise: string) => {
         alert("Some error occurred")
     }*/

    componentDidMount() {
        this.props.initializeApp()
        //    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        //     window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialize) {
            return <Preloader/>
        } else {
            return (
                <div className="all">
                    <div className='app-wrapper'>
                        <div className='header'><HeaderContainer/></div>
                        <div className="NavAndDisp">
                            <div className="navbar"><Navbar/></div>
                            <div className='display'>
                                <Switch>
                                    <Redirect exact from='/' to={"/profile"}/>
                                    {/*<Route path='/login' render={withSuspense(<Login/>)}/>*/}
                                    <Route path='/login' render={() => <Login/>}/>
                                    {/*<Route path='/dialogs' render={withSuspense(<DialogsContainer/>)}/>*/}
                                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
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
                                    <Route path='*'
                                           render={() => <div>404 NOT FOUND</div>}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        initialize: state.app.initialized
    }
}
let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (MapStateToProps, {initializeApp}))(App)

export const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

//types
type AppContainerType = MapStateToPropsType & MapDispatchToPropsType & ErrorWindowType
type MapStateToPropsType = { initialize: boolean }
type MapDispatchToPropsType = { initializeApp: () => void }
type ErrorWindowType = {
    catchAllUnhandledErrors: (reason: string, promise: string) => void
}
