// libs
import React from 'react'
import { Field } from 'redux-form'

// src 
import './FilterBarForm.scss'
import { renderAutocomplete, renderInlineDateField } from '../../../../utils'

const FilterBarForm = (props) => {
	const flatData = _.uniq(_.compact(_.flatten(props.data.map(dat => { return _.flatMap(dat) } ))))

	return (
		<form role="form" className="form-inline filter-form">
			<div className="row">
				<div className="col-lg-4">
					<Field name="startDateFilter" label="Start Date" component={ renderInlineDateField } />
				</div>
				<div className="col-lg-4">
					<Field name="endDateFilter" label="End Date" component={ renderInlineDateField } />				
				</div>
				<div className="col-lg-4">
					<Field name="textFilter" label="Search (ex. BTC, XRP, My Wallet)" dataSource={ flatData } component={ renderAutocomplete } />
				</div>
			</div>
		</form>	
	)
}

export default FilterBarForm
