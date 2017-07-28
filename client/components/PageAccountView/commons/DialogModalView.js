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
		const {id, address, oldNickname} = params
    this.setState({
			id: id,
			open: true,
			address: address,
			oldNickname: oldNickname
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

  render() {
		const actions = [
      <FlatButton
        label="Submit"
        primary
        onTouchTap={ this.handleClose }
				onClick={ this.props.handleModalOnSubmit.bind(this, {id: this.state.id, newNickname: this.state.newNickname, oldNickname: this.state.oldNickname}) }
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
					hintText={this.state.oldNickname}
					onChange={ this.onTextChange }
					value={ this.state.newNickname }
					fullWidth
					autoFocus />
			</Dialog>
    );
  }
}