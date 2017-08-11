// libs
import React from 'react'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, DropDownMenu, MenuItem, FlatButton, RaisedButton, IconButton, IconMenu, Checkbox  } from 'material-ui'
import { Field } from 'redux-form' 

// src
import { renderAutocomplete, renderInlineDateField } from '../../../utils'


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
	const { onDatesCheckboxClick, isSearchDatesChecked, data, onUploadDialogToggle } = props
	console.log('props', props)
	const flatData = _.uniq(_.compact(_.flatten(data.map(dat => { return _.flatMap(dat) } ))))

	return (
		<div className="row">
			<div className="col-md-8 col-sm-12">
				{
					<Choose>
						<When condition={ !isSearchDatesChecked }>
							<form role="form" className="form-inline">
								<Field name="queryString" label="Search" component={ renderAutocomplete } dataSource={ flatData } />
							</form>
						</When>
						<Otherwise>
							<form role="form" className="form-inline date-search">
								<Field name="startDate" label="Start Date" component={ renderInlineDateField } />
								<Field name="endDate" label="End Date" component={ renderInlineDateField } />
							</form>
						</Otherwise>
					</Choose>
				}
			</div>
			
			<div className="col-md-4 col-sm-12">
				<div className="col-xs-6" style={{ backgroundColor: '#F5F5F5' }}>
					<Checkbox label="Search Dates" iconStyle={ styles.checkboxIconStyle } labelStyle={ styles.checkboxLabelStyle } style={ styles.checkboxStyle } onClick={ onDatesCheckboxClick.bind(this) } checked={ isSearchDatesChecked }/>
				</div>
				<div className="col-xs-6 text-right" style={{ backgroundColor: '#F5F5F5', borderLeft: '1px solid #999' }}>
					<RaisedButton  onClick={ onUploadDialogToggle } label="Upload CSV" primary style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "pre", marginRight: 10 }}/> 
				</div>
			</div>
		</div>

	)
}

export default FilterToolbar


{/* <Toolbar style={{ backgroundColor: '#F5F5F5' }}>
	<ToolbarGroup firstChild >
		<form role="form" className="inline-form-toolbar">
			<Field name="queryString" label="Search" component={ renderAutocomplete } dataSource={ flatData } />
		</form>

		<DropDownMenu value={1}>
			<MenuItem value={1} primaryText="All Broadcasts" />
			<MenuItem value={2} primaryText="All Voice" />
			<MenuItem value={3} primaryText="All Text" />
			<MenuItem value={4} primaryText="Complete Voice" />
			<MenuItem value={5} primaryText="Complete Text" />
			<MenuItem value={6} primaryText="Active Voice" />
			<MenuItem value={7} primaryText="Active Text" />
		</DropDownMenu>
	</ToolbarGroup>
	<ToolbarGroup lastChild>
		<FontIcon className="muidocs-icon-custom-sort" />
		<ToolbarSeparator />
		<RaisedButton label="Upload CSV" primary />
		<IconMenu
			iconButtonElement={
				<IconButton touch>
					<NavigationExpandMoreIcon />
				</IconButton>
									}
							>
			<MenuItem primaryText="Download" />
			<MenuItem primaryText="More Info" />
		</IconMenu>
	</ToolbarGroup>
</Toolbar> */}