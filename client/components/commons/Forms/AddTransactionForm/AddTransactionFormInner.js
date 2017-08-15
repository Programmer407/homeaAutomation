// libs
import React from 'react'
import { Field } from 'redux-form'
import { MenuItem, FlatButton } from 'material-ui'

// src
import { renderTextField, renderTextArea, renderSelectField, renderDatePicker } from '../../../../utils'

const AddTransactionFormInner = props => {
	const { renderRaisedSubmitButton, onFormDialogClose } = props

	return (
		<form role="form">
			<div className="form-group">
				<Field name="transactionId" component="input" type="hidden" />
				<Field name="transactionDate" label="Date" component={ renderDatePicker } fullWidth autoFocus/>
				<Field name="destination" label="Destination" autoComplete="off" component={ renderTextField } fullWidth />
				<div className="row">
					<div className="col-md-6">
						<Field name="amount" label="Amount (+/-)" autoComplete="off" component={ renderTextField } type="number" fullWidth />
					</div>
					<div className="col-md-6">
						<Field name="asset" label="Asset" component={ renderSelectField } fullWidth>
							<MenuItem value={'BTC'} primaryText="BTC" />
							<MenuItem value={'LTC'} primaryText="LTC" />
							<MenuItem value={'ETH'} primaryText="ETH" />
							<MenuItem value={'DOGE'} primaryText="DOGE" />
						</Field>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<Field name="value" label="Total Value" autoComplete="off" component={renderTextField} type="number" fullWidth />
					</div>
					<div className="col-md-6">
						<Field name="transactionTypeId" label="Type" component={ renderSelectField } fullWidth>
							<MenuItem value={1} primaryText="Income" />
							<MenuItem value={2} primaryText="Sale" />
							<MenuItem value={3} primaryText="Purchase" />
							<MenuItem value={4} primaryText="Transfer" />
						</Field>
					</div>
				</div>
				<Field name="note" label="Note" autoComplete="off" component={renderTextArea} fullWidth />
			</div>
			<div className="text-right" style={{ marginTop: 40 }}>
				<FlatButton label="Cancel" onTouchTap={ onFormDialogClose } style={{ marginRight: 8 }} primary/>
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

export default AddTransactionFormInner


