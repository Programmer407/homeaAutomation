// libs
import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import DocumentTitle from 'react-document-title';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

// src
import './PageRegisterInner.scss';
import { renderTextField,renderSelectField } from '../../utils'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const PageRegisterInner = props => {
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
                    <h1><a href="#/">Add User</a></h1>
                    {
                      renderMessage()
                    }
                  </section>

                  <form className="form-horizontal">
                    <fieldset>
                   {/*   <div className="form-group">
                       <div className="row">
                         <div className="col-sm-6">
                           <Subheader style={{marginTop : 16,paddingLeft : 0}}>Account ID</Subheader>
                         /!*  <Divider />*!/
                         </div>
                         <div className="col-sm-6">
                           <DropDownMenu value={1}  style={{marginTop : 15}}  >
                             <MenuItem value={1} primaryText="1" />
                             <MenuItem value={2} primaryText="2" />
                             <MenuItem value={3} primaryText="3" />
                           </DropDownMenu>
                         </div>
                       </div>
                      </div>*/}
                      <div className="form-group">
                        <Field name="accountId" label="Account ID" component={renderSelectField} fullWidth>
                          <MenuItem value={1} primaryText="1" />
                          <MenuItem value={2} primaryText="2" />
                          <MenuItem value={3} primaryText="3" />
                        </Field>
                      </div>
                      <div className="form-group">
                        <Field name="firstName" label="First Name" autoComplete="off" component={renderTextField} onChange={onHandleNoSpaces.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Field name="lastName" label="Last Name" autoComplete="off" component={renderTextField} onChange={onHandleNoSpaces.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Field name="email" label="Email" autoComplete="off" component={renderTextField} onChange={onHandleNoSpaces.bind(this)} />
                      </div>
                      <div className="form-group">
                        <Field name="password" label="Password" type="password" autoComplete="off" component={renderTextField} />
                      </div>
                      <div className="form-group">
                        <Field name="confirmPassword" label="Confirm Password" type="password" autoComplete="off" component={renderTextField} />
                      </div>
                      <div className="divider" />
                      <div className="form-group">
                      </div>
                    </fieldset>
										<div className="card-action no-border text-right">
											{
												renderSubmitButton({
													label: 'Sign Up',
													labelWhenSubmitting: 'Sign Up'
												})
											}
                                          <Link to="/manageUser" className="color-gray-light">Cancel</Link>
										</div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </QueueAnim>
      </div>
    </div>
/*
    <div className={`${styles.root} row`}>
      <div className="col-lg-6 col-lg-offset-3">
        <DocumentTitle title="Login - Sauron"/>
        <Paper>
          <form className={styles.root} onSubmit={onSubmit}>
            <h2 className="dialog-heading" style={{textAlign: 'center'}}>Sign in</h2>
            {
              renderMessage()
            }
            <Field name="email" label="Email" component={renderTextField} autoFocus/>
            <Field name="password" label="Password" component={renderTextField} type="password"/>
            <div className={styles.btnSubmitContainer}>
              {
                  renderSubmitButton({
                      label: 'Login',
                      labelWhenSubmitting: 'Logging in ...'
                  })
              }
            </div>
            <div className={styles.instructionsContainer}>
            </div>
            <input type="submit" style={{display: 'none'}}/>
          </form>
        </Paper>
      </div>
    </div>
    */
  );
}

export default PageRegisterInner
