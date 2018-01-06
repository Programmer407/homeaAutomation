import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const AddPalaceInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open} = props;
    const AddPalaceActions = [
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
                title="Add Palace"
                actions={AddPalaceActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >

                <TextField
                    id="palaceName"
                    floatingLabelText="Add Palace"
                    floatingLabelFixed
                    fullWidth
                />
            </Dialog>
        </div>
    )
}

export default AddPalaceInner