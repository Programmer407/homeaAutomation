import * as ActionTypes from '../../actions'

export default function accounts(state = {}, action) {
  switch (action.type) {

/** ***************************************transactionsData*****************************************************************/ 
		case ActionTypes.TRANSACTION_DATA: {
			return {...state, refreshTransactionList: true}
		}
		case ActionTypes.TRANSACTION_DATA_SUCCESS: {
			const {payload} = action
			const {transactionList} = payload
			if (!payload) {
				throw new Error(`Can't execute ${ ActionTypes.TRANSACTION_DATA_SUCCESS }. {payload} isn't available in action`)
			}
			return {...state, transactionList, refreshTransactionList: false}
		}
		case ActionTypes.TRANSACTION_DATA_FAILURE: {
			return {...state, refreshTransactionList: false}
		}

		/** *************************************** INSERT NEW MANUAL TRANSACTION *****************************************************************/ 
		case ActionTypes.INSERT_TRANSACTION: {
			return {...state, refreshTransactionList: true}
		}
		case ActionTypes.INSERT_TRANSACTION_SUCCESS: {
			const {payload} = action
			const {transactionList} = payload
			if (!payload) {
				throw new Error(`Can't execute ${ ActionTypes.INSERT_TRANSACTION_SUCCESS }. {payload} isn't available in action`)
			}
			return {...state, transactionList, refreshTransactionList: false}
		}
		case ActionTypes.INSERT_TRANSACTION_FAILURE: {
			return {...state, refreshTransactionList: false}
		}
		
		/** *************************************** DELETE TRANSACTION *****************************************************************/ 
		case ActionTypes.DELETE_TRANSACTION: {
			return {...state, deleteTransactionList: true}
		}
		case ActionTypes.DELETE_TRANSACTION_SUCCESS: {
			const {payload} = action
			const {transactionList} = payload
			if (!payload) {
				throw new Error(`Can't execute ${ ActionTypes.DELETE_TRANSACTION_SUCCESS }. {payload} isn't available in action`)
			}
			return {...state, transactionList, deleteTransactionList: false}
		}
		case ActionTypes.DELETE_TRANSACTION_FAILURE: {
			return {...state, deleteTransactionList: false}
		}
		
		/** *************************************** UPDATE TRANSACTION *****************************************************************/ 
		case ActionTypes.UPDATE_TRANSACTION: {
			return {...state, updateTransactionList: true}
		}
		case ActionTypes.UPDATE_TRANSACTION_SUCCESS: {
			const {payload} = action
			const {transactionList} = payload
			if (!payload) {
				throw new Error(`Can't execute ${ ActionTypes.UPDATE_TRANSACTION_SUCCESS }. {payload} isn't available in action`)
			}
			return {...state, transactionList, updateTransactionList: false}
		}
		case ActionTypes.UPDATE_TRANSACTION_FAILURE: {
			return {...state, updateTransactionList: false}
		}
		
		/** *************************************** MODAL DIALOG *****************************************************************/ 
		case ActionTypes.CLOSE_FORM_DIALOG: {
			return {...state, isFormDialogOpen: false}
		}
		
		case ActionTypes.OPEN_FORM_DIALOG: {
			return {...state, isFormDialogOpen: true}
		}
/** ************************************default********************************************************************/     
		default: {
			return state
		}
  }
}


