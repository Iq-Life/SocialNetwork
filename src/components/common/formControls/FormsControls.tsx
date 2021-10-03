import React from "react";
import styles from "./FormsControls.module.css";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form/lib/Field";
import {FieldValidatorType} from "../../../utils/validators/validators";
import {Field} from "redux-form";

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

export function CreateField<FormKeysType extends string>(placeholder: string | null, name: FormKeysType, validate: Array<FieldValidatorType>,
                                                         component: React.FC<WrappedFieldProps>, props: {} | null, text: string | null) {
    return <div>
        <Field placeholder={placeholder} name={name}
               component={component} validate={validate}
               {...props}
        /> {text}
    </div>
}

//type
type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
