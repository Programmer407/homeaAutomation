// libs
import React from 'react'
import { Field } from 'redux-form'

// src
import { renderTextArea } from '../../../../utils'

const NewAddressFormInner = props => {
	const { onSubmit, renderRaisedSubmitButton } = props

	return (
		<form role="form" onSubmit={ onSubmit }>
			<Field name="newAddresses" label="Enter one address per line" rows={1} rowsMax={10} component={ renderTextArea } fullWidth multiLine></Field>
			<div className="btn-space">
				{
					renderRaisedSubmitButton({
						label: 'Submit',
						labelWhenSubmitting: 'Validating'
					})
				}
			</div>
		</form>
	)
}

export default NewAddressFormInner