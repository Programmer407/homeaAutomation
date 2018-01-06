import React from 'react';
import {reduxForm, change as changeFieldValue,SubmissionError} from 'redux-form'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'


import TestComponentInner from './TestComponentInner'

const fields = ['email', 'password','firstName','confirmPassword']

const mapStateToProps = state =>{
    return {}
}

/*const validate = values =>{
    let errors = {}
    let hasErrors = false

    if(!values.email){
        errors = "Missing email"
        hasErrors = true
    }
    else if (!values.password){
        errors = "Missing password"
        hasErrors = true
    }
    return errors && hasErrors

}*/

@reduxForm({
    form : 'myNewForm',
    fields,
},mapStateToProps)


export default class TestComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSubmit : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({email,password,firstName,confirmPassword}){
       let error = {}
       let isError = false;


       this.setState({isSubmit : false});

        if( !firstName || !firstName.trim() === '' ) {
            error.firstName = 'Missing first name field';
            isError = true;
        } else {
            if (!/^[A-Za-z]/.test(firstName)) {
                error.firstName = 'Invalid input. Type with an open eye?';
                isError = true;
            }
            if (firstName.length > 32) {
                error.firstName = 'You can\'t possibly have that huge a first name. Try again?';
                isError = true;
            }
        }


        if (!email || !email.trim() === '') {
            error.email = 'Missing email field';
            isError = true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            error.email = 'Invalid email address';
            isError = true;
        }


        if(!password || !password.trim() === ''){
            error.password = "required"
            isError = true;
        }
        else if(password.length < 6) {
            error.password = "Password should have at least 6 characters"
            isError = true;
        }


        if (!confirmPassword || !confirmPassword.trim() === '') {
                error.confirmPassword = 'Missing confirm password field';
                isError = true;

        }


        if(password && confirmPassword) {
            if(password != confirmPassword) {
                error.confirmPassword = 'These passwords don\'t match. Try again?';
                isError = true;
            }
        }



        if(isError){
           throw new SubmissionError(error)
       }
       else {
           console.log("form is submitted")
            this.setState({isSubmit : true})

       }

    }

    render(){
        return(
            <TestComponentInner
                {...this.props}
                {...this.state}
                onSubmit = {this.handleSubmit}
            />
        )
    }

}