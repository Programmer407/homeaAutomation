import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import moment from 'moment'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const AddHomeInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,handleHomeName,handleHomeDesc,homeName, homeDesc,isSubmit,handleAccountID} = props;
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


                <div className="row">
                    <div className="col-sm-8">
                        <TextField
                            id="homeName"
                            floatingLabelText="Home Name"
                            floatingLabelFixed
                            fullWidth
                            onChange={handleHomeName}
                            value = {homeName}
                            errorText={isSubmit && homeName == "" && "Please add Home Name"}
                        />
                    </div>
                    <div className="col-lg-2">
                        <Subheader style={{marginTop : 17,paddingLeft : 0}}>Account ID</Subheader>
                        <Divider />
                    </div>
                    <div className="col-sm-2">
                        <DropDownMenu value={1}  style={{marginTop : 15}} onChange={handleAccountID} >
                                        <MenuItem value={1} primaryText="1" />
                            <MenuItem value={2} primaryText="2" />
                            <MenuItem value={3} primaryText="3" />
                            <MenuItem value={4} primaryText="4" />
                        </DropDownMenu>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <TextField
                            id="homeDesc"
                            floatingLabelText="Description"
                            floatingLabelFixed
                            fullWidth
                            onChange={handleHomeDesc}
                            value = { homeDesc}
                            errorText={isSubmit && homeDesc == "" && "Please add Home Description"}
                        />
                    </div>
                </div>


            </Dialog>
        </div>
    )
}

export default AddHomeInner