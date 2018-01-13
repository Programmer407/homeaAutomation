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

const AddPalaceInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,isSubmit,handleHomeName,handleFloorName,handlePalaceType,handlePalaceName,palaceName,allHomes,selectedHomeName,selectedFloorName,selectedPalaceType} = props;
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
                   {/* <div className="col-sm-2">
                        <Subheader style={{marginTop : 16,paddingLeft : 0}}>Palace Type</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-4">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handlePalaceType} >
                            <MenuItem value={1} primaryText="Room" />
                            <MenuItem value={2} primaryText="Hall" />
                            <MenuItem value={3} primaryText="Garden" />
                        </DropDownMenu>
                    </div>*/}
                    <div className="col-sm-6">
                        <SelectField onChange={handlePalaceType}
                                     value={selectedPalaceType}
                                     floatingLabelText="Palace Type"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && selectedPalaceType == "" && "Please Select Palace Type"}
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
                        <TextField
                            id="floorName"
                            floatingLabelText="Palace Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={handlePalaceName}
                            value = { palaceName}
                            errorText={isSubmit && palaceName == "" && "Please add palace name"}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddPalaceInner