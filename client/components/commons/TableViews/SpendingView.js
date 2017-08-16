// libs
import React from 'react'
import { CircularProgress } from 'material-ui'
import moment from 'moment'

// src
import { Pagination } from './'
import { Selection } from '../'
import { Operations } from '../../commons'

const tblCols = {
	checkbox: '',
	date: 'Date',
	source: 'Imported From',
	destination: 'Destination',
	action: 'Action',
	volume: 'Volume',
	value: 'Value',
	fee: 'Fees',
	cost: 'Cost',
	operations: ''
}

const SpendingView = (props) => {
	const { onRowHover, onRowHoverExit, hoveredRow, modifiedTrxs, isRefreshTransactionList, thisTrxType, listingParameters } = props
	const { trxType } = listingParameters
	console.log('SPENDING VIEW PROPS:', props)


	return (
		<div className="box box-default table-box table-responsive mdl-shadow--2dp">
			<table className="mdl-data-table">
				<thead className="tbl-header">
					<tr>
						<th className="mdl-data-table__cell--non-numeric">{ <Selection type={'HEADER'} {...props}/> }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.date }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.destination }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.volume }</th>
						<th>{ tblCols.value }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.action }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.source }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.operations }</th>
					</tr>
				</thead>
				<tbody className="tbl-body">
					{
						<Choose>
							<When condition={ isRefreshTransactionList || trxType !== thisTrxType }>
								<tr>
									<td colSpan="8" className="text-center">
										<CircularProgress size={30} thickness={3} />
									</td>
								</tr>
							</When>
							<Otherwise>
								<Choose>
									<When condition={ !_.isNil(modifiedTrxs) && modifiedTrxs.length > 0 }>
										{
											modifiedTrxs.map((trx, index) => {
												return (
													<tr
														key={ trx.id }
														onMouseEnter={ onRowHover }
														onMouseLeave={ onRowHoverExit }
														className="fixedHeightRow">
															<td className="mdl-data-table__cell--non-numeric">{ <Selection index={ trx.id } type={'ROW'} {...props} /> }</td>
															<td className="mdl-data-table__cell--non-numeric">{ moment(trx.transactionDate).format('ll') }</td>
															<td className="mdl-data-table__cell--non-numeric">{ !_.isNil(trx.destination) ? trx.destination : trx.associatedaddress.nickName }</td>
															<td className="mdl-data-table__cell--non-numeric">{ trx.amount } { trx.asset }</td>
															<td>{ 1700.54 }</td>
															<td className="mdl-data-table__cell--non-numeric">{ trx.transactiontype.typeName }</td>
															<Choose>
																<When condition={ trx.transactionimporttype.id === 4 || trx.transactionimporttype.id === 3 }>
																	<td className="mdl-data-table__cell--non-numeric">{ trx.transactionimporttype.importTypeName }</td>
																</When>
																<Otherwise>
																	<Choose>
																		<When condition={ trx.transactionimporttype.id === 1 }>
																			<td className="mdl-data-table__cell--non-numeric">{ trx.userwallet.walletName }</td>
																		</When>
																		<Otherwise>
																			<td className="mdl-data-table__cell--non-numeric">{ trx.useraddress.nickName }</td>
																		</Otherwise>
																	</Choose>
																</Otherwise>
															</Choose>
															<td className="mdl-data-table__cell--non-numeric text-center fixedWidthCol">{ (hoveredRow === index) ? <Operations index id={ trx.id } type={trx.transactiontype.typeName} {...props} /> : '' }</td>
													</tr>
												)
											})
										}
									</When>
									<Otherwise>
										<tr>
											<td colSpan="8" className="text-center">
												No transactions found.
											</td>
										</tr>
									</Otherwise>
								</Choose>
							</Otherwise>
						</Choose>
					}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="10">
							<Pagination {...props} />
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}

export default SpendingView
