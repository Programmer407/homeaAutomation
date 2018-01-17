// libs
import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import DocumentTitle from 'react-document-title';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import UserManagement from 'material-ui/svg-icons/action/account-circle';
import HomeManagement from 'material-ui/svg-icons/action/home';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import AddIcon from 'material-ui/svg-icons/content/add'

// src
import './PageAdminDashboardInner.scss';
import { renderTextField } from '../../utils'

const PageAdminDashboardInner = props => {
  const { onSubmit, renderSubmitButton, renderMessage, onHandleNoSpaces } = props;

  return (
    <div className="page-login">
      <div className="main-body main-body-primary">
        <DocumentTitle title="Register - IOT"/>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            
            <div className="body-inner">
              <div className="card bg-white">
                <div className="card-content">
                  <section className="logo text-center">
                    <h1><a href="#">Wellcome Admin</a></h1>
                    {
                      renderMessage()
                    }
                  </section>



                  <form className="form-horizontal">
                    <fieldset>

                      <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                          <Link to="/manageAccount" className="color-gray-light">
                            <FlatButton
                                label="Account Management"
                                primary={true}
                                icon={<UserManagement />}
                                fullWidth={true}
                                style={{textAlign : 'left'}}
                            />
                          </Link>
                        </div>
                        <div className="col-lg-2">

                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                          <Link to="/manageUser" className="color-gray-light">
                          <FlatButton
                              label="User Managenet"
                              primary={true}
                              icon={<UserManagement />}
                              fullWidth={true}
                              style={{textAlign : 'left'}}
                          />
                          </Link>
                        </div>
                        <div className="col-lg-2">

                        </div>
                      </div>


                      <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                          <Link to="/manageHome" className="color-gray-light">
                            <FlatButton
                                label="Home Management"
                                primary={true}
                                icon={<HomeManagement />}
                                fullWidth={true}
                                style={{textAlign : 'left'}}
                            />
                          </Link>
                        </div>
                        <div className="col-lg-2">

                        </div>
                      </div>


                      <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                          <Link to="/manageFloor" className="color-gray-light">
                            <FlatButton
                                label="Floor Management"
                                primary={true}
                                icon={<UserManagement />}
                                fullWidth={true}
                                style={{textAlign : 'left'}}
                            />
                          </Link>
                        </div>
                        <div className="col-lg-2">

                        </div>
                      </div>


                      <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                          <Link to="/managePalace" className="color-gray-light">
                            <FlatButton
                                label="Palace Management"
                                primary={true}
                                icon={<UserManagement />}
                                fullWidth={true}
                                style={{textAlign : 'left'}}
                            />
                          </Link>
                        </div>
                        <div className="col-lg-2">

                        </div>
                      </div>



                      <div className="row">
                        <div className="col-lg-2">

                        </div>
                        <div className="col-lg-8">
                          <Link to="/manageAppliance" className="color-gray-light">
                            <FlatButton
                                label="Appliances Management"
                                primary={true}
                                icon={<UserManagement />}
                                fullWidth={true}
                                style={{textAlign : 'left'}}
                            />
                          </Link>
                        </div>
                        <div className="col-lg-2">

                        </div>
                      </div>


                      <div className="divider" />
                    </fieldset>
									{/*	<div className="card-action no-border text-right">

											{
												renderSubmitButton({
													label: 'Logout',
													labelWhenSubmitting: 'Logout'
												})
											}
										</div>*/}
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

export default PageAdminDashboardInner