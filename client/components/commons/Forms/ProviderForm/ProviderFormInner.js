// libs
import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Field } from 'redux-form'

// src
import { renderSelectField } from '../../../../utils'

const ProviderFormInner = props => {
	const { providerList, onSubmit, renderRaisedSubmitButton } = props

	return (
		<form onSubmit={ onSubmit }>
			<Field name="selectedProvider" label="Provider" component={ renderSelectField }>
				<MenuItem key={ 0 } value={ 0 } primaryText={ 'Select a provider...' } selected/>
				{providerList.map( (provider) => 
					<MenuItem key={ provider.id } value={ provider.id } primaryText={ provider.displayName } />
				)}
			</Field>
			<div className="btn-space">
				{
					renderRaisedSubmitButton({
						label: 'Connect',
						labelWhenSubmitting: 'Connecting'
					})
				}
			</div>
		</form>
	)
}

export default ProviderFormInner
