import React, {FormEvent} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, Input} from "../common/formControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import s from "../common/formControls/FormsControls.module.css"

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        {CreateField("Email", "email", [required], Input, null, null)}
        {CreateField("Password", "password", [required], Input, {type: "password"}, null)}
        {CreateField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
        { error && <div className={s.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm)

export const Login: React.FC<MapStateToProps & MapDispatchToProps> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isFetching) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const MapStateToProps = (state: AppStateType) => {
    return {
        isFetching: state.auth.isFetching
    }
}
export default connect(MapStateToProps, {login})(Login)

//types
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
    error: string
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type MapStateToProps = {
    isFetching: boolean
}