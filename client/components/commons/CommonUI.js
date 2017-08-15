// libs
import React from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Checkbox, RaisedButton, RadioButton, RadioButtonGroup, IconButton, RefreshIndicator } from 'material-ui'

// src
import { AddTransactionForm, NicknameForm } from './Forms'

// assets
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { cyan200, cyan500 } from 'material-ui/styles/colors'

export const FormDialog = (props) => {
	const { title, open } = props

	return (
		<Dialog
			title={ title }
			modal={false}
			open={ open }
			autoScrollBodyContent>
				<AddTransactionForm {...props} />
		</Dialog>
	)
}

export const InfoDialog = (props) => {
	const { title, actions, open, onDialogClose } = props

	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent>
				<HelpText />
		</Dialog>
	)
}

export const NicknameDialog = props => {
	const { isNicknameDialogOpen, onNicknameDialogClose, address } = props
	return (
		<Dialog
			title={ title( 'Enter nickname for ', address ) }	
			modal={ false }
			open={ isNicknameDialogOpen }
			onRequestClose={ onNicknameDialogClose }>
				<NicknameForm {...props}/> 
		</Dialog>
	)
}

export const UploadDialog = (props) => {
	const { title, actions, open, onDialogClose } = props

	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent>
				<div>
					<p>Read about supported formats <Link to="#">here</Link>.</p>
					<label className="custom-file">
						<input type="file" id="file" className="custom-file-input" />
						<span className="custom-file-control"></span>
					</label>
				</div>			
		</Dialog>
	)
}

export const ActionTypeDialog = (props) => {
	const { title, actions, open, onDialogClose } = props

	return (
		<Dialog
			title={ title }
			actions={ actions }
			modal={false}
			open={ open }
			onRequestClose={ onDialogClose }
			autoScrollBodyContent>
				<div>
					<RadioButtonGroup name="actionType" defaultSelected="not_light">
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="DONATION"
							label="Donation" />
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="GIFT_RECEIVED"
							label="Gift Received" />
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="GIFT_SENT"
							label="Gift Sent" />
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="INCOME"
							label="Income" />
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="PURCHASE"
							label="Purchase" />
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="SALE"
							label="Sale" />
						<RadioButton
							labelStyle={{  fontWeight: 400 }}
							value="TRANSFER"
							label="Transfer" />
					</RadioButtonGroup>
					<br/>
					<RaisedButton label="Submit" primary/>
				</div>
		</Dialog>
	)
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

export const Operations = props => {
	const { id, type, onDeleteClick, onEditClick, isDeletingTrxListItem, isUpdatingTrxListItem, trxId } = props

	return (
		<span>
			<IconButton 
				className="actionIcon"
				disabled={ isUpdatingTrxListItem }
				onClick={ () => onEditClick({ id }) }>
					{ (isUpdatingTrxListItem && trxId === id) ? <RefreshIndicator status="loading" top={12} left={12} size={25}/> : <EditorModeEdit color={cyan200} hoverColor={cyan500}/> }
			</IconButton>

			<IconButton 
				className="actionIcon"
				disabled={ isDeletingTrxListItem }
				onClick={ () => onDeleteClick({ id, type }) }>
				{ (isDeletingTrxListItem && trxId === id) ? <RefreshIndicator status="loading" top={12} left={12} size={25}/> : <ActionDelete color={cyan200} hoverColor={cyan500}/> }
			</IconButton>
		</span>
	)
}


const title = (text, boldText) => {
	return (
		<p>{ text } <b style={{ fontWeight: '500' }}>{ boldText }</b></p>
	)
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
