import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const AddHomeInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open} = props;
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
                title="Add Home"
                actions={AddAccountActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >

                <TextField
                    id="homeName"
                    floatingLabelText="Add Home"
                    floatingLabelFixed
                    fullWidth
                />
            </Dialog>
        </div>
    )
}

export default AddHomeInner