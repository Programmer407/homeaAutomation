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
import './PageForgotPasswordInner.scss';
import { renderTextField } from '../../utils'

const PageForgotPasswordInner = props => {
  const { onSubmit, renderSubmitButton, renderMessage } = props;

  return (
    <div className="page-login">
      <div className="main-body">
        <DocumentTitle title="Forgot Password - CrypTax"/>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            
            <div className="body-inner">
              <div className="card bg-white">
                <div className="card-content">
                  <section className="logo text-center">
                    <h1><a href="#/">Forgot Password</a></h1>
                    {
                      renderMessage()
                    }
                  </section>
                  <form>
                    <fieldset>
                      <div className="form-group">
                        <Field name="email" label="Email" component={renderTextField} autoFocus/>
                        <div className="additional-info text-center text-small">
                          Provide the email address that you used to register. We'll send you an email with a link to reset your password.
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="card-action no-border text-right">
                  {
                    renderSubmitButton({
                      label: 'Reset',
                      labelWhenSubmitting: 'Reset'
                    })
                  }
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

export default PageForgotPasswordInner
