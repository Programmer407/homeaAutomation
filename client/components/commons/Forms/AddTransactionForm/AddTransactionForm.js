// libs
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

// src
import { bindForm } from '../../../../utils'
import AddTransactionFormInner from './AddTransactionFormInner'
import { insertTransaction, updateTransaction, closeFormDialog } from "../../../../actions"

const fields = [ 'transactionDate', 'destination', 'amount', 'asset', 'value', 'transactionTypeId', 'note' ]

const validate = values => {
	const errors = {}
	let hasErrors = false
	const { transactionDate, destination, amount, asset, value, note, transactionTypeId } = values
	
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

	if ( !transactionTypeId ) {
		errors.transactionTypeId = 'Select a valid type from the list.'
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
		if ( !_.isNil(values.transactionId)) {
			return dispatch(updateTransaction(values))
				.then(action => {
					dispatch(closeFormDialog())
					return action
				})
		}
		return dispatch(insertTransaction(values))
			.then(action => {
				dispatch(closeFormDialog())
				return action
			})
	}
})
class AddTransactionForm extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { trxId, modifiedTrxs, change } = this.props

		if ( !_.isNil(trxId)) {
			const currentTrx = _.find(modifiedTrxs, function(trx) { return trx.id === trxId })
			const { transactionDate, destination, amount, asset, value, transactiontype, note } = currentTrx
			change('transactionId', trxId)
			change('note', note)
			change('asset', asset)
			change('value', value)
			change('amount', amount)
			change('destination', destination)
			change('transactionDate', transactionDate)
			change('transactionTypeId', transactiontype.id)
		}
	}

	render() {
		return <AddTransactionFormInner {...this.props} />
	}
}

export default AddTransactionForm
