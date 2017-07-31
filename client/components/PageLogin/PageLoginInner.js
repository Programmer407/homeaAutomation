// libs
import React from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import DocumentTitle from 'react-document-title';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import QueueAnim from 'rc-queue-anim';

// src
import './PageLoginInner.scss';
import { renderTextField } from '../../utils';
import { renderCheckbox } from '../../utils';

const PageLoginInner = (props) => {
  //console.log('props from inner is : ' + JSON.stringify(props))
  const { onSubmit, renderSubmitButton, renderMessage, isLoadingLogin, renderSnackbar, message, errorMessage, renderSnackbarWithMessage } = props;
	console.log('---> message: ', message)
	console.log('---> errorMessage: ', errorMessage)

	return (
    <div className="page-login">
      <div className="main-body">
        <DocumentTitle title="Login - Wisdom"/>
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <div className="body-inner">
              <div className="card bg-white">
                <div className="card-content">
                  <section className="logo text-center">
                    <h1><a href="#/">Wisdom</a></h1>
                    {/* {
                      renderMessage(props.message)
                    } */}
                  </section>
                  <form className="form-horizontal" onSubmit={onSubmit}>
                    <fieldset>
                      <div className="form-group">
                        <Field name="email" label="Email" component={renderTextField} autoComplete="off" />
                      </div>
                      <div className="form-group">
                        <Field name="password" label="Password" type="password" component={renderTextField}
                          autoComplete="off"/>
                      </div>
                    </fieldset>
										<div className="card-action no-border text-right">
                      <If condition={isLoadingLogin}>
                        <CircularProgress size={15} thickness={2} />
                      </If>
											{
												renderSubmitButton({
													label: 'Login',
													labelWhenSubmitting: 'Logging in ...'
												})
											}
										</div>
                  </form>
                </div>
              </div>
              <div className="additional-info back-plate">
                <Link to="/register">Sign Up</Link>
                <span className="divider-h" />
                <Link to="/forgotPassword">Forgot your password?</Link>
              </div>
            </div>
          </div>
        </QueueAnim>
      </div>
				{
					//renderMessage(message)
					
					//renderMessage(message)
				}
			{/* <If condition={message}>
			</If>  */}
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
  )
}

export default PageLoginInner
