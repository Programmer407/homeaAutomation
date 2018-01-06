import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const AddApplianceInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,handleApplianceName,applianceName,NowData,floorSelected,roomSelected,handleFloorSelected,handleRoomSelected,isSubmit} = props;
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
                      <DropDownMenu value={floorSelected} onChange={handleFloorSelected} >
                          {NowData.floors.map((floor, key) => {
                              return (
                                  <MenuItem value={floor.floor_id} primaryText={floor.name} />
                              );})}
                      </DropDownMenu>
                  </div>
                  <div className="col-sm-6">
                      <DropDownMenu value={roomSelected} onChange={handleRoomSelected} >
                          {NowData.palaces.map((palace, key) => {
                              if(palace.floorFloorId == floorSelected)
                                  return (
                                      <MenuItem value={palace.palace_id} primaryText={palace.name} />
                                  );})}
                      </DropDownMenu>
                  </div>
              </div>
                <TextField
                    id="applainceName"
                    floatingLabelText="Add Appliance"
                    floatingLabelFixed
                    onChange={handleApplianceName}
                    value = {applianceName}
                    errorText={isSubmit && applianceName == "" && "Please add appliance Name"}
                    fullWidth
                />
            </Dialog>
        </div>
    )
}

export default AddApplianceInner