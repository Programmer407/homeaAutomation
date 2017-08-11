// libs
import React from 'react'
import { Field } from 'redux-form'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { cyan200, cyan500 } from 'material-ui/styles/colors';
import { IconButton } from 'material-ui'

// src
import { renderTextArea } from '../../../../utils'

const NewAddressFormInner = props => {
	const { onSubmit, renderRaisedSubmitButton, renderMessage } = props

	return (
		<div className="box box-default">
			<div className="box-header box-header-primary">Add Addresses</div>
			<div className="box-body">
				<p>Other addresses that are yours based on Wisdom's analysis of the blockchain will be automatically added for you.</p>
				{
					renderMessage(props.message)
				}
				<form role="form" onSubmit={ onSubmit }>
					<div className="row">
						<div className="col-xs-10" style={{ paddingRight: 0 }}>
							<Field name="newAddresses" label="Enter your addresses" rows={1} rowsMax={10} component={ renderTextArea } multiLine></Field>
						</div>
						<div className="col-xs-2" style={{ alignSelf: 'center', bottom: -15, padding: 0 }}>
							<IconButton className="actionIcon" tooltip="To specify multiple addresses, click Enter after each address" tooltipPosition="top-left" tooltipStyles={{fontSize: 13}}>
								<ActionInfo color={cyan200} hoverColor={cyan500} />
							</IconButton>
						</div>
					</div>
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