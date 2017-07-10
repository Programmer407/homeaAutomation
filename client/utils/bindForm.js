/* @flow */

// libs
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import get from 'lodash/get'
import has from 'lodash/has';
import { Link } from 'react-router-dom';
// src
import { ENTITY_STATUS_DATA_AVAILABLE } from './utils'

/**
 * A higher order function that injects some additional params to a form component
 * @param {Object} param0 
 */
export default (options:{onSubmit:Function}) => (WrappedComponent:Object):Object => {
  const { onSubmit } = options
  const getDefaultState = () => ({
    error: false,
    errorMessage: ''
  })

  return class BoundForm extends React.Component {

    handleSubmit: Function;
    
    state = getDefaultState();

    constructor(props) {
      super(props)

      const { handleSubmit } = props
      this.handleSubmit = handleSubmit(this.wrapSubmit( onSubmit ))
    }
    componentDidMount() {
        const hasEntity = has(this.props, 'entity')
        
        if ( hasEntity ) {
            const entity = get(this.props, 'entity')
            const status = get(this.props, 'entity.__status__')

            this.handleChangeEntityStatus(entity, status)
        }
    }
    componentWillReceiveProps(nextProps) {
        const hasEntity = has(this.props, 'entity')
        const status = get(this.props, 'entity.__status__')
        const nextStatus = get(nextProps, 'entity.__status__')

        // debugger;

        if ( hasEntity && status !== nextStatus ) {
            this.handleChangeEntityStatus(nextProps.entity, nextStatus)
        }
    }
    /**
     * Will only be called when two conditions are met:
     * 1. Form is being used for updating an entity
     * 2. __status__ of that entity has changed
     * 
     */
    handleChangeEntityStatus = (entity, status) => {    
        if ( status === ENTITY_STATUS_DATA_AVAILABLE ) {
            const { initialize } = this.props
            initialize(entity)
        }
    }
    wrapSubmit = ( submit ) => {
      return (...args) => {
        this.setState(getDefaultState())

        return submit(...args)
          .then(action => {
            if ( !action ) {
              /*
              console && console.error && console.error(
                'nothing returned in then'
              )
              */
            }
            const {error, payload} = action

            if (error) {
              
              this.setState({
                error: true,
                errorMessage: payload.message
              })

              throw new Error(`An error occurred while submitting the form: ${payload.message}`)
            }

            return action
          })
      }
    }
    renderSubmitButton = ({label, labelWhenSubmitting}) => {
      const { submitting } = this.props

      return (
        /*
        <RaisedButton
          label={submitting ? labelWhenSubmitting : label}
          secondary
          onClick={this.handleSubmit}
          disabled={submitting}/>
        */
        
        <FlatButton
          label={submitting ? labelWhenSubmitting : label}
          secondary
          onClick={this.handleSubmit}
          disabled={submitting}/>
        
        // <Link to="#/" onClick={this.handleSubmit} className="color-primary">{submitting ? labelWhenSubmitting : label}</Link>
      )
    }
    renderMessage = () => {

      const { error, errorMessage } = this.state

      return error ? <div style={{color: '#EF5350', fontSize: '12pt'}}>{ errorMessage }</div> : <span></span>
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onSubmit={this.handleSubmit}
          renderSubmitButton={this.renderSubmitButton}
          renderMessage={this.renderMessage}/>
      )
    }
  }
}

