import * as ActionTypes from '../../actions'

export default function accounts(state = {}, action) {
  switch (action.type) {

/*****************************************transactionsData*****************************************************************/ 
		case ActionTypes.TRANSACTION_DATA: {
			return {...state, refreshTransactionList: true}
		}
		case ActionTypes.TRANSACTION_DATA_SUCCESS: {
			const {payload} = action;
			const {transactionList} = payload;
			if (!payload) {
				throw new Error(`Can't execute ${ ActionTypes.TRANSACTION_DATA_SUCCESS }. {payload} isn't available in action`)
			}
			return {...state, transactionList, refreshTransactionList: false};
		}
		case ActionTypes.TRANSACTION_DATA_FAILURE: {
			return {...state, refreshTransactionList: false}
		}
/**************************************default********************************************************************/     
		default: {
			return state
		}
  }
}


