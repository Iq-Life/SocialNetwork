import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, Input} from "../common/formControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import containerStyle from "../../Container.module.css"

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                         handleSubmit,
                                                                                                         error,
                                                                                                         captchaUrl
                                                                                                     }) => {
    return <form onSubmit={handleSubmit}>
        {CreateField("Email", "email", [required], Input, null, null)}
        {CreateField("Password", "password", [required], Input, {type: "password"}, null)}
        {CreateField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
        {captchaUrl && <img src={captchaUrl}/>}
        {error && <div className={containerStyle.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnProps>({form: "login"})(LoginForm)

export const Login: React.FC<MapStateToProps & MapDispatchToProps> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isFetching) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const MapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.auth.isFetching,
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect(MapStateToProps, {login},)(Login)

//types
type LoginFormOwnProps = { captchaUrl: string | null }
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    error: string
    captcha: string
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStateToProps = {
    isFetching: boolean
    captchaUrl: string | null
}