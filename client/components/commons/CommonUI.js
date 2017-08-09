// libs
import React from 'react'
import { Dialog } from 'material-ui'
import { Checkbox } from 'material-ui'

// src
import { AddTransactionForm, NicknameForm } from './Forms'

export const FormDialog = (props) => {
	const { title, actions, open, onDialogClose } = props;

	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent={ true }>
				<AddTransactionForm {...props} />
		</Dialog>
	);
}

export const InfoDialog = (props) => {
	const { title, actions, open, onDialogClose } = props;

	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent={ true }>
				<HelpText />
		</Dialog>
	);
}

const NicknameDialog = props => {
	const { isNickDialogOpen, onNicknameDialogClose, address } = props
	return (
		<Dialog
			title={ title( 'Enter nickname for ', address ) }	
			modal={ false }
			open={ isNickDialogOpen }
			onRequestClose={ onNicknameDialogClose }>
				<NicknameForm {...props}/> 
		</Dialog>
	);
}

export const Selection = props => {
	const { onCheckboxClick, onHeadCheckboxClick, index, type, selectedRows, allSelected } = props

	if (type === 'ROW') {
		return (
			<Checkbox 
				onClick={ onCheckboxClick.bind(this, index) }
				checked={ _.includes(selectedRows, index) ? true : false }/>
		)
	} else if (type === "HEADER") {
		return (
			<Checkbox 
				onClick={ onHeadCheckboxClick.bind(this) }
				checked={ allSelected }/>
		)
	}
}

const title = (text, boldText) => {
	return (
		<p>{ text } <b style={{ fontWeight: '500' }}>{ boldText }</b></p>
	);
}


/* STATICS */
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
