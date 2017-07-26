import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

export default class NicknameDialog extends React.Component {
  state = {
    open: false,
		nicknameValue: ''
  };

	constructor(props) {
		super(props);
	}

  handleOpen = (params) => {
		const {id, address, nickname} = params
    this.setState({
			id: id,
			open: true,
			address: address,
			nickname: nickname
		});
  };

  handleClose = () => {
    this.setState({
			open: false,
			nicknameValue: ''
		});
  };

	onTextChange = (event) => {
		this.setState({
			nicknameValue: event.target.value
		})
	}

  render() {
		const actions = [
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={ this.handleClose }
				onClick={ this.props.handleModalOnSubmit.bind(this, {id: this.state.id, nickname: this.state.nicknameValue, oldNickname: this.state.nickname}) }
      />
    ];

    return (
			<Dialog
				title={'Enter nickname for ' + this.state.address}	
				actions={ actions }
				modal={ false }
				open={ this.state.open }
				onRequestClose={ this.handleClose }>

				<TextField 
					hintText={this.state.nickname}
					onChange={ this.onTextChange }
					value={ this.state.nicknameValue }
					fullWidth />
			</Dialog>
    );
  }
}