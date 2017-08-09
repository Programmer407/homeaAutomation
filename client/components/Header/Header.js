// libs
import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

// src
import HeaderInner from './HeaderInner';
import { getCurrentUser } from '../../utils';

const mapStateToProps = (state, ownProps) => {
	const user = getCurrentUser(state);
	return { user };
}

@connect(mapStateToProps)
export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<HeaderInner
				{...this.props}
				{...this.state}/>
		)
	}
}