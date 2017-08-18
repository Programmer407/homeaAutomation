// libs
import React from 'react'
import { CircularProgress, RefreshIndicator } from 'material-ui'
import moment from 'moment'

// src
import { Pagination } from './'
import { Selection } from '../'
import { Operations } from '../../commons'

// assets
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less'

const tblCols = {
	date: 'Date',
	destination: 'Destination',
	volume: 'Volume',
	value: 'Value',
	action: 'Action',
	source: 'Imported From'
}

const IncomeView = (props) => {
	const { onRowHover, onRowHoverExit, hoveredRow, modifiedTrxs, isRefreshTransactionList, thisTrxType, listingParameters, onColHeaderClick, orderBy, trxId, deletingAll } = props
	const { trxType, orderWay } = listingParameters

	return (
		<div className="box box-default table-box table-responsive mdl-shadow--2dp">
			<table className="mdl-data-table">
				<thead className="tbl-header">
					<tr>
						<th className="mdl-data-table__cell--non-numeric">{ <Selection type={'HEADER'} {...props}/> }</th>
						{
							Object.keys(tblCols).map(key => 
								<th 
									key={ key } 
									style={{ cursor: 'pointer' }} 
									className="mdl-data-table__cell--non-numeric" 
									onClick={ () => onColHeaderClick(key) }>
										{ tblCols[key] } 	
										<Choose>
											<When condition={ key === orderBy && orderWay === 'DESC' }>
												<NavigationExpandMore className="carretIcon" style={{ position: 'absolute',  top: 20, marginLeft: 5, width: 16, height: 16 }}/>
											</When>
												
											<When condition={ key === orderBy && orderWay === 'ASC' }>
												<NavigationExpandLess className="carretIcon" style={{ position: 'absolute',  top: 20, marginLeft: 5, width: 16, height: 16 }}/>
											</When>
										</Choose>
								</th>
							)
						}
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.operations }</th>
					</tr>
				</thead>
				<tbody className="tbl-body">
					{
						<Choose>
							<When condition={ isRefreshTransactionList ||  deletingAll || trxType !== thisTrxType }>
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
															<td className="mdl-data-table__cell--non-numeric">
																{ <Selection index={ trx.id } type={'ROW'} {...props} /> }
															</td>

															<td className="mdl-data-table__cell--non-numeric">
																{ moment(trx.transactionDate).format('ll') }
															</td>
															
															<td className="mdl-data-table__cell--non-numeric">
																{ !_.isNil(trx.destination) ? trx.destination : trx.associatedaddress.nickName }
															</td>
															
															<td className="mdl-data-table__cell--non-numeric">
																{ trx.amount } { trx.asset }
															</td>
															
															<td className="mdl-data-table__cell--non-numeric">
																{ 1700.54 }
															</td>
															
															<td className="mdl-data-table__cell--non-numeric">
																{ trx.transactiontype.typeName }
															</td>

															<Choose>
																<When condition={ trx.transactionimporttype.id === 4 || trx.transactionimporttype.id === 3 }>
																	<td className="mdl-data-table__cell--non-numeric">
																		{ trx.transactionimporttype.importTypeName }
																	</td>
																</When>
																<Otherwise>
																	<Choose>
																		<When condition={ trx.transactionimporttype.id === 1 }>
																			<td className="mdl-data-table__cell--non-numeric">
																				{ trx.userwallet.walletName }
																			</td>
																		</When>
																		
																		<Otherwise>
																			<td className="mdl-data-table__cell--non-numeric">
																				{ trx.useraddress.nickName }
																			</td>
																		</Otherwise>
																	</Choose>
																</Otherwise>
															</Choose>
															
														<td className="mdl-data-table__cell--non-numeric text-center fixedWidthCol">
															{
																((hoveredRow === index) || (trxId === trx.id))
																&& <Operations index id={ trx.id } type={ trx.transactiontype.typeName } hovered={ hoveredRow === index } {...props} /> 
															}
														</td>
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

export default IncomeView
