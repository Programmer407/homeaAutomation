import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

export default class NicknameDialog extends React.Component {
  state = {
    open: false,
		newNickname: ''
  };

	constructor(props) {
		super(props);
	}

  handleOpen = (params) => {
		const {id, address, oldNickname, type} = params
    this.setState({
			id,
			open: true,
			address,
			oldNickname,
			type
		});
  };

  handleClose = () => {
    this.setState({
			open: false,
			newNickname: ''
		});
  };

	onTextChange = (event) => {
		this.setState({
			newNickname: event.target.value
		})
	}

	chooseAction = () => {
		const { type } = this.state

		if (type == 'address') 
			return 0
		else if (type == 'addressAssocs')
			return 1
		else
			return 2
	}

  render() {
		const actions = [
      <FlatButton
        label="Submit"
        primary
        onTouchTap={ this.handleClose }
				onClick={ this.props.handleAddressNicknameChange.bind(this, {
					id: this.state.id, 
					newNickname: this.state.newNickname, 
					oldNickname: this.state.oldNickname
					}
				)}
      />, 
      <FlatButton
        label="Submit"
        primary
        onTouchTap={ this.handleClose }
				onClick={ this.props.handleAssocAddressNicknameChange.bind(this, {
					id: this.state.id, 
					newNickname: this.state.newNickname, 
					oldNickname: this.state.oldNickname
					}
				)}
      />, 
      <FlatButton
        label="Submit"
        primary
        onTouchTap={ this.handleClose }
				onClick={ this.props.handleWalletAssocAddressNicknameChange.bind(this, {
					id: this.state.id,
					newNickname: this.state.newNickname,
					oldNickname: this.state.oldNickname
					}
				)}
      /> 
    ];

    return (
			<Dialog
				title={'Enter nickname for ' + this.state.address}	
				actions={ actions[this.chooseAction()] }
				modal={ false }
				open={ this.state.open }
				onRequestClose={ this.handleClose }>

				<TextField
					hintText={this.state.oldNickname}
					onChange={ this.onTextChange }
					value={ this.state.newNickname }
					fullWidth
					autoFocus />
			</Dialog>
    );
  }
}