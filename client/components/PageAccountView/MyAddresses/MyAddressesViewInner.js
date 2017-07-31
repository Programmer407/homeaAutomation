// libs
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import ActionCached from 'material-ui/svg-icons/action/cached'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import NicknameDialog from '../commons/DialogModalView'
import { Field } from 'redux-form'
import { renderTextArea } from '../../../utils'
import IconButton from 'material-ui/IconButton'

//src
import AssociatedAddressesView from '../commons/AssociatedAddressesView'



const MyAddressesViewInner = (props) => {
	const { userAddressesList, onAddAddressesClick, onRefreshAddressClick, onDeleteAddressClick, handleModalOnSubmit, triggerDialogModal, isRefreshUserAddressList, onSubmit, renderRaisedSubmitButton, renderMessage, handleRowClick, selectedKey, selectedAddress } = props
	const { nickName: selectedAddressNickname, AddressTransactions: selectedAddressTransactions } = selectedAddress
	const cyan500 = 'rgba(0,188,212,0.6)'

	return (
		<article className="article">
			<h2 className="article-title">Addresses</h2>
			
			<div className="row">
				<div className="col-lg-8">
					<div className="box box-default">
						<div>
							<div className="box-header box-header-primary">My Addresses</div>
							<div className="box-body">
								<p>These are the addresses you added manually.</p>
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
												<When condition={ isRefreshUserAddressList }>
													<tr>
														<td colSpan="4" className="text-center">
															<CircularProgress size={30} thickness={3} />
														</td>
													</tr>
												</When>
												<Otherwise>
													<Choose>
														<When condition={ userAddressesList && userAddressesList.length > 0 }>
															{
																userAddressesList.map(userAddressesListItem => {
																	const {id, address, nickName: nickname, currency, balance} = userAddressesListItem

																	return (
																		<tr key={ id } onClick={ handleRowClick.bind(this, id) }>
																			<td className="mdl-data-table__cell--non-numeric">{nickname}</td>
																			<td className="mdl-data-table__cell--non-numeric">{address}</td>
																			<td>{balance} {currency}</td>
																			<td>
																				<IconButton onClick={ onRefreshAddressClick.bind(this, id) }>
																					<ActionCached color={cyan500}/> 
																				</IconButton>

																				<IconButton onClick={ triggerDialogModal.bind(this, {id, address, oldNickname: nickname }) }>
																					<EditorModeEdit color={cyan500}/> 
																				</IconButton>
																				
																				<IconButton onClick={ onDeleteAddressClick.bind(this, id) }>
																					<ActionDelete color={cyan500}/> 
																				</IconButton>
																			</td>
																		</tr>
																)}
															)}
														</When>
														<Otherwise>
															<tr>
																<td colSpan="4" className="text-center">BTC addresses you add manually will show up here.</td>
															</tr>
														</Otherwise>
													</Choose>
												</Otherwise>
											</Choose>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div>
							<div className="box-header box-header-primary">
								<Choose>
									<When condition={ selectedAddress }>
										{'Associated Addresses of ' + selectedAddressNickname}
									</When>
									<Otherwise>
										{'Associated Addresses'}
									</Otherwise>
								</Choose>
							</div>
							<div className="box-body">
								<p>These addresses were found in the transaction histories of the addresses you manually added.</p>
								<AssociatedAddressesView
									isRefreshing={ isRefreshUserAddressList }
									relatedTransactions={ selectedAddressTransactions } />
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="box box-default">
						<div className="box-header box-header-primary">Add Addresses</div>
						<div className="box-body">
							<p>Enter one address per line. Other addresses that are yours based on Wisdom's analysis of the blockchain will be automatically added for you.</p>
							<form className="form-inline" role="form" onSubmit={ onSubmit }>
								<Field name="newAddresses" label="Enter one address per line" rows={1} rowsMax={10} component={renderTextArea} fullWidth multiLine></Field>
								<div className="btn-space">
									{
										renderRaisedSubmitButton({
											label: 'Submit',
											labelWhenSubmitting: 'Validating'
										})
									}
								</div>
								{/*<RaisedButton label="Add Addresses" onClick={ onAddAddressesClick } primary />*/}
							</form>
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}


export default MyAddressesViewInner