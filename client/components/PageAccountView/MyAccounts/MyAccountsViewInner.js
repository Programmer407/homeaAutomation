// libs
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress'
import ActionCached from 'material-ui/svg-icons/action/cached'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton'
import moment from 'moment'

// src
import AssociatedAddressesView from '../../commons/AssociatedAddressesView'
import { ProviderForm } from '../../commons/Forms'

const MyAccountsViewInner = (props) => {
	const { onDeleteClick, onRefreshClick, userProviderList, isRefreshUserWalletList, handleRowClick, selectedWallet } = props
	const { Transactions: selectedWalletTransactions, walletName: selectedWalletName } = selectedWallet
	const cyan500 = 'rgba(0, 188, 212, 0.6)'
		
	return (
		<div>
			<h2 className="article-title">Wallets</h2>
			<div className="row">
				<div className="col-lg-8 ">
					<div className="box box-default">
						<div>
							<div className="box-header box-header-primary">Wallets & Exchanges</div>
							<div className="box-body">
								<p>Your connected wallet and exchange accounts are listed here.</p>
								<div className="box box-default table-box table-responsive mdl-shadow--2dp">
									<table className="mdl-data-table">
										<thead className="tbl-header">
											<tr>
												<th className="mdl-data-table__cell--non-numeric">Wallet</th>
												<th className="mdl-data-table__cell--non-numeric">Provider</th>
												<th className="mdl-data-table__cell--non-numeric">Balance</th>
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
														<When condition={ userProviderList && userProviderList[0] && userProviderList[0].UserWallets.length > 0 }>
															{
																userProviderList.map(userProviderListItem =>
																userProviderListItem.UserWallets.map(userWallet => {
																	const { id, walletId, walletName, balance, currency, updatedWalletAt } = userWallet
																	const { id: userProviderId, provider } = userProviderListItem

																	return(
																		<tr key={ id } onClick={ handleRowClick.bind(this, id) }>
																			<td className="mdl-data-table__cell--non-numeric">
																				{ walletName }<br/>
																				<span className="secondary-text">{ walletId }</span>
																			</td>
																			<td className="mdl-data-table__cell--non-numeric">{ provider.displayName }</td>
																			<td className="mdl-data-table__cell--non-numeric">
																				{ balance } { currency } <br/>
																				<span className="secondary-text">{ moment(updatedWalletAt).fromNow() }</span>
																			</td>
																			<td>
																					<IconButton onClick={ onRefreshClick.bind(this, userProviderId) }>
																						<ActionCached color={cyan500}/> 
																					</IconButton>
																					
																					<IconButton onClick={ onDeleteClick.bind(this, id) }>
																						<ActionDelete color={cyan500}/> 
																					</IconButton>
																				</td>
																		</tr>
																	)}
																)
															)}
														</When>
														<Otherwise>
															<tr>
																<td colSpan="4" className="text-center">Wallets from connected accounts will show up here.</td>
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
									<When condition={ _.isNil(selectedWalletName) }>
										{ 'Associated Addresses' }
									</When>
									<Otherwise>
										{ 'Associated Addresses of ' + selectedWalletName }
									</Otherwise>
								</Choose>
							</div>
							<div className="box-body">
								<p>These addresses were found in the transaction histories of your connected wallets.</p>
								<AssociatedAddressesView
									{...props}
									isRefreshing={ isRefreshUserWalletList }
									relatedTransactions={ selectedWalletTransactions }
									type={ 'WALLET_ASSOC_ADDRESS_NICK' } />
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="box box-default">
						<div className="box-header box-header-primary">Add Account</div>
						<div className="box-body">
							<p>Connect to an online account by selecting a service provider from the dropdown.</p>
							<ProviderForm {...props} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyAccountsViewInner

{/* <div className="form-group">
	<SelectField
		fullWidth
		className="primary-select-field"
		onChange={ onSelectionChange }
		value={ selectedProvider }>
		<MenuItem value={0} primaryText="Select a provider..." />
		{providerList.map(provider => 
			<MenuItem key={ provider.id } value={ provider.id } primaryText={ provider.displayName } />
		)}
	</SelectField>
</div>
<RaisedButton label="Connect" onClick={ onSelectionSubmit } primary />
<div className="divider" /> */}