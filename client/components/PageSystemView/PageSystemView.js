// libs
import React from "react"
import { connect } from "react-redux"
import {reduxForm} from 'redux-form'
import PageSystemViewInner from "./PageSystemViewInner"

// src
import { logoutWhenIdle } from '../../utils'

@reduxForm({
	form: 'AddTrxForm'
})
// @logoutWhenIdle()
class PageSystemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			isHelpDialogOpen: false,
			isFormDialogOpen: false, 
			isUploadDialogOpen: false,
			isActionTypeDialogOpen: false,
			hoveredRow: null,
			selectedRows: [],
			allSelected: false,
	    rowSelected: false,
			pageOffset: 0,
			pageLimit: 15,
			totalRecords: 2000,
			tabIndex: 0,
			isSearchDatesChecked: false,
			tblData: [
				{
					id: 10,
					date: '03-Aug-2017',
					source: 'Coinbase',
					action: 'BUY',
					coin: 'BTC',
					volume: '17.7869',
					price: '$ 13,687.7866',
					fee: '$ 3.45',
					cost: '$ -450.50',
					operations: '',
					selected: false
				}, {
					id: 11,
					date: '03-Aug-2017',
					source: 'Coinbase',
					action: 'BUY',
					coin: 'BTC',
					volume: '17.7869',
					price: '$ 13,687.7866',
					fee: '$ 3.45',
					cost: '$ -450.50',
					operations: '',
					selected: false
				}, {
					id: 12,
					date: '03-Aug-2017',
					source: 'Coinbase',
					action: 'BUY',
					coin: 'BTC',
					volume: '17.7869',
					price: '$ 13,687.7866',
					fee: '$ 3.45',
					cost: '$ -450.50',
					operations: '',
					selected: false
				}, {
					id: 13,
					date: '03-Aug-2017',
					source: 'Coinbase',
					action: 'BUY',
					coin: 'BTC',
					volume: '17.7869',
					price: '$ 13,687.7866',
					fee: '$ 3.45',
					cost: '$ -450.50',
					operations: '',
					selected: false
				}, {
					id: 14,
					date: '03-Aug-2017',
					source: 'Coinbase',
					action: 'BUY',
					coin: 'BTC',
					volume: '17.7869',
					price: '$ 13,687.7866',
					fee: '$ 3.45',
					cost: '$ -450.50',
					operations: '',
					selected: false
				}
			]
		}
  }

	handleHelpDialogToggle = () => {
		const { isHelpDialogOpen } = this.state

		this.setState({
			isHelpDialogOpen: !isHelpDialogOpen
		})
	}
	
	handleFormDialogToggle = () => {
		const { isFormDialogOpen } = this.state

		this.setState({
			isFormDialogOpen: !isFormDialogOpen
		})
	}
	
	handleUploadDialogToggle = () => {
		const { isUploadDialogOpen } = this.state

		this.setState({
			isUploadDialogOpen: !isUploadDialogOpen
		})
	}
	
	handleActionTypeDialogToggle = () => {
		const { isActionTypeDialogOpen } = this.state

		this.setState({
			isActionTypeDialogOpen: !isActionTypeDialogOpen
		})
	}

	handleHeadCheckboxClick = () => {
		let newSelectedRows = []
		let allSelected = false
		let rowSelected = false
		const { tblData, selectedRows } = this.state

		if (_.keys(tblData).length === selectedRows.length) {
			newSelectedRows = []
			allSelected = false
		} else {
			const dataIds = Object.keys(tblData).map(data => { return tblData[data].id })
			newSelectedRows = _.concat(newSelectedRows, dataIds)
			allSelected = true
		}
		
		rowSelected = (newSelectedRows.length > 0) ? true : false
		
		this.setState({
			allSelected,
			rowSelected,
			selectedRows: newSelectedRows
		})
	}

	handleCheckboxClick = (checkedRow) => {
		let allSelected = false
		let rowSelected = false
		let newSelectedRows = []
		const { selectedRows, tblData } = this.state
		const keyCount = _.keys(tblData).length

		if (_.indexOf(selectedRows, checkedRow) !== -1) {
			newSelectedRows = _.pull(selectedRows, checkedRow)
		} else {
			newSelectedRows = _.concat(selectedRows, checkedRow)
		}

		allSelected = (keyCount === newSelectedRows.length) ? true : false
		rowSelected = (newSelectedRows.length > 0) ? true : false
		
		this.setState({
			allSelected,
			rowSelected,
			selectedRows: newSelectedRows
		})
	}
	
	handleRowHover = (hoveredRow) => {
		this.setState({ hoveredRow: hoveredRow.currentTarget.rowIndex - 1 });
	}
	
	handleRowHoverExit = () => {
		this.setState({ hoveredRow: null });
	}
	
	// handlePageClick = (val) => {
	// 	console.log('---> Pagination:', val)
	// }
	
	handleTabChange = (tabIndex) => {
		this.setState({
			tabIndex,
			selectedRows: [],
			allSelected: false,
			rowSelected: false
		})
	}

	handleDatesCheckboxClick = () => {
		const { isSearchDatesChecked } = this.state

		this.setState({
			isSearchDatesChecked: !isSearchDatesChecked
		})
	}

  render() {
		return (
			<PageSystemViewInner
				{...this.props}
				{...this.state}
				onHelpDialogToggle={ this.handleHelpDialogToggle }
				onFormDialogToggle={ this.handleFormDialogToggle }
				onUploadDialogToggle={ this.handleUploadDialogToggle }
				onActionTypeDialogToggle={ this.handleActionTypeDialogToggle }
				onRowHover={ this.handleRowHover }
				onRowHoverExit={ this.handleRowHoverExit }
				onCheckboxClick={ this.handleCheckboxClick }
				onHeadCheckboxClick={ this.handleHeadCheckboxClick }
				onPageClick={ this.handlePageClick }
				onTabChange={ this.handleTabChange }
				onDatesCheckboxClick={ this.handleDatesCheckboxClick }
			/>
		)
  }
}

export default PageSystemView