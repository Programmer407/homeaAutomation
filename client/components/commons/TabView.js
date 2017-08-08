// libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

// src
import TabViewInner from './TabViewInner'

class TabView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tabIndex: 0
		}
	}

	handleTabChange = (tabIndex) => {
		this.setState({ tabIndex })
	}

	handleTabActive = (tab) => {
		_.extend(tab.props, {style: {color: '#000'}})
		console.log('---> tab:', tab.props)
	}

	render() {
		return (
			<TabViewInner 
				{...this.props}
				{...this.state}
				onTabChange={ this.handleTabChange }
				onTabActive={ this.handleTabActive }/>
		)
	}
}

export default TabView