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

const AddHomeInner = (props) =>{
    const {handleCloseDialog,handleCancelDialog,open,handleHomeName,handleHomeDesc,homeName,accountIdSelected, homeDesc,isSubmit,handleAccountID,allAccount} = props;
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
                    <div className="col-sm-9">
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

                    <div className="col-sm-3">
                        <SelectField onChange={handleAccountID}
                                     value={accountIdSelected}
                                     floatingLabelText="Account ID"
                                     floatingLabelFixed
                                     fullWidth
                                     errorText={isSubmit && accountIdSelected == "" && "Please Select Account ID"}
                        >
                            {allAccount.map((account,index)=>{
                               return <MenuItem value={account.account_id} primaryText={account.account_id} />
                            })}
                        </SelectField>
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