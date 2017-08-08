// libs
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter, FontIcon} from 'material-ui'
import indexOf from 'lodash/indexOf'

// src 
import Pagination from'./Pagination'

const cyan500 = 'rgba(0,188,212,0.9)';

const styles = {
	root: {
		padding: '20px 0px'
	},
	
	tblHdr: {
		borderBottom: '1px solid #000',
		backgroundColor: '#E6E6E6'	
	},
	
	tblHdrCol: {
		color: '#555',
		fontSize: '16px',
		fontWeight: '500'
	},
	
	tblRowCol: {
		fontSize: '14px',
		height: '50px',
	},

	LastTblRowCol: {
		fontSize: '14px',
		height: '50px',
		
	},

	footerContent: {
    float: 'right'
	},
	
  footerText: {
    float: 'right',
    paddingTop: 16,
  }
	
}

const tblCols = {
	date: 'Date',
	source: 'Source',
	action: 'Action',
	coin: 'Coin',
	volume: 'Volume',
	price: 'Price',
	fee: 'Fees',
	cost: 'Cost',
	operations: ''
}

const Operations = (props) => {
	return (
		<span>
			<IconButton>
				<EditorModeEdit color={cyan500}/>
			</IconButton>

			<IconButton>
				<ActionDelete color={cyan500}/> 
			</IconButton>
		</span>
	);
}

const TradingView = (props) => {
	const { onRowHover, onRowHoverExit, onRowSelection, onCellClick, hoveredRow, selectedRows, tblData, pageOffset, pageLimit, totalRecords, onPageClick } = props;
	
	return (
		<div style={ styles.root }>
		<Table selectable multiSelectable onRowHover={ onRowHover } onRowHoverExit={ onRowHoverExit } onRowSelection={ onRowSelection } onCellClick={ onCellClick }>
			<TableHeader displaySelectAll enableSelectAll style={ styles.tblHdr }>
				<TableRow>
				{
					Object.keys(tblCols).map(key => 
						<TableHeaderColumn key={ tblCols[key] } style={ styles.tblHdrCol }>{ tblCols[key] }</TableHeaderColumn>
					) 
				}
				</TableRow>
			</TableHeader>
			
			<TableBody showRowHover deselectOnClickaway={ false }>
			{
				tblData.map( (data, index) => {
					return (
						<TableRow selected={ data.selected }>
							<TableRowColumn style={ styles.tblRowCol }>{data.date}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.source}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.action}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.coin}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.volume}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.price}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.fee}</TableRowColumn>
							<TableRowColumn style={ styles.tblRowCol }>{data.cost}</TableRowColumn>
							<TableRowColumn style={ styles.lastTblRowCol }>{ (index === hoveredRow) ? <Operations /> : '' }</TableRowColumn>
						</TableRow>
					)
				}) 
			}
		</TableBody>
		<TableFooter adjustForCheckbox={false}>
			<Pagination {...props}/>
		</TableFooter>
	</Table>
	</div>
)
}

export default TradingView