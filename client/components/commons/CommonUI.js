// libs
import React from 'react';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Field } from 'redux-form';
import Checkbox from 'material-ui/Checkbox';

// src
import { renderTextField, renderTextArea, renderInlineDateField } from '../../utils';

export const InfoDialog = (props) => {
	const { title, actions, open, onDialogClose } = props;
	console.log(props)
	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent={ true }
		>
			<HelpText />
		</Dialog>
	);
}

export const FormDialog = (props) => {
	const { title, actions, open, onDialogClose } = props;
	console.log(props)
	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent={ true }
		>
			<TransactionsForm />
		</Dialog>
	);
}

const HelpText = () => {
	return (
		<div>
			<h5>Acquisitions</h5>
			<ul>
				<li><b>Purchase</b> = You bought coins</li>
				<li><b>Income</b> = You received coins as payment (mining, paycheck)</li>
				<li><b>Gift Received</b> = You received coins in exchange for nothing</li>
				<li><b>Transfer</b> = You move coins from one location to another but they remain in your possession</li>
			</ul>
			<h5>Disposals</h5>
			<ul>
				<li><b>Sale</b> = You sold coins -OR- you used coins to buy something</li>
				<li><b>Gift Sent</b> = You gave coins in exchange for nothing</li>
				<li><b>Donation</b> = You gave coins to a qualified organization</li>
				<li><b>Transfer</b> = You move coins from one location to another but they remain in your possession</li>
			</ul>
			<p><b>M</b> next to a value denotes Fair Market Value, a 24 hour average for that date</p>

			<h5>Non-taxable Events</h5>
			<ul>
				<li><b>Purchase</b> = Cost Basis is established at a specific rate or fair market value</li>
				<li><b>Gift Received</b> = Cost Basis is established from previous owner’s original cost basis</li>
				<li><b>Gift Sent</b> = No Capital Gains/Losses are realized (unless amount exceeds $14,000)</li>
				<li><b>Transfer</b> = No effect</li>
			</ul>
			<h5>Taxable Events</h5>
			<ul>
				<li><b>Income</b> = Cost Basis is established at a specific rate or fair market value and that value is added to earned income</li>
				<li><b>Sale</b> = Capital Gains/Losses are realized</li>
				<li><b>Donation</b> = No Gains/Losses are realized - fair market value of coins creates a tax deduction</li>
			</ul>
			
			<p>You can find more helpful information in our <a target="_blank" href="/faq">FAQ</a>.</p>
		</div>
	)
}

const TransactionsForm = () => {
	return (
		<form role="form">
			<fieldset>
				<div className="form-group">
					<Field name="date" label="Date" component={ renderInlineDateField } />
					<Field name="destination" label="Destination" component={renderTextField} fullWidth />
					<div className="row">
						<div className="col-md-6">
							<Field name="amount" label="Amount (+/-)" component={renderTextField} fullWidth />
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
					<Field name="destination" label="Note" component={renderTextField} fullWidth />
				</div>
				<RaisedButton type="submit" label="Add" primary />
			</fieldset>
		</form>
	)
}
