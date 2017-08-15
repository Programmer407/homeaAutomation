// libs
import React from "react"
import { connect } from "react-redux"
import {reduxForm} from 'redux-form'
import PageSystemViewInner from "./PageSystemViewInner"

// src
import { logoutWhenIdle } from '../../utils'
import { transactionsData } from "../../actions/entities/transactions"

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
			modifiedTrxs: [],
			isSearchDatesChecked: false,
			listingParameters: {
				trxType: 'Trading'
			},
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
	
	/* GET DATA METHODS */
	getTransactionData = (parameters) => {
		const { dispatch } = this.props
		
		dispatch(transactionsData(parameters))
		console.log('---> I WAS DISPATCHED')
	}

	/* EVENT HANDLERS */
	handleHelpDialogToggle = () => {
		const { isHelpDialogOpen } = this.state

		this.setState({
			isHelpDialogOpen: !isHelpDialogOpen
		})
	}
	
	handleFormDialogOpen = () => {
		this.setState({
			isFormDialogOpen: true,
		})
	}
	
	handleFormDialogClose = () => {
		this.setState({
			isFormDialogOpen: false,
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
		this.setState({ hoveredRow: hoveredRow.currentTarget.rowIndex - 1 })
	}
	
	handleRowHoverExit = () => {
		this.setState({ hoveredRow: null })
	}
	
	// handlePageClick = (val) => {
	// 	console.log('---> Pagination:', val)
	// }
	
	handleTabChange = (tabIndex) => {
		let trxType = null

		switch (tabIndex) {
			case 0:
				trxType = 'Trading'
				break
			
			case 1:
				trxType = 'Purchase'
				break
		
			case 2:
				trxType = 'Sale'
				break
	
			default:
				break
		}
		
		this.setState({
			tabIndex,
			selectedRows: [],
			allSelected: false,
			rowSelected: false,
			listingParameters: {
				trxType
			}
		}, function() {
			console.log('TYPE', this.state.listingParameters.trxType)
			this.getTransactionData(this.state.listingParameters)
		})
	}

	handleDatesCheckboxClick = () => {
		const { isSearchDatesChecked } = this.state

		this.setState({
			isSearchDatesChecked: !isSearchDatesChecked
		})
	}

	/* LIFECYCLE METHODS */
	componentDidMount() {
		const { dispatch } = this.props

		dispatch(transactionsData('Sale'))
	}

	componentWillReceiveProps(nextProps) {
		let modifiedTrxs = []
		const { transactionList } = nextProps
		console.log('transactionList:', nextProps)

		if (!_.isNil(transactionList)) {
			modifiedTrxs = transactionList.map(trx => {
				return _.pick(trx, [
					'transactionDate',
					'useraddress.nickName',
					'destination',
					'associatedaddress.nickName',
					'transactiontype.typeName',
					'amount',
					'useraddress.currency',
					'value',
					'id'
				])
			})
		}

		this.setState({
			modifiedTrxs
		})
	}

  render() {
		return (
			<PageSystemViewInner
				{...this.props}
				{...this.state}
				onHelpDialogToggle={ this.handleHelpDialogToggle }
				onFormDialogOpen={ this.handleFormDialogOpen }
				onFormDialogClose={ this.handleFormDialogClose }
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

/* redux connect() and related functions */
function mapStateToProps(state, ownProps) {
	const transactionList = state.entities.transactions.transactionList
	const isRefreshTransactionList = state.entities.transactions.refreshTransactionList
		
	return {
		transactionList,
		isRefreshTransactionList
	}
}

export default connect(mapStateToProps)(PageSystemView)
