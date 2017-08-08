// libs
import React from 'react';
import Dialog from 'material-ui/Dialog';

// src
import { NicknameForm } from './Forms'

const NicknameDialog = props => {
	const { isNickDialogOpen, onNicknameDialogClose, address } = props
	return (
		<Dialog
			title={ title( 'Enter nickname for ', address ) }	
			modal={ false }
			open={ isNickDialogOpen }
			onRequestClose={ onNicknameDialogClose }>
				<NicknameForm {...props}/> 
		</Dialog>
	);
}

const title = (text, boldText) => {
	return (
		<p>{ text } <b style={{ fontWeight: '500' }}>{ boldText }</b></p>
	);
}

export default NicknameDialog