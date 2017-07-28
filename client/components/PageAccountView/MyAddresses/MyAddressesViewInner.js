import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import ActionCached from 'material-ui/svg-icons/action/cached'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import NicknameDialog from '../commons/DialogModalView'
import { Field } from 'redux-form'
import { renderTextArea } from '../../../utils'
import { pullRight } from 'react-bootstrap'
import IconButton from 'material-ui/IconButton'


const MyAddressesViewInner = (props) => {
	const { userAddressesList, onAddAddressesClick, newAddressesValue, updateAddressesValue, onRefreshAddressClick, onDeleteAddressClick, handleModalOnSubmit, triggerDialogModal, isRefreshUserAddressList, onSubmit, renderRaisedSubmitButton, renderMessage } = props
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
																	const {id, address, nickName, currency, balance} = userAddressesListItem

																	return (
																		<tr key={ id }>
																			<td className="mdl-data-table__cell--non-numeric">{nickName}</td>
																			<td className="mdl-data-table__cell--non-numeric">{address}</td>
																			<td>{balance} {currency}</td>
																			<td>
																				<IconButton onClick={ onRefreshAddressClick.bind(this, id) }>
																					<ActionCached color={cyan500}/> 
																				</IconButton>

																				<IconButton onClick={ triggerDialogModal.bind(this, {id, address, oldNickname: nickName }) }>
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
							<div className="box-header box-header-primary">{'Associated Addresses'}</div>
							<div className="box-body">
								<p>These addresses were found in the transaction histories of the addresses you added.</p>
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
											{/*<Choose>
												<When condition={ this.state.selectedWallet.Transactions &&  this.state.selectedWallet.Transactions.length > 0}>
													{this.state.selectedWallet.Transactions.map(transaction =>
														<tr key={transaction.id}>
															<td className="mdl-data-table__cell--non-numeric">Sample Nickname</td>
															<td className="mdl-data-table__cell--non-numeric">{transaction.destination}</td>
															<td>{transaction.amount} {transaction.asset}</td>
															<td>
																<a href="#" className="action-icon"><ActionCached /></a>
																<a href="#" className="action-icon"><ActionDelete/></a>
															</td>
														</tr>
													)}
												</When>
												<Otherwise>
													<tr>
														<td colSpan="4" className="text-center">No associated addresses found.</td>
													</tr>
												</Otherwise>
											</Choose>*/}
											<tr>
												<td className="mdl-data-table__cell--non-numeric">Some BTC</td>
												<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
												<td>12.4542 BTC</td>
												<td>
													<a href="#" className="action-icon"><EditorModeEdit /></a>
												</td>
											</tr>
											<tr>
												<td className="mdl-data-table__cell--non-numeric">BTC-Income</td>
												<td className="mdl-data-table__cell--non-numeric">1JeK3CgCuPHVw9S5niUj4D7HFJ5bXc1JYR</td>
												<td>128.1024 BTC</td>
												<td>
													<a href="#" className="action-icon"><EditorModeEdit /></a>
												</td>
											</tr>
											<tr>
												<td className="mdl-data-table__cell--non-numeric">ETH-Alice</td>
												<td className="mdl-data-table__cell--non-numeric">3BUp6EH8Vs2BAYsPQCLX8hdo8oyFpM28R9</td>
												<td>46.2398 ETH</td>
												<td>
													<a href="#" className="action-icon"><EditorModeEdit /></a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
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
								<Field autoFocus="false" name="newAddresses" label="Enter one address per line" rows={1} rowsMax={10} component={renderTextArea} fullWidth multiLine></Field>
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