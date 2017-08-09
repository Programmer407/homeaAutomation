// libs
import React from 'react'
import { Field } from 'redux-form'
import { SelectField, MenuItem, RaisedButton } from 'material-ui'

// src
import { renderTextField, renderTextArea, renderInlineDateField } from '../../../../utils'

const AddTransactionFormInner = () => {
	
	return (
		<form role="form">
			<fieldset>
				<div className="form-group">
					<Field name="date" label="Date" component={ renderInlineDateField } />
					<Field name="destination" label="Destination" component={ renderTextField } fullWidth />
					<div className="row">
						<div className="col-md-6">
							<Field name="amount" label="Amount (+/-)" component={ renderTextField } fullWidth />
						</div>
						<div className="col-md-6">
							<SelectField
								fullWidth
								floatingLabelText="Asset"
								className="primary-select-field">
								<MenuItem value={1} primaryText="BTC" />
								<MenuItem value={2} primaryText="LTC" />
								<MenuItem value={3} primaryText="ETH" />
								<MenuItem value={4} primaryText="DOGE" />
							</SelectField>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<Field name="amount" label="Total Value" component={renderTextField} fullWidth />
						</div>
						<div className="col-md-6">
							<SelectField
								fullWidth
								floatingLabelText="Type"
								className="primary-select-field">
								<MenuItem value={1} primaryText="Donation" />
								<MenuItem value={2} primaryText="Gift Received" />
								<MenuItem value={3} primaryText="Gift Sent" />
								<MenuItem value={4} primaryText="Income" />
								<MenuItem value={5} primaryText="Purchase" />
								<MenuItem value={6} primaryText="Sale" />
								<MenuItem value={7} primaryText="Transfer" />
							</SelectField>
						</div>
					</div>
					<Field name="destination" label="Note" component={renderTextArea} fullWidth />
				</div>
				<RaisedButton type="submit" label="Add" primary />
			</fieldset>
		</form>
	);
}

export default AddTransactionFormInner



