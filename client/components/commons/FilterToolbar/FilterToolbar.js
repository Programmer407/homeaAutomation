// libs
import React from 'react'
import { Field } from 'redux-form' 

// src
import { renderAutocomplete, renderStyledDatePicker } from '../../../utils'
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
	const { data } = props
	const flatData = _.uniq(_.compact(_.flatten(data.map(dat => { return _.flatMap(dat) } ))))

	return (
		<div className="row">
			<div className="col-md-12 col-sm-12">
				{
					<form role="form" className="form-inline">
						<div className="row">
							<div className="col-md-6">
								<Field name="queryString" label="Search" component={ renderAutocomplete } dataSource={ flatData } />
							</div>
							<div className="col-md-6">
								<div className="row">
									<div className="col-sm-6">
										<Field name="startDate" label="Start Date" component={ renderStyledDatePicker } />
									</div>
									<div className="col-sm-6">
										<Field name="endDate" label="End Date" component={ renderStyledDatePicker } />
									</div>
								</div>
							</div>
						</div>
					</form>
				}
			</div>
			
			{/* <div className="col-md-4 col-sm-12">
				<div className="col-xs-6" style={{ backgroundColor: '#F5F5F5' }}>
					<Checkbox label="Search Dates" iconStyle={ styles.checkboxIconStyle } labelStyle={ styles.checkboxLabelStyle } style={ styles.checkboxStyle } onClick={ onDatesCheckboxClick.bind(this) } checked={ isSearchDatesChecked }/>
				</div>
				<div className="col-xs-6 text-right" style={{ backgroundColor: '#F5F5F5', borderLeft: '1px solid #999' }}>
					<RaisedButton  onClick={ onUploadDialogToggle } label="Upload CSV" primary style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "pre", marginRight: 10 }}/> 
				</div>
			</div> */}
		</div>

	)
}

export default FilterToolbar
