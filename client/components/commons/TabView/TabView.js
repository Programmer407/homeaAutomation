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

// src
import styles from './TabViewInner.scss'
import { TradingView, IncomeView } from '../'

const cyan500 = 'rgba(0,188,212,0.8)';

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
	transition: '1s'
}

const Operations = (props) => {
  return (
		<span>
			<FlatButton label="Delete" labelPosition="after" icon={<ActionDelete />} hoverColor={'rgba(0,188,212,0.1)'} primary />
		</span>
  );
}

const TabViewInner = (props) => {
  const { tabIndex, onTabChange, onFormDialogToggle, tblData, rowSelected } = props;
  const tabLbls = [ 'Trading', 'Income', 'Spending' ]
  
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
							<Tab buttonStyle={ (tabIndex === index) ? activeBtnStyle : btnStyle } value={ index } label={ lbl } />
            )
          }
				</Tabs>
				<RaisedButton className="actionBtn" label="Add Transaction" onClick={ onFormDialogToggle } primary/>
				<span className={ rowSelected ? 'selectiveActionBtn' : 'hide' }>{ <Operations /> }</span>
			</div>
			
			<div className="box box-default">
				<div className="box-body">
					<SwipeableViews
						index={ tabIndex }
						onChangeIndex={ onTabChange }>
						<div className="slide">
							<TradingView {...props} />
						</div >
						<div className="slide">
							<IncomeView {...props} />
						</div>
						<div className="slide">
							3. Swipe to see the next slide.
						</div>
					</SwipeableViews>
				</div>
			</div>
		</div>
  );
}

export default TabViewInner