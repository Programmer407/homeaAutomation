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

const AddApplianceNewInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,isSubmit,handleHomeName,handleFloorName,handlePalaceName,handleApplianceType,handleApplianceName,applianceName,allHomes,selectedHomeName,selectedFloorName,selectedPalaceName,applianceType} = props;
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
                    <div className="col-sm-6">
                        <SelectField onChange={handleApplianceType}
                                     value={applianceType}
                                     floatingLabelText="Appliance Type"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && applianceType == "" && "Please Select Appliance Type"}
                        >
                            <MenuItem value={1} primaryText="Light" />
                            <MenuItem value={2} primaryText="Fan" />
                            {/* {allHomes.map((home,index)=>{
                             return <MenuItem value={home.home_id} primaryText={home.name} />
                             })}*/}
                        </SelectField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <TextField
                            id="applianceName"
                            floatingLabelText="Apliance Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={handleApplianceName}
                            value = {applianceName}
                            errorText={isSubmit && applianceName == "" && "Please add appliance name"}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddApplianceNewInner