// libs
import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { hasPropChanged } from '../../utils'

const THRESHOLD = 1 * 60 * 1000;

export default class MySnackbar extends React.Component {
	static propTypes = {
		remaining: React.PropTypes.number, 
		elapsed: React.PropTypes.number, 
		isIdle: React.PropTypes.bool
	}
	
	constructor(props) {
		super(props);
		this.state = {
			openCount: 0,
			snackbarOpen: false
		};
		
	}
	
	componentWillReceiveProps(nextProps) {
		if ( hasPropChanged('isIdle', this.props, nextProps) ) {
			const { isIdle } = nextProps
			
			if ( isIdle ) {
				this.handleIdleStarted()
			} else {
				this.handleIdleEnded()
			}
		}
	}
	
	handleIdleStarted = () => {
		const { openCount, snackbarOpen } = this.state
		
		if ( openCount < 1 && !snackbarOpen ) {
			this.setState({
				openCount: openCount + 1,
				message: "You'll be logged out in some time if no activity is detected.",
				snackbarOpen: true
			})
		}
	}
	
	handleIdleEnded = () => {
		this.setState({
			openCount: 0,
			snackbarOpen: false
		})
	}
	
	handleRequestClose = (e) => {
		this.setState({
			snackbarOpen: false
		})
		console.log('Event: ', e)
	};
	
	render() {
		return (
			<Snackbar
			
			open={this.state.snackbarOpen}
			message={this.state.message}
			autoHideDuration={5000}
			onRequestClose={this.handleRequestClose}
			/>
		)
	}
}
