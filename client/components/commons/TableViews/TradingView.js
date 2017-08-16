// libs
import React from 'react'
import { IconButton, Checkbox, FlatButton, RaisedButton, FontIcon } from 'material-ui'

// src
import { Pagination } from './'
import { Selection } from '../'

// assets
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { cyan200, cyan500 } from 'material-ui/styles/colors';

const tblCols = {
  checkbox: '',
  date: 'Date',
  source: 'Source',
  action: 'Action',
  volume: 'Volume',
  price: 'Price',
  fee: 'Fees',
  cost: 'Cost',
  operations: ''
}

const Operations = props => {
  return (
	  <span>
		  <IconButton className="actionIcon">
			  <EditorModeEdit color={cyan200} hoverColor={cyan500}/>
		  </IconButton>

		  <IconButton className="actionIcon">
			  <ActionDelete color={cyan200} hoverColor={cyan500}/>
		  </IconButton>
	  </span>
  );
}

const TradingView = (props) => {
  const { tblData, onRowHover, onRowHoverExit, hoveredRow } = props;

  return (
		<div className="box box-default table-box table-responsive mdl-shadow--2dp">
			<table className="mdl-data-table">
				<thead className="tbl-header">
					<tr>
						<th className="mdl-data-table__cell--non-numeric">{ <Selection type={'HEADER'} {...props}/> }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.date }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.source }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.action }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.volume } { tblCols.coin }</th>
						<th>{ tblCols.price }</th>
						<th>{ tblCols.fee }</th>
						<th>{ tblCols.cost }</th>
						<th className="mdl-data-table__cell--non-numeric">{ tblCols.operations }</th>
					</tr>
				</thead>
				<tbody className="tbl-body">
					{
						/* tblData.map((rowData, index) => {
							return (
								<tr 
									key={ rowData.id }
									onMouseEnter={ onRowHover }
									onMouseLeave={ onRowHoverExit }
									className="fixedHeightRow">
										<td className="mdl-data-table__cell--non-numeric">{ <Selection index={ rowData.id } type={'ROW'} {...props} /> }</td>
										<td className="mdl-data-table__cell--non-numeric">{ rowData.date }</td>
										<td className="mdl-data-table__cell--non-numeric">{ rowData.source }</td>
										<td className="mdl-data-table__cell--non-numeric">{ rowData.action }</td>
										<td className="mdl-data-table__cell--non-numeric">{ rowData.volume } { rowData.coin }</td>
										<td>{ rowData.price }</td>
										<td>{ rowData.fee }</td>
										<td>{ rowData.cost }</td>
										<td className="mdl-data-table__cell--non-numeric text-center fixedWidthCol">{ (hoveredRow === index) ? <Operations /> : '' }</td>
								</tr>
							)
						}) */
						<tr>
							<td colSpan="8" className="text-center">
								No transactions found.
							</td>
						</tr>
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

export default TradingView
