// libs
import React from "react"
import { connect } from "react-redux"
import PageSystemViewInner from "./PageSystemViewInner"
import moment from 'moment'

// src
import { transactionsData, deleteTransaction, updateTransactionsType, openFormDialog, closeFormDialog } from "../../actions"

const orderByColumns = {
	date: 'transactionDate',
	destination: 'destination',
	volume: 'amount',
	value: 'amount',
	action: 'transactiontype.type_name',
	source: 'transactionimporttype.import_type_name, useraddress.nick_name, userwallet.wallet_name'
}

class PageSystemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			trxId: null,
			deletingAll: false,
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
			orderBy: 'date',
			listingParameters: {
				trxType: 'Purchase',
				startDate: null,
				endDate: null,
				queryString: '',
				orderBy: 'transactionDate',
				orderWay: 'DESC'
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
	getTransactionData = () => {
		console.log('Fetching transaction data...')

		const { dispatch } = this.props
		const { listingParameters } = this.state
		
		dispatch(transactionsData(listingParameters))
	}
	
	deleteTransactions = (trxIds) => {
		console.log('Deleting transactions...')

		const { dispatch } = this.props
		const { listingParameters } = this.state
		
		return dispatch(deleteTransaction(trxIds, listingParameters))
			.then(action => {
				this.setState({
					selectedRows: [],
					allSelected: false,
					rowSelected: false,
					deletingAll: false
				})
				return action
			})
	}

	/* EVENT HANDLERS */
	handleQueryStringChange = (queryString) => {
		const { listingParameters } = this.state

		this.setState({
			listingParameters: _.set(listingParameters, 'queryString', queryString)
		})
	}
	
	handleStartDateChange = (e, date) => {
		const { listingParameters } = this.state

		if (date && !moment(date).isSame(listingParameters.startDate)) {
			this.setState({
				listingParameters: _.set(listingParameters, 'startDate', date)
			}, () => this.getTransactionData(listingParameters))
		}
	}
	
	handleEndDateChange = (e, date) => {
		const { listingParameters } = this.state
		
		if (date && !moment(date).isSame(listingParameters.endDate)) {
			this.setState({
				listingParameters: _.set(listingParameters, 'endDate', date)
			}, () => this.getTransactionData(listingParameters))
		}
	}

	resetFilterParams = () => {
		let { listingParameters } = this.state
		listingParameters = _.set(listingParameters, 'queryString', '')
		listingParameters = _.set(listingParameters, 'startDate', null)
		listingParameters = _.set(listingParameters, 'endDate', null)
		
		this.setState({
			listingParameters
		}, () => this.getTransactionData(listingParameters))
	}


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
		const { selectedRows, modifiedTrxs } = this.state
		
		console.log('handleHeadCheckboxClick', selectedRows, modifiedTrxs)

		if (modifiedTrxs.length === selectedRows.length) {
			newSelectedRows = []
			allSelected = false
		} else {
			const dataIds = modifiedTrxs.map(trx => { return trx.id })
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
		const { selectedRows, modifiedTrxs } = this.state
		const keyCount = _.keys(modifiedTrxs).length

		newSelectedRows = (_.indexOf(selectedRows, checkedRow) !== -1) ? _.pull(selectedRows, checkedRow) : _.concat(selectedRows, checkedRow)
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
	
	handleTabChange = (tabIndex) => {
		let trxType = null
		const { listingParameters } = this.state
		
		switch (tabIndex) {
			case 0:
				trxType = 'Purchase'
				break
			
			case 1:
				trxType = 'Sale'
				break
		
			case 2:
				trxType = 'Trading'
				break
	
			default:
				break
		}
		
		this.setState({
			tabIndex,
			selectedRows: [],
			allSelected: false,
			rowSelected: false,
			listingParameters: _.set(listingParameters, 'trxType', trxType)
		}, () => this.getTransactionData(this.state.listingParameters))
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

	handleDeleteClick = (trxId) => {
		this.setState({
			trxId
		}, this.deleteTransactions([trxId]))
	}

	handleMultipleDelete = () => {
		const { selectedRows } = this.state

		this.setState({
			deletingAll: true
		}, this.deleteTransactions(selectedRows))
	}
	
	handleMultipleTypeChange = (trxType) => {
		const { dispatch } = this.props
		const { selectedRows, listingParameters } = this.state
		
		dispatch(updateTransactionsType(selectedRows, trxType, listingParameters))
	}

	handleColHeaderClick = (orderBy) => {
		const { listingParameters } = this.state
		// console.log('HANDLER CALLED:', orderByColumns[orderBy])

		if (listingParameters.orderBy !== orderByColumns[orderBy]) {
			_.set(listingParameters, 'orderBy', orderByColumns[orderBy])
			_.set(listingParameters, 'orderWay', 'DESC')
		} else {
			listingParameters.orderWay === 'DESC' ? _.set(listingParameters, 'orderWay', 'ASC') : _.set(listingParameters, 'orderWay', 'DESC')
		}

		this.setState({
			orderBy,
			listingParameters
		}, this.getTransactionData())
		
		console.log('UPDATED LISTING PARAMS:', listingParameters)
	}
	
	/* LIFECYCLE METHODS */
	componentDidMount() {
		console.log('ORIGNAL LISTING PARAMS:', this.state.listingParameters)
		this.getTransactionData()
	}

	componentWillReceiveProps(nextProps) {
		let modifiedTrxs = []
		const { transactionList } = nextProps

		if (!_.isNil(transactionList)) {
			modifiedTrxs = transactionList.map(trx => {
				return _.pick(trx, [
					'transactionDate',
					'asset',
					'userwallet',
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
				onDeleteClick={ this.handleDeleteClick }
				onEditClick={ this.handleEditTrxClick }
				onHelpDialogToggle={ this.handleHelpDialogToggle }
				onFormDialogOpen={ this.handleFormDialogOpen }
				onFormDialogClose={ this.handleFormDialogClose }
				onUploadDialogToggle={ this.handleUploadDialogToggle }
				onRowHover={ this.handleRowHover }
				onRowHoverExit={ this.handleRowHoverExit }
				onCheckboxClick={ this.handleCheckboxClick }
				onHeadCheckboxClick={ this.handleHeadCheckboxClick }
				onPageClick={ this.handlePageClick }
				onTabChange={ this.handleTabChange }
				onBatchDeleteClick={ this.handleMultipleDelete }
				onBatchTypeClick={ this.handleMultipleTypeChange }
				onQueryStringChange={ this.handleQueryStringChange }
				onStartDateChange={ this.handleStartDateChange }
				onEndDateChange={ this.handleEndDateChange }
				resetFilterParams={ this.resetFilterParams }
				onColHeaderClick={ this.handleColHeaderClick }
				getTransactionData={ this.getTransactionData }
			/>
		)
  }
}

/* redux connect() and related functions */
function mapStateToProps(state, ownProps) {
	const transactionList = state.entities.transactions.transactionList
	const thisTrxType = state.entities.transactions.trxType
	const isRefreshTransactionList = state.entities.transactions.refreshTransactionList
	const isDeletingTrxListItem = state.entities.transactions.deleteTransactionList
	const isUpdatingTrxListItem = state.entities.transactions.updateTransactionList
	const isFormDialogOpen = state.entities.transactions.isFormDialogOpen

	return {
		transactionList,
		thisTrxType,
		isRefreshTransactionList,
		isDeletingTrxListItem,
		isUpdatingTrxListItem,
		isFormDialogOpen
	}
}

export default connect(mapStateToProps)(PageSystemView)
