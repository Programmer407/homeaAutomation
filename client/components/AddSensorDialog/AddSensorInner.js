import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { DatePicker, SelectField, RadioButtonGroup, Checkbox,  AutoComplete } from 'material-ui'

const AddSensorInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,isSubmit,handleHomeName,handleFloorName,handlePalaceName,handleSensorType,handleSensorName,sensorName,allHomes,selectedHomeName,selectedFloorName,selectedPalaceName,sensorType} = props;
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
                    <div className="col-sm-6">
                        <SelectField onChange={handleHomeName}
                                     value={selectedHomeName}
                                     floatingLabelText="Home"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && selectedHomeName == "" && "Please Select Home"}
                        >
                            {allHomes.map((home,index)=>{
                                return <MenuItem value={home.home_id} primaryText={home.name} />
                            })}
                        </SelectField>
                    </div>
                    <div className="col-sm-6">
                        <SelectField onChange={handleFloorName}
                                     value={selectedFloorName}
                                     floatingLabelText="Floor"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && selectedFloorName == "" && "Please Select Floor"}
                        >
                            <MenuItem value={1} primaryText="Ground Floor" />
                            <MenuItem value={2} primaryText="First Floor" />
                            <MenuItem value={3} primaryText="Second Floor" />
                            {/* {allHomes.map((home,index)=>{
                             return <MenuItem value={home.home_id} primaryText={home.name} />
                             })}*/}
                        </SelectField>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <SelectField onChange={handlePalaceName}
                                     value={selectedPalaceName}
                                     floatingLabelText="Palace"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && selectedPalaceName == "" && "Please Select Palace"}
                        >
                            <MenuItem value={1} primaryText="Room" />
                            <MenuItem value={2} primaryText="Hall" />
                            <MenuItem value={3} primaryText="Garden" />
                            {/* {allHomes.map((home,index)=>{
                             return <MenuItem value={home.home_id} primaryText={home.name} />
                             })}*/}
                        </SelectField>
                    </div>
                    {/*<div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Sensor Type</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleSensorType} >
                            <MenuItem value={1} primaryText="Room" />
                            <MenuItem value={2} primaryText="Hall" />
                            <MenuItem value={3} primaryText="Garden" />
                        </DropDownMenu>
                    </div>*/}
                    <div className="col-sm-6">
                        <SelectField onChange={handleSensorType}
                                     value={sensorType}
                                     floatingLabelText="Sensor Type"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && sensorType == "" && "Please Select Sensor Type"}
                        >
                            <MenuItem value={1} primaryText="Temperature" />
                            <MenuItem value={2} primaryText="Ligjt" />
                            {/* {allHomes.map((home,index)=>{
                             return <MenuItem value={home.home_id} primaryText={home.name} />
                             })}*/}
                        </SelectField>
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