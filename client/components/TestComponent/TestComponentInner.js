import React from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


import './TestComponentInner.scss'

const TestComponentInner = props =>{
    const {validate,submitting, fields: {email, password}, handleSubmit, onSubmit,isSubmit} = props
    const fnSubmit = handleSubmit(onSubmit)
    const canSubmit = true

    let btnSubmitLabel = 'Sign in'

    if (isSubmit) {
        btnSubmitLabel = 'Signing in ...'
    }

    const renderField = ({type,input,label,meta : {touched,error}}) => (
        <div>
           <label>{label}</label>
            <input {...input} type={type}/>
            {touched && error &&
            <span>{error}</span>}
        </div>
    )

    console.log(props);

    return(
        <div>This is test component
            <form onSubmit={ fnSubmit }>
                <Field  name="firstName" label="First Name" component={renderField} type="text" />
                    <Field name="email" label="email" component={renderField} type="email" />
                    <Field name="password" label="password" component={renderField} type="password" />
                <Field name="confirmPassword" label="Confirm password" component={renderField} type="password" />
                <button disabled={submitting} type="submit">{btnSubmitLabel}</button>
            </form>
        </div>
    )
}

export default TestComponentInner;