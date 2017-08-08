// libs
import React from 'react';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ActionHelp from 'material-ui/svg-icons/action/help';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TradingView } from './TableViews'

// src

const cyan500 = 'rgba(0,188,212,0.8)';

const tabContainerStyles = {
	maxWidth: '500px',
	float: 'left',
	height: '52px'
}

const tabItemContainerStyles = {
	backgroundColor: '#DDD',
	// height: '55px'
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
	fontSize: '18px',
	minWidth: 140,
	height: '54px'
}

const styles = {
	tabContainer: {
		
	},
	
	slide: {
		padding: '20px'
	},
	
	box: {
		boxShadow: 'none'
	},
	
	actionBarBtn: {
		float: 'right',
		margin: '9px',
		color: '#444'
	},
	
	actionBarIcon: {
		float: 'right',
		margin: '9px 5px',
		border: '1px solid #00bcd4',
		borderRadius: '2px'
	},
	
	iconBtn: {
		top: '6px'
	},
	
	navSpan: {
		width: '100%',
		backgroundColor: '#d2e7ea',
		overflow: 'hidden',
		// borderBottom: '1px solid #d2e7ea'
	}
}

const Operations = (props) => {
	return (
		<span>
			<FlatButton label="Delete" labelPosition="after" primary icon={<ActionDelete />} hoverColor={'rgba(0,188,212,0.1)'}/>
		</span>
	);
}

const TabViewInner = (props) => {
	const { tabIndex, onTabChange, onTabActive, onFormDialogToggle, onHelpDialogToggle, tblData } = props;
	const tabLbls = [ 'Trading', 'Income', 'Spending' ]
	const isRowSelected = _.includes( tblData.map( d => _.includes(d, true) ) , true)
	
	return (
		<div>
			<div style={ styles.navSpan }>
				<Tabs
				onChange={ onTabChange }
				value={ tabIndex }
				style={ tabContainerStyles }
				tabItemContainerStyle={ tabItemContainerStyles }
				inkBarStyle={ inkBarStyles }>
				{
					tabLbls.map( (lbl, index) => 
					<Tab buttonStyle={ (tabIndex === index) ? activeBtnStyle : btnStyle } value={ index } label={ lbl } />
				)
			}
			</Tabs> 
			<RaisedButton style={ styles.actionBarBtn } label="Add Transaction" onClick={ onFormDialogToggle } primary/> 
			<span style={ styles.actionBarIcon }>{ isRowSelected ? <Operations /> : '' }</span>
		</div>
		
		
		<div className="box box-default" style={ styles.box }>
			<div className="box-body">
				<SwipeableViews
					index={ tabIndex }
					onChangeIndex={ onTabChange }>
						<div style={ styles.slide }>
							<TradingView {...props}/>
						</div >
						<div style={ styles.slide }>
							2. Swipe to see the next slide.
						</div>
						<div style={ styles.slide }>
							3. Swipe to see the next slide.
						</div>
					</SwipeableViews>
			</div>
		</div>
	</div>
);
}

export default TabViewInner