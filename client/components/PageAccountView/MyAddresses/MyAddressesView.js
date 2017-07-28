import React, {PropTypes} from "react"
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import ActionCached from 'material-ui/svg-icons/action/cached'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import NicknameDialog from '../commons/DialogModalView'
import MyAddressesViewInner from './MyAddressesViewInner'
import { reduxForm } from 'redux-form'

class MyAddresses extends React.Component {
	constructor(props) {
		super(props)
	}

	triggerDialogModal = (params) => {
		this.refs.dialog.handleOpen(params);
	}


	render() {
		return(
			<div>
				<NicknameDialog ref="dialog" handleModalOnSubmit={this.props.handleModalOnSubmit}/>								
				<MyAddressesViewInner 
					{...this.props}
					triggerDialogModal={this.triggerDialogModal}/>
			</div>
		)
	}
}

export default MyAddresses;