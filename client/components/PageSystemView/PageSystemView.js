// libs
import React from "react"
import { connect } from "react-redux"
import {reduxForm} from 'redux-form'
import PageSystemViewInner from "./PageSystemViewInner"

// src
import { logoutWhenIdle } from '../../utils'
import { transactionsData, deleteTransaction, openFormDialog, closeFormDialog } from "../../actions"

@reduxForm({
	form: 'AddTrxForm'
})
// @logoutWhenIdle()
class PageSystemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			trxId: null,
			isHelpDialogOpen: false, 
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
	
	/* DATA ACTIONS */
	getTransactionData = (parameters) => {
		const { dispatch } = this.props
		
		dispatch(transactionsData(parameters))
	}

	deleteTransaction = (parameters) => {
		const { dispatch } = this.props
		const { id, type } = parameters
		
		this.setState({
			trxId: id
		}, function() {
			dispatch(deleteTransaction(id, type))
		})
	}

	/* EVENT HANDLERS */
	handleHelpDialogToggle = () => {
		const { isHelpDialogOpen } = this.state

		this.setState({
			isHelpDialogOpen: !isHelpDialogOpen
		})
	}
	
	handleFormDialogOpen = () => {
		const { dispatch } = this.props

		this.setState({
			trxId: null
		}, () => {
			dispatch(openFormDialog())
		})
	}
	
	handleFormDialogClose = () => {
		const { dispatch } = this.props

		this.setState({
			trxId: null
		}, () => {
			dispatch(closeFormDialog())
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
			this.getTransactionData(this.state.listingParameters)
		})
	}

	handleDatesCheckboxClick = () => {
		const { isSearchDatesChecked } = this.state

		this.setState({
			isSearchDatesChecked: !isSearchDatesChecked
		})
	}

	handleEditTrxClick = (params) => {
		const { id } = params
		const { dispatch } = this.props

		this.setState({
			trxId: id
		}, () => {
			dispatch(openFormDialog())
		})
	}

	/* LIFECYCLE METHODS */
	componentDidMount() {
		const { dispatch } = this.props

		dispatch(transactionsData('Purchase'))
	}

	componentWillReceiveProps(nextProps) {
		let modifiedTrxs = []
		const { transactionList } = nextProps

		if (!_.isNil(transactionList)) {
			modifiedTrxs = transactionList.map(trx => {
				return _.pick(trx, [
					'transactionDate',
					'asset',
					'useraddress.nickName',
					'destination',
					'transactionimporttype',
					'associatedaddress.nickName',
					'transactiontype.id',
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
				onDeleteClick={ this.deleteTransaction }
				onEditClick={ this.handleEditTrxClick }
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
			/>
		)
  }
}

/* redux connect() and related functions */
function mapStateToProps(state, ownProps) {
	const transactionList = state.entities.transactions.transactionList
	const isRefreshTransactionList = state.entities.transactions.refreshTransactionList
	const isDeletingTrxListItem = state.entities.transactions.deleteTransactionList
	const isUpdatingTrxListItem = state.entities.transactions.updateTransactionList
	const isFormDialogOpen = state.entities.transactions.isFormDialogOpen

	return {
		transactionList,
		isRefreshTransactionList,
		isDeletingTrxListItem,
		isUpdatingTrxListItem,
		isFormDialogOpen
	}
}

export default connect(mapStateToProps)(PageSystemView)
