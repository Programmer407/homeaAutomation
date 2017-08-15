// libs
import React, { Component } from 'react'
import { reduxForm, change as changeFieldValue } from 'redux-form'

// src
import { bindForm } from '../../../../utils'
import { updateUserAddress, updateAssociatedMyAdd, updateAssociatedWalletAdd } from "../../../../actions/entities/accounts"
import NicknameFormInner from './NicknameFormInner'

const fields = [ 'newNickname', 'addressId', 'oldNickname', 'nicknameType' ]
const initialValues = { newNickname: '' }
const NICK_EDIT_TYPES = {
	ADDRESS_NICK: 'ADDRESS_NICK',
	ASSOC_ADDRESS_NICK: 'ASSOC_ADDRESS_NICK',
	WALLET_ASSOC_ADDRESS_NICK: 'WALLET_ASSOC_ADDRESS_NICK'
}

const validate = values => {
	let errors = {}
	let hasErrors = false
	const { newNickname, oldNickname } = values
	
	if ( !_.isNil(newNickname) ) {
		if ( !newNickname || !newNickname.trim() === '' ) {
			errors.newNickname = 'Provide a nickname.'
			hasErrors = true
		}
		
		if ( newNickname.length > 40 ) {
			errors.newNickname = 'Keep it under 25 characters.'
			hasErrors = true
		}

		if ( newNickname === oldNickname ) {
			errors.newNickname = 'Think different. This is the same nickname as before.'
			hasErrors = true
		}
	}
	
	return hasErrors && errors
}

@reduxForm({
	form: 'nicknameForm',
	fields,
	validate,
	initialValues,
	touchOnBlur: false
})
@bindForm({
	onSubmit: (values, dispatch, props) => {
		const { addressId, newNickname, nicknameType } = values

		if ( !_.isNil(newNickname) ) {
			switch (nicknameType) {
				case NICK_EDIT_TYPES.ADDRESS_NICK:
					return dispatch(updateUserAddress(addressId, newNickname))
					break
				
					case NICK_EDIT_TYPES.ASSOC_ADDRESS_NICK:
					return dispatch(updateAssociatedMyAdd(addressId, newNickname))
					break
				
					case NICK_EDIT_TYPES.WALLET_ASSOC_ADDRESS_NICK:
					return dispatch(updateAssociatedWalletAdd(addressId, newNickname))
					break
			
				default:
					break
			}
		}
	}
})
class NicknameForm extends Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
		this.changeFields(nextProps)
		return true
	}

	changeFields = (props) => {
		const { change, addressId, oldNickname, nicknameType } = props

		change('addressId', addressId)
		change('oldNickname', oldNickname)
		change('nicknameType', nicknameType)
	}

	handleNoSpaces = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    if (fieldValue === ' ') {
      this.props.dispatch(changeFieldValue('registerForm', fieldName, ''))
      e.preventDefault()
    }
  }

	render() {
		return <NicknameFormInner {...this.props} onHandleNoSpaces={ this.handleNoSpaces } />
	}
}

export default NicknameForm
