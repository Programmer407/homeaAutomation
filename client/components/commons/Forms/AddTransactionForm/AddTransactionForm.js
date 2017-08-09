// libs
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

// src
import { bindForm } from '../../../../utils'
import AddTransactionFormInner from './AddTransactionFormInner'

const fields = []
const initialValues = {}
const validate = values => {
	let errors = {}
	let hasErrors = false

	/* Validation stuff here */

	return hasErrors && errors
}

@reduxForm({
	form: 'addTransactionForm',
	fields,
	validate,
	initialValues,
	touchOnBlur: false
})
@bindForm({
	onSubmit: (values, dispatch, props) => {
		/* Dispatch action here */
	}
})
class AddTransactionForm extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <AddTransactionFormInner {...this.props} />
	}
}

export default AddTransactionForm