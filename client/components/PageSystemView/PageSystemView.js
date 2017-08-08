// libs
import React from "react"
import { connect } from "react-redux"
import {reduxForm} from 'redux-form'
import PageSystemViewInner from "./PageSystemViewInner"

// src
import { logoutWhenIdle } from '../../utils'

const allRows = [0,1,2,3,4]

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
			hoveredRow: null,
			thisRow: null,
			selectedRows: [],
			pageOffset: 0,
			pageLimit: 15,
			totalRecords: 2000,
			tblData: [
				{
					id: 0,
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
					id: 1,
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
					id: 2,
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
					id: 3,
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
					id: 4,
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

	handleCellClick = (rowNumber, columnId) => {
		/* May use this in future */
	}

	handleRowHover = (hoveredRow) => {
		this.setState({ hoveredRow });
	}
	
	handleRowHoverExit = () => {
		this.setState({ hoveredRow: null });
	}

	handleRowSelection = (rows) => {
		let newTblData = []
		const { tblData } = this.state

		if (rows === 'all' || rows.length === 0) {
			newTblData = tblData.map(dat => {
				dat.selected = (rows === 'all')
				return dat
			})
		} else {
			newTblData = tblData.map((dat, index) => {
				dat.selected = _.includes(rows, index)
				return dat
			})
		}
		this.setState({
			tblData: newTblData
		})
	}

	handlePageClick = (val) => {
		console.log('---> Pagination:', val)
	}

  render() {
		return (
			<PageSystemViewInner
				{...this.props}
				{...this.state}
				onHelpDialogToggle={ this.handleHelpDialogToggle }
				onFormDialogToggle={ this.handleFormDialogToggle }
				onRowHover={ this.handleRowHover }
				onRowHoverExit={ this.handleRowHoverExit }
				onRowSelection={ this.handleRowSelection }
				onCellClick={ this.handleCellClick }
				onPageClick={ this.handlePageClick }
			/>
		)
  }
}

export default PageSystemView