// libs
import React from 'react'
import moment from 'moment'
import { Field } from 'redux-form'
import { renderTextArea } from '../../../utils'
import { CircularProgress, IconButton, RefreshIndicator } from 'material-ui'

// src
import { NewAddressForm, NicknameDialog, AssociatedAddressesView } from '../../commons'

// assets
import ActionCached from 'material-ui/svg-icons/action/cached'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { cyan300 } from 'material-ui/styles/colors'

const MyAddressesViewInner = (props) => {
	const { selectedKey, handleRowClick, selectedAddress, userAddressesList, onDeleteAddressClick, onNicknameDialogOpen, onRefreshAddressClick, isRefreshUserAddressList, isDeleteUserAddressList, isUpdateUserAddressList, actionOnThisAddress } = props
	const { nickName: selectedAddressNickname, AddressTransactions: selectedAddressTransactions } = selectedAddress

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
											{/* <Choose>
												<When condition={ isRefreshUserAddressList }>
													<tr>
														<td colSpan="4" className="text-center">
															<CircularProgress size={30} thickness={3} />
														</td>
													</tr>
												</When>
												<Otherwise>
												</Otherwise>
											</Choose> */}
											<Choose>
												<When condition={ userAddressesList && userAddressesList.length > 0 }>
													{
														userAddressesList.map(userAddressesListItem => {
															const {id, address, nickName: nickname, currency, balance, updated_at} = userAddressesListItem

															return (
																<tr key={ id } onClick={ handleRowClick.bind(this, id) }>
																	<td className="mdl-data-table__cell--non-numeric">{nickname}</td>
																	<td className="mdl-data-table__cell--non-numeric">{address}</td>
																	<td className="mdl-data-table__cell--non-numeric">
																		{balance} {currency} <br/>
																		<span className="secondary-text">{ moment(updated_at).fromNow() }</span>
																	</td>
																	<td>
																		<IconButton 
																			onClick={ onRefreshAddressClick.bind(this, id) } 
																			disabled={ isRefreshUserAddressList || isUpdateUserAddressList || isDeleteUserAddressList }>
																			{
																				(isRefreshUserAddressList && actionOnThisAddress == id) ? <RefreshIndicator status="loading" top={12} left={12} size={25}/> : <ActionCached color={cyan300}/>
																			}
																		</IconButton>

																		<IconButton 
																			onClick={ onNicknameDialogOpen.bind(this, {id, address, oldNickname: nickname, type: 'ADDRESS_NICK' }) } 
																			disabled={ isRefreshUserAddressList || isUpdateUserAddressList || isDeleteUserAddressList }>
																			{
																				(isUpdateUserAddressList && actionOnThisAddress == id) ? <RefreshIndicator status="loading" top={12} left={12} size={25}/> : <EditorModeEdit color={cyan300}/> 
																			}
																		</IconButton>
																		
																		<IconButton 
																			onClick={ onDeleteAddressClick.bind(this, id) } 
																			disabled={ isRefreshUserAddressList || isUpdateUserAddressList || isDeleteUserAddressList }>
																			{
																				(isDeleteUserAddressList && actionOnThisAddress == id) ? <RefreshIndicator status="loading" top={12} left={12} size={25}/> : <ActionDelete color={cyan300}/> 
																			}
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
									isDeleting={ isDeleteUserAddressList }
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