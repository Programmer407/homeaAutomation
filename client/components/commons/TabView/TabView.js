// libs
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { FlatButton, RaisedButton, Tab, Tabs, SelectField, MenuItem } from 'material-ui'

// src
import './TabView.scss'
import { TradingView, IncomeView, SpendingView } from '../'

const tabContainerStyles = {
  maxWidth: '500px',
  float: 'left',
  height: '52px'
}

const inkBarStyles = {
  backgroundColor: '#0097A7',
  height: '3px',
  bottom: '52px',
  zIndex: '1'
}

const btnStyle = {
  textTransform: 'none',
  color: 'rgba(0,96,100,0.45)',
  backgroundColor: '#d2e7ea',
  fontSize: '16px',
  minWidth: 140,
  height: '54px'
}

const activeBtnStyle = {
  textTransform: 'none',
  color: '#0097A7',
  backgroundColor: '#FFF',
  fontSize: 18,
  minWidth: 140,
  height: '54px',
	transition: '0.5s'
}

const trxTypes = [ 'Income', 'Sale', 'Purchase', 'Transfer' ]

const Operations = props => {
	const { selected, onBatchDeleteClick, onBatchTypeClick } = props

  return (
		<span>
			<span className={ selected ? 'selectiveActionBtn' : 'hide' }>
				<FlatButton label="Delete" labelPosition="after" icon={<ActionDelete />} hoverColor={'rgba(0,188,212,0.1)'} onClick={ onBatchDeleteClick } primary />
			</span>
			<span className={ selected ? 'selectiveDropdownMenu' : 'hide' }>
				<SelectField
					selectedMenuItemStyle={{ color: '#00ACC1' }}
					hintText="Transaction Type"
					hintStyle={{ fontWeight: 500, color: '#00BCD4', textAlign: 'center', top: 6, textTransform: 'uppercase', fontSize: 15 }}
					underlineDisabledStyle={{ display: 'none' }}
					underlineFocusStyle={{ display: 'none' }}
					underlineStyle={{ display: 'none' }}>
						{
							trxTypes.map((type, index) => <MenuItem value={ index + 1 } primaryText={ type } onClick={ () => onBatchTypeClick( index + 1 ) }/>)
						}
				</SelectField>
			</span>
		</span>
  )
}

// <FlatButton label="Set Transaction Type" onClick={ onActionTypeDialogToggle } hoverColor={'rgba(0,188,212,0.1)'} primary />

const TabView = (props) => {
  const { tabIndex, onTabChange, onFormDialogOpen, rowSelected } = props
  const tabLbls = [ 'Income', 'Spending', 'Trading' ]
  
  return (
		<div>
			<div className="navSpan">
				<Tabs
					onChange={ onTabChange }
					value={ tabIndex }
					style={ tabContainerStyles }
					inkBarStyle={ inkBarStyles }>
          {
            tabLbls.map( (lbl, index) =>
							<Tab key={ index } buttonStyle={ (tabIndex === index) ? activeBtnStyle : btnStyle } value={ index } label={ lbl } />
            )
          }
				</Tabs>
				<RaisedButton className="actionBtn" label="Add Transaction" onClick={ onFormDialogOpen } primary/>
				<span>{ <Operations  selected={ rowSelected } {...props}/> }</span>
			</div>
			
			<div className="box box-default">
				<div className="box-body">
					<SwipeableViews
						index={ tabIndex }
						onChangeIndex={ onTabChange }>
						<div className="slide">
							<IncomeView {...props} />
						</div>
						<div className="slide">
							<SpendingView {...props} />
						</div>
						<div className="slide">
							<TradingView {...props} />
						</div >
					</SwipeableViews>
				</div>
			</div>
		</div>
  )
}

export default TabView
