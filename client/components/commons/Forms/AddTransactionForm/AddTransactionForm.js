// libs
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

// src
import { bindForm } from '../../../../utils'
import { insertTransaction } from "../../../../actions/entities/transactions"
import AddTransactionFormInner from './AddTransactionFormInner'

const fields = [ 'transactionDate', 'destination', 'amount', 'asset', 'value', 'type', 'note' ]

const validate = values => {
	const errors = {}
	let hasErrors = false
	const { transactionDate, destination, amount, asset, value, note, type } = values
	
	if ( !transactionDate) {
		errors.transactionDate = 'Missing date field.'
		hasErrors = true
	}
	if ( !destination || destination.trim() === '' ) {
		errors.destination = 'Provide at least one address.'
		hasErrors = true
	}
	if ( !amount || amount.trim() === '' ) {
		errors.amount = 'Provide at least one address.'
		hasErrors = true
	}
	if ( !asset ) {
		errors.asset = 'Select a valid asset from the list.'
		hasErrors = true
	}

	if ( !value || value.trim() === '' ) {
		errors.value = 'Missing value field.'
		hasErrors = true
	} else if (value < 0) {
		errors.value = "Think positive."
		hasErrors = true
	}

	if ( !type ) {
		errors.type = 'Select a valid type from the list.'
		hasErrors = true
	} 

	if ( !note || note.trim() === '' ) {
		errors.note = 'Provide at least one address.'
		hasErrors = true
	}

	return hasErrors && errors
}
@reduxForm({
	form: 'addTransactionForm',
	fields,
	validate,
	touchOnBlur: false
})
@bindForm({
	onSubmit: (values, dispatch, props) => {
		return dispatch(insertTransaction(values))
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
