// libs
import React from 'react'
import { AutoComplete, DatePicker, FlatButton, RaisedButton } from 'material-ui'

// src
import './FilterToolbar.scss'
import { ResetBtn } from '../../commons'


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
	const { data, onSubmit, onQueryStringChange, onStartDateChange, onEndDateChange, listingParameters, onStartDatePickerDismiss, onEndDatePickerDismiss, resetFilterParams } = props
	const flatData = _.uniq(_.compact(_.flatten(data.map(dat => { return _.flatMap(dat) } ))))
	const { startDate, endDate, queryString } = listingParameters
	// let minDate
	// let maxDate

	// if (startDate && endDate) {
	// 	minDate = new Date(startDate)
	// 	maxDate = new Date(endDate)
	// }
	
	// console.log('START DATE', startDate)
	// console.log('END DATE', endDate)
	// console.log('MIN DATE', minDate)
	// console.log('MAX DATE', maxDate)

	return (
		<div className="row">
			<div className="col-md-7 col-sm-12">
				<div className="row">
					<div className="col-md-5">
						<AutoComplete
							underlineShow={false}
							inputStyle={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
							fullWidth
							filter={ AutoComplete.caseInsensitiveFilter }
							hintText="Search (ex: BTC, XRP, MyWallet)"
							dataSource={ flatData }
							hintStyle={{fontSize: 16, paddingLeft: 15}} 
							onNewRequest={ onQueryStringChange } 
							searchText={ queryString }/>
					</div>
					<div className="col-md-7">
						<div className="row">
							<div className="col-sm-5">
								<DatePicker
									autoOk
									fullWidth
									maxDate={ endDate ? new Date(endDate) : '' }
									underlineShow={ false }
									style={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
									textFieldStyle={{ maxHeight: 46 }}
									hintText="Start Date"
									onChange={ onStartDateChange }
									value={ startDate } />
							</div>
							
							<div className="col-sm-5">
								<DatePicker
									autoOk
									fullWidth
									minDate={ new Date(startDate) }
									underlineShow={ false }
									style={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
									textFieldStyle={{ maxHeight: 46 }}
									hintText="End Date"
									onChange={ onEndDateChange }
									value={ endDate } />
							</div>
							
							<div className="col-sm-2">
								{ (queryString || startDate || endDate) ?  <FlatButton label="Reset" primary style={{ top: 7 }} onClick={ resetFilterParams }/> : ''}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="col-md-5 col-sm-12 text-right">
				<RaisedButton label="Upload CSV" primary style={{ top: 7, marginRight: 26 }}/>
			</div>
		</div>

	)
}

export default FilterToolbar
