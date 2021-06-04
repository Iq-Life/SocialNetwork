import React, {FormEvent} from "react";
import Field, {reduxForm} from "redux-form";

type LoginFormType ={
    handleSubmit:(event: FormEvent<HTMLFormElement>) => void
}

export const LoginForm = (props: LoginFormType) =>{

    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Login"} name={"login"} component={"input"}/>
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={"input"}/>
        </div>
        <div>
            <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<number>({form: "login"})(LoginForm)

export const Login = () => {

    return <div>
        <h1>Login</h1>
        <LoginForm />
    </div>
}
