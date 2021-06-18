import React, {FormEvent} from "react";
import  {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type FormDataType ={
    email: string
    password:string
    rememberMe: boolean
    handleSubmit:(event: FormEvent<HTMLFormElement>) => void
}
type MapDispatchToProps ={
    login: (email: string, password:string, rememberMe: boolean) => void
}
type MapStateToProps ={
    isFetching:boolean
}
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) =>{

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Email"} name={"email"}
                   component={Input} validate={[required]}/>
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} type={"password"}
                   component={Input} validate={[required]}/>
        </div>
        <div>
            <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({form: "email"})(LoginForm)

export const Login: React.FC<MapStateToProps&MapDispatchToProps> = (props) => {
    const onSubmit = (formData:FormDataType) => {
        props.login( formData.email, formData.password, formData.rememberMe)
        console.log(formData)
    }
    if (props.isFetching){
        return <Redirect to={"/profile"} />
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