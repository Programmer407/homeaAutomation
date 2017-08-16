// libs
import React from 'react'
import { AutoComplete, DatePicker } from 'material-ui'

// src
import './FilterToolbar.scss'


const styles = {
	checkboxLabelStyle: {
		color: '#555',
		fontWeight: 400
	},

	checkboxIconStyle: {
		fill: '#777'
	},

	checkboxStyle: {
		bottom: -5
	}
}

const FilterToolbar = props => {
	const { data, onSubmit, onQueryStringChange, onStartDateChange, onEndDateChange, listingParameters, onStartDatePickerDismiss, onEndDatePickerDismiss } = props
	const flatData = _.uniq(_.compact(_.flatten(data.map(dat => { return _.flatMap(dat) } ))))
	const { startDate, endDate, queryString } = listingParameters

	// <Field name="queryString" label="Search" component={ renderAutocomplete } dataSource={ flatData } />
	return (
		<div className="row">
			<div className="col-md-12 col-sm-12">
				<form role="form" className="form-inline" onSubmit={ onSubmit }>
					<div className="row">
						<div className="col-md-6">
							<AutoComplete
								underlineShow={false}
								inputStyle={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
								fullWidth
								hintText="Search (ex: BTC, XRP, MyWallet)"
								dataSource={ flatData }
								hintStyle={{fontSize: 16, paddingLeft: 15}}
								filter={AutoComplete.caseInsensitiveFilter} 
								onNewRequest={ onQueryStringChange } 
								value={ queryString }/>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-sm-6">
									<DatePicker
										autoOk
										fullWidth
										cancelLabel="Reset"
										underlineShow={ false }
										style={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
										textFieldStyle={{ maxHeight: 46 }}
										hintText="Start Date"
										onChange={ onStartDateChange }
										onDismiss={ onStartDatePickerDismiss }
										value={ startDate } />
								</div>
								
								<div className="col-sm-6">
									<DatePicker
										autoOk
										fullWidth
										cancelLabel="Reset"
										underlineShow={ false }
										style={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
										textFieldStyle={{ maxHeight: 46 }}
										hintText="End Date"
										onChange={ onEndDateChange }
										onDismiss={ onEndDatePickerDismiss }
										value={ endDate } />
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>

	)
}

export default FilterToolbar
