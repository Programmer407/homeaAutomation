// libs
import React, { Component } from 'react'
import { reduxForm, change as changeFieldValue } from 'redux-form'

// src
import { bindForm } from '../../../../utils'
import { addUserAddresses } from '../../../../actions/entities/accounts'
import NewAddressFormInner from './NewAddressFormInner'

const fields = [ 'newAddresses' ]
const initialValues = { newAddresses: '' }

const validate = values => {
	let errors = {}
	let hasErrors = false
	const { newAddresses } = values
	
	if ( !_.isNil(newAddresses) ) {
		const newAddressesArr = _.split(newAddresses, '\n')
		const uniqAddressesArr = _.uniq(newAddressesArr)
		
		if ( !newAddresses || !newAddresses.trim() === '' ) {
			errors.newAddresses = 'Provide at least one address.'
			hasErrors = true
		}

		if ( newAddressesArr.length != uniqAddressesArr.length ) {
			errors.newAddresses = 'Provide distinct addresses.'
			hasErrors = true
		}

		newAddressesArr.map( newAddress => {
			if (newAddress.length > 40) {
				errors.newAddresses = 'No address is that large. Try again?'
				hasErrors = true
			}
		})
	}

	return hasErrors && errors
}

@reduxForm({
	form: 'newAddressForm',
	fields,
	validate,
	initialValues,
	touchOnBlur: false
})
@bindForm({
	onSubmit: (values, dispatch, props) => {
		const { newAddresses } = values

		if ( !_.isNil(newAddresses) ) {
			const newAddressesArr = _.split(values.newAddresses, '\n')

			return dispatch(addUserAddresses(newAddressesArr))
				.then(action => {
					dispatch(props.reset('newAddressForm'))
					dispatch(props.untouch('newAddressForm', ...fields))
					return action
				})
		}
	}
})
class NewAddressForm extends Component {
	constructor(props) {
		super(props)
	}

	handleNoSpaces = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    if (fieldValue === ' ') {
      this.props.dispatch(changeFieldValue('newAddressForm', fieldName, ''))
      e.preventDefault()
    }
  }

	render() {
		return <NewAddressFormInner {...this.props} onHandleNoSpaces={ this.handleNoSpaces } />
	}
}

export default NewAddressForm
