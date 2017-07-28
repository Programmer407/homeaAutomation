import React, {PropTypes} from "react";
import CircularProgress from 'material-ui/CircularProgress';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'


const AssociatedAddressesView = (props) => {
	const { selectedWallet, isRefreshUserWalletList } = props;

	return (
		<div className="box box-default table-box table-responsive mdl-shadow--2dp">
			<table className="mdl-data-table">
				<thead className="tbl-header">
					<tr>
						<th className="mdl-data-table__cell--non-numeric">Nickname</th>
						<th className="mdl-data-table__cell--non-numeric">Address</th>
						<th>Balance</th>
						<th></th>
					</tr>
				</thead>
				<tbody className="tbl-body">
					<Choose>
						<When condition={ isRefreshUserWalletList }>
							<tr>
								<td colSpan="4" className="text-center">
									<CircularProgress size={30} thickness={3} />
								</td>
							</tr>
						</When>
						<Otherwise>
							<Choose>
								<When condition={ selectedWallet && selectedWallet.Transactions &&  selectedWallet.Transactions.length > 0}>
									{selectedWallet.Transactions.map(transaction =>
										<tr key={transaction.id}>
											<td className="mdl-data-table__cell--non-numeric">Sample Nickname</td>
											<td className="mdl-data-table__cell--non-numeric">{transaction.destination}</td>
											<td>{transaction.amount} {transaction.asset}</td>
											<td>
												<a href="#" className="action-icon"><EditorModeEdit /></a>
											</td>
										</tr>
									)}
								</When>
								<Otherwise>
									<tr>
										<td colSpan="4" className="text-center">No associated addresses found.</td>
									</tr>
								</Otherwise>
							</Choose>
						</Otherwise>
					</Choose>
				</tbody>
			</table>
		</div>
	)
}

export default AssociatedAddressesView