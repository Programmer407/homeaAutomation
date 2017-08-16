// libs
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import ReactDOM from 'react-dom'

// src
import { bindForm } from '../../../../utils'
import { accountconnectUrl } from "../../../../actions/entities/accounts"
import ProviderFormInner from './ProviderFormInner'

const fields = [ 'selectedProvider', 'submitBtn' ]
const initialValues = { selectedProvider: 0 }

const validate = values => {
	let errors = {}
	let hasErrors = false
	const { selectedProvider } = values
	console.log('VALS', values)

	if ( !_.isNil(selectedProvider) ) {
		if ( selectedProvider === 0 ) {
			errors.selectedProvider	= "Select a valid provider from the list."
			hasErrors = true
		}
	}

	return hasErrors && errors
}

@reduxForm({
	form: 'providerForm',
	fields,
	validate,
	initialValues,
	touchOnBlur: false
})
@bindForm({
	onSubmit: (values, dispatch, props) => {
		const { selectedProvider } = values

		if ( !_.isNil(selectedProvider) ) {
			return dispatch(accountconnectUrl( selectedProvider ))
				.then(action => {
					const { error, payload } = action
					if ( !error ) {
						var url = payload.redirecturl
						window.location = url
						return action
					}
				})
		}
	}
})
class ProviderForm extends Component {
	constructor(props) {
		super(props)
	}

	handleOnChangeProvider = (e) => {
		// const { dispatch } = this.props
		// focus('providerForm', 'submitBtn')
		// const btn = document.getElementsByClassName('submitBtn')[0].children[0].children[0].children[0].children[0]
		// btn.focus()
    // const fieldName = e.target.name
    // const fieldValue = e.target.value
		// console.log('fieldName : ' + fieldName + ' AND fieldValue : ' + fieldValue)
		console.log('Event called', this.props)
	}
	
	render() {
		return <ProviderFormInner {...this.props} handleOnChangeProvider={this.handleOnChangeProvider} />
	}
}

export default ProviderForm
