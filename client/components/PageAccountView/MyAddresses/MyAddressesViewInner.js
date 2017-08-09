// libs
import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import ActionCached from 'material-ui/svg-icons/action/cached'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { Field } from 'redux-form'
import { renderTextArea } from '../../../utils'
import IconButton from 'material-ui/IconButton'
import moment from 'moment'

//src
import NicknameDialog from '../../commons/DialogModalView';
import AssociatedAddressesView from '../../commons/AssociatedAddressesView';
import { NewAddressForm } from '../../commons/Forms'

const MyAddressesViewInner = (props) => {
	const { userAddressesList, onAddAddressesClick, onRefreshAddressClick, onDeleteAddressClick, handleAddressNicknameChange, onNicknameDialogOpen, isRefreshUserAddressList, onSubmit, renderRaisedSubmitButton, renderMessage, handleRowClick, selectedKey, selectedAddress } = props
	const { nickName: selectedAddressNickname, AddressTransactions: selectedAddressTransactions } = selectedAddress
	const cyan500 = 'rgba(0,188,212,0.6)'

	return (
		<div className="border-top">
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
												<th className="mdl-data-table__cell--non-numeric">Balance</th>
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
																	const {id, address, nickName: nickname, currency, balance, updated_at} = userAddressesListItem
																	{/* const diff = moment(updated_at).fromNow()
																	debugger */}

																	return (
																		<tr key={ id } onClick={ handleRowClick.bind(this, id) }>
																			<td className="mdl-data-table__cell--non-numeric">{nickname}</td>
																			<td className="mdl-data-table__cell--non-numeric">{address}</td>
																			<td className="mdl-data-table__cell--non-numeric">
																				{balance} {currency} <br/>
																				<span className="secondary-text">{ moment(updated_at).fromNow() }</span>
																			</td>
																			<td>
																				<IconButton onClick={ onRefreshAddressClick.bind(this, id) }>
																					<ActionCached color={cyan500}/> 
																				</IconButton>

																				<IconButton onClick={ onNicknameDialogOpen.bind(this, {id, address, oldNickname: nickname, type: 'ADDRESS_NICK' }) }>
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
									<When condition={ _.isNil(selectedAddressNickname) }>
										{ 'Associated Addresses' }
									</When>
									<Otherwise>
										{'Associated Addresses of ' + selectedAddressNickname}
									</Otherwise>
								</Choose>
							</div>
							<div className="box-body">
								<p>These addresses were found in the transaction histories of the addresses you manually added.</p>
								<AssociatedAddressesView
									{...props}
									isRefreshing={ isRefreshUserAddressList }
									relatedTransactions={ selectedAddressTransactions }
									type={ 'ASSOC_ADDRESS_NICK' } /> 
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-4">
					<NewAddressForm {...props}/> 
				</div>
				
			</div>

			<NicknameDialog {...props} />
		</div>
	)
}


export default MyAddressesViewInner