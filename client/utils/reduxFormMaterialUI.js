// libs
import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import SelectField from 'material-ui/SelectField'
import DatePicker from 'material-ui/DatePicker';

// src

export const renderTextFieldWithFixedLabel = ({ input, label, innerRef, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFixed
    fullWidth
    errorText={touched && error}
    ref={innerRef}
    hintStyle={{fontSize: 12}}
    {...input}
    {...custom}
  />
)

export const renderTextField = ({ input, label, value, autoComplete, innerRef, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={ label }
    fullWidth
    errorText={ touched && error }
    ref={ innerRef }
    autoComplete={ autoComplete }
    hintStyle={ {fontSize: 14} }
    {...input}
    {...custom}
  />
)

export const renderTextArea = ({ input, label, rows, rowsMax, multiLine, autoComplete, innerRef,  meta: { touched, error, submitting }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    fullWidth
		multiLine
		rows={rows}
		rowsMax={rowsMax}
    errorText={touched && error}
    ref={innerRef}
    autoComplete={autoComplete}
    hintStyle={{fontSize: 12}}
    {...input}
    {...custom}
  />
)

export const renderCheckbox = ({ input, label, padding }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    style={{paddingTop: padding[0], paddingRight: padding[1], paddingBottom: padding[2], paddingLeft: padding[3]}}
  />
)

export const renderRadioGroup = ({ input, label, ...rest }) => (
  <div style={{margin: '10px 0'}}>
    <label style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.298039)'}}>{label}</label>
    <RadioButtonGroup {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}/>
  </div>
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    floatingLabelText={label}
    floatingLabelFixed={false}
    fullWidth
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}/>
)

export const renderInlineDateField = ({ input, label, meta: { touched, error }, children }) => (
  <DatePicker
		floatingLabelText={label}
		container="inline"
	/>
)