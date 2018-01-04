import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const AddApplianceInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,handleApplianceName,applianceName} = props;
    const AddApplianceActions = [
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
                title="Add Appliance"
                actions={AddApplianceActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >
                Please Add Your Appliance
                <TextField
                    id="applainceName"
                    floatingLabelText="Add Appliance"
                    floatingLabelFixed
                    onChange={handleApplianceName}
                    value = {applianceName}
                    fullWidth
                />
            </Dialog>
        </div>
    )
}

export default AddApplianceInner