// libs
import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import DocumentTitle from 'react-document-title';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import AddIcon from 'material-ui/svg-icons/content/add'

// src
import './PageManageApplianceInner.scss';
import { renderTextField } from '../../utils'

import AddPalace from '../AddPalaceDialog/AddPalace'
import AddApplianceNew from '../AddApplianceDialogNew/AddApplianceNew'
import AddSensor from '../AddSensorDialog/AddSensor'
import FlatButton from 'material-ui/FlatButton';

const PageManageApplianceInner = props => {
  const { onSubmit, renderSubmitButton, renderMessage, onHandleNoSpaces, addApplianceDialogOpen,handleAddApplianceDialogClose,handleAddApplianceDialogOpen,handleAddSensoDialogClose,handleAddSensorDialogOpen,addSensorDialogOpen} = props;

  return (
    <div className="page-login">
      <div className="main-body main-body-primary">
        <DocumentTitle title="Manage Account - IOT"/>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            
            <div className="body-inner">
              <div className="card bg-white">
                <div className="card-content">
                  <section className="logo text-center">
                    <h1><a href="#/">Manage Appliance</a></h1>
                    {
                      renderMessage()
                    }
                  </section>



                  <form className="form-horizontal">
                    <fieldset>

                      <div className="row">
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-6">
                          <FlatButton
                              label="Add Appliance"
                              primary={true}
                              icon={<AddIcon />}
                              fullWidth={true}
                              style={{textAlign : 'left'}}
                              onTouchTap={handleAddApplianceDialogOpen}
                          />
                            < AddApplianceNew
                                open = {addApplianceDialogOpen}
                                handleCancelDialog = {handleAddApplianceDialogClose}
                            />
                        </div>
                        <div className="col-lg-3">

                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-6">
                          <FlatButton
                              label="Add Sensor"
                              primary={true}
                              icon={<AddIcon />}
                              fullWidth={true}
                              style={{textAlign : 'left'}}
                              onTouchTap={handleAddSensorDialogOpen}
                          />
                          < AddSensor
                              open = {addSensorDialogOpen}
                              handleCancelDialog = {handleAddSensoDialogClose}
                          />
                        </div>
                        <div className="col-lg-3">

                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3">

                        </div>
                        <div className="col-lg-6">
                          <Link to="/deleteUser" className="color-gray-light">
                          <FlatButton
                              label="Delete Account"
                              primary={true}
                              icon={<DeleteIcon />}
                              fullWidth={true}
                              style={{textAlign : 'left'}}
                          />
                          </Link>
                        </div>
                        <div className="col-lg-3">

                        </div>
                      </div>





                      <div className="divider" />
                    </fieldset>
										<div className="card-action no-border text-right">

											{
												renderSubmitButton({
													label: 'Logout',
													labelWhenSubmitting: 'Logout'
												})
											}
                                          <Link to="/adminDashboard" className="color-gray-light">Cancel</Link>
										</div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </QueueAnim>
      </div>
    </div>

  );
}

export default PageManageApplianceInner