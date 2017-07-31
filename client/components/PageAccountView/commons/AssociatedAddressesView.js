import React, {PropTypes} from "react";
import CircularProgress from 'material-ui/CircularProgress';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconButton from 'material-ui/IconButton'

const AssociatedAddressesView = (props) => {
	const { relatedTransactions, isRefreshing } = props;
	const cyan500 = 'rgba(0, 188, 212, 0.6)'

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
						<When condition={ isRefreshing }>
							<tr>
								<td colSpan="4" className="text-center">
									<CircularProgress size={30} thickness={3} />
								</td>
							</tr>
						</When>
						<Otherwise>
							<Choose>
								<When condition={ relatedTransactions && relatedTransactions.length > 0}>
									{
										relatedTransactions.map(transaction => {
											const { id, amount, asset, destination } = transaction

											return (
												<tr key={ id }>
													<td className="mdl-data-table__cell--non-numeric">Sample Nickname</td>
													<td className="mdl-data-table__cell--non-numeric">{ destination }</td>
													<td>{ amount } { asset }</td>
													<td>
														{/*<IconButton onClick={ triggerDialogModal.bind(this, {id, address, oldNickname: nickname }) }>
															<EditorModeEdit color={cyan500}/> 
														</IconButton>*/}
														<IconButton>
															<EditorModeEdit color={cyan500}/> 
														</IconButton>
													</td>
												</tr>
											)
										}
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