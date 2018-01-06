import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const AddSensorInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,isSubmit,handleHomeName,handleFloorName,handlePalaceName,handleSensorType,handleSensorName,sensorName} = props;
    const AddSensorActions = [
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
                title="Add Sensor"
                actions={AddSensorActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >

                <div className="row">
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 17,paddingLeft : 0}}>Home Name</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleHomeName} >
                            <MenuItem value={1} primaryText="Kamran Home" />
                            <MenuItem value={2} primaryText="Irfan Home" />
                            <MenuItem value={3} primaryText="My New Home" />
                            <MenuItem value={4} primaryText="My Another Home" />
                        </DropDownMenu>
                    </div>
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Floor Name</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleFloorName} >
                            <MenuItem value={1} primaryText="Ground Floor" />
                            <MenuItem value={2} primaryText="First Floor" />
                            <MenuItem value={3} primaryText="Second Floor" />
                        </DropDownMenu>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Palace Name</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handlePalaceName} >
                            <MenuItem value={1} primaryText="Room" />
                            <MenuItem value={2} primaryText="Hall" />
                            <MenuItem value={3} primaryText="Garden" />
                        </DropDownMenu>
                    </div>
                    <div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Sensor Type</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleSensorType} >
                            <MenuItem value={1} primaryText="Room" />
                            <MenuItem value={2} primaryText="Hall" />
                            <MenuItem value={3} primaryText="Garden" />
                        </DropDownMenu>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <TextField
                            id="sensorName"
                            floatingLabelText="Sensor Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={handleSensorName}
                            value = {sensorName}
                            errorText={isSubmit && sensorName == "" && "Please add sensor name"}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddSensorInner