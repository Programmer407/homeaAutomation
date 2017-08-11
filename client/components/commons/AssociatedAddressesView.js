// libs
import React, {PropTypes} from "react";
import { IconButton, CircularProgress } from 'material-ui'

// assets
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'

const AssociatedAddressesView = (props) => {
	const { relatedTransactions, isRefreshing, isDeleting, triggerDialogModal, type, onNicknameDialogOpen } = props;
	const filteredTrx1 = _.filter(relatedTransactions, function(o) { return !_.isNil(o.associatedaddress); } ); 
	const filteredTrx = _.uniqBy(filteredTrx1, 'associatedaddress.address' ); 
	const cyan500 = 'rgba(0, 188, 212, 0.6)'

	return (
		<div className="box box-default table-box table-responsive mdl-shadow--2dp">
			<table className="mdl-data-table">
				<thead className="tbl-header">
					<tr>
						<th className="mdl-data-table__cell--non-numeric">Nickname</th>
						<th className="mdl-data-table__cell--non-numeric">Address</th>
						{/* <th>Balance</th> */}
						<th></th>
					</tr>
				</thead>
				<tbody className="tbl-body">
					<Choose>
						<When condition={ isRefreshing || isDeleting }>
							<tr>
								<td colSpan="4" className="text-center">
									<CircularProgress size={30} thickness={3} />
								</td>
							</tr>
						</When>
						<Otherwise>
							<Choose>
								<When condition={ filteredTrx && filteredTrx.length > 0 }>
									{
										filteredTrx.map((transaction, index) => {
											const { id, address, nickName } = transaction.associatedaddress
											
											return (
												<tr key={ index }>
													<td className="mdl-data-table__cell--non-numeric">{ nickName }</td>
													<td className="mdl-data-table__cell--non-numeric">{ address }</td>
													{/* <td>{ amount } { asset }</td> */}
													<td>
														<IconButton onClick={ onNicknameDialogOpen.bind(this, { id, address, oldNickname: nickName, type }) }>
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