import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

const AddAccountInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open, isChecked,handleCheckbox,isSubmit} = props;
    const AddAccountActions = [
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={handleCancelDialog}
        />,
        <FlatButton
            label="Add"
            primary={true}
            onClick={handleCloseDialog}
        />,
    ];
    return(
        <div>
            <Dialog
                title="Add Account"
                actions={AddAccountActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >

                <Checkbox
                    label="Create New Account"
                    checked={isChecked}
                    onCheck={handleCheckbox}
                    errorText={isSubmit && isChecked == false && "Please first Select Checkbox"}
                />
            </Dialog>
        </div>
    )
}

export default AddAccountInner