// libs
import React from 'react'
import { Field } from 'redux-form'

// src
import { renderTextField } from '../../../../utils'

const NicknameFormInner = props => {
	const { renderRaisedSubmitButton, onSubmit, oldNickname, onHandleNoSpaces } = props

	return (
		<form onSubmit={ onSubmit  }>
			<Field component="input" name="addressId" type="hidden" />
			<Field component="input" name="oldNickname" type="hidden" />
			<Field component="input" name="nicknameType" type="hidden" />
			<Field name="newNickname" hintText={ oldNickname } label="Nickname" component={ renderTextField } autoComplete="off" autoFocus onChange={onHandleNoSpaces.bind(this)} />
			<div className="text-right" style={{ marginTop: '10px' }}>
				{
					renderRaisedSubmitButton({
						label: 'Submit',
						labelWhenSubmitting: 'Submitting'
					})
				}
			</div>
		</form>
	)
}

export default NicknameFormInner
