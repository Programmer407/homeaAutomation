// libs
import React from 'react'
import { Field } from 'redux-form'

// src
import { renderTextArea } from '../../../../utils'

const NewAddressFormInner = props => {
	const { onSubmit, renderRaisedSubmitButton, renderMessage } = props

	return (
		<div className="box box-default">
			<div className="box-header box-header-primary">Add Addresses</div>
			<div className="box-body">
				<p>Enter one address per line. Other addresses that are yours based on Wisdom's analysis of the blockchain will be automatically added for you.</p>
				{
					renderMessage(props.message)
				}
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
			</div>
		</div>
	)
}

export default NewAddressFormInner