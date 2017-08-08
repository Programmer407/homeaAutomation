// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

// src 
import PageLoginInner from './PageLoginInner'
import PageLoading from '../PageLoading';
import {login, confirmRegistration, resendActivation} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['email', 'password', 'rememberMe']

const validate = values => {
  let errors = {};
  let hasErrors = false;
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }

  if (!values.password || !values.password.trim() === '') {
    errors.password = 'Missing password field';
    hasErrors = true;
  }
  return hasErrors && errors;
}

@reduxForm({
  form: 'loginForm',
  fields,
  validate,
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { email, password, rememberMe } = values

    return dispatch(login(email, password, rememberMe))
    .then(action => {
      const { error, payload } = action
      if ( !error ) {
        const linkNext = get(payload, 'user.linkHome', '/')
        dispatch(push(linkNext))
      }
      return action
    }) 
  }
})
class PageLogin extends React.Component {
	constructor(props) {
    super(props)
		this.state = {
			check : 1,
			isSnackbarOpen: false,
			snackMessage: null,
			autoHideDuration: 4000
		}
	}

  componentDidMount() {
    const { dispatch } = this.props
    
    let token = this.props.match.params.usertoken
    let userId = this.props.match.params.id
    if (token) {
      dispatch(confirmRegistration(token))
      .then(action => {
        const { error, payload } = action
        if ( !error ) {
          this.setState({
            check : 2
          });
        } else {
          this.setState({
            check : 3
          });
        }
      })
    } else if (userId) {
      dispatch(resendActivation(userId))
      .then(action => {
        const { error, payload } = action
        if ( !error ) {
          this.setState({
            check : 2
          });
        } else {
          this.setState({
            check : 3
          });
        }
      })
    } else {
      this.setState({
          check : 2
        });
    }
  }
	
	/* HANDLER FUNCTIONS FOR SNACKBAR, MODALS */
	handleSnackbarOpen = (params) => {
		const { message, duration } = params
		
		this.setState({
			isSnackbarOpen: true,
			snackMessage: message,
			autoHideDuration: duration ? duration : 4000
		})
	}

	handleSnackbarClose = () => {
		this.setState({
			isSnackbarOpen: false, 
			snackMessage: null,
			autoHideDuration: 4000
		})
	}

  render() {
    if (this.state.check == 1) {
      return <PageLoading {...this.props}/>
    } else if(this.state.check == 2) {
				return (
					<PageLoginInner 
						{...this.props}
						onSnackbarOpen={ this.handleSnackbarOpen }
						onSnackbarClose={ this.handleSnackbarClose} />
				)} else {
      return (
				<div>
					<h1>Bad Request!</h1>
					<h3>Activate account token is invalid</h3>
				</div>
			)
    }
  }
}

const mapStateToProps = state => {
  const isLoadingLogin = state.entities.users.isLoading
  if (state.errorMessage) {
    const {errorMessage: {message}} = state
    return {message, isLoadingLogin}
  } else {
    const {auth: {user}} = state
    return {user, isLoadingLogin}
  }
}

export default connect(mapStateToProps)(PageLogin);
