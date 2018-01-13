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

const AddFloorInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,isSubmit,handleHomeId,handleFloorType,handleFloorName, homeId,floorType,floorName,allHomes} = props;
    const AddFloorActions = [
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
                title="Add Floor"
                actions={AddFloorActions}
                modal={false}
                open={open}
                onRequestClose={handleCloseDialog}
            >

                <div className="row">
                    <div className="col-sm-6">
                        <SelectField onChange={handleHomeId}
                                     value={homeId}
                                     floatingLabelText="Home"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && homeId == "" && "Please Select Home"}
                        >
                            {allHomes.map((home,index)=>{
                                return <MenuItem value={home.home_id} primaryText={home.name} />
                            })}
                        </SelectField>
                    </div>
                    <div className="col-sm-6">
                        <SelectField onChange={handleFloorType}
                                     value={floorType}
                                     floatingLabelText="Floor Type"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && floorType == "" && "Please Select Floor Type"}
                        >
                            <MenuItem value={1} primaryText="Ground Floor" />
                            <MenuItem value={2} primaryText="First Floor" />
                            <MenuItem value={3} primaryText="Second Floor" />
                        </SelectField>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <TextField
                            id="floorName"
                            floatingLabelText="Floor Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={handleFloorName}
                            value = { floorName}
                            errorText={isSubmit && floorName == "" && "Please add floor name"}
                        />
                    </div>
                </div>

            </Dialog>
        </div>
    )
}

export default AddFloorInner