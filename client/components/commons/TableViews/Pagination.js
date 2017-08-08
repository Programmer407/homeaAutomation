import React from 'react'
import {TableFooter, TableRow, TableRowColumn, FontIcon, IconButton} from 'material-ui'

const styles = {
  footerContent: {
    float: 'right'
	},
	
  footerText: {
    float: 'right',
    paddingTop: 16,
		height: 16,
		color: '#000'
  }
}

const Pagination = props => {
	const { pageOffset, pageLimit, totalRecords, onPageClick } = props

	return (
		<div className="paginationNav">
			<span className="pageCountText">
				{Math.min((pageOffset + 1), totalRecords) + '-' + Math.min((pageOffset + pageLimit), totalRecords) + ' of ' + totalRecords}
			</span>
			<nav>
				<ul className="pagination" >
					<li class="page-item">
						<a class="page-link " href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li className="page-item"><a className="page-link" href="#">1</a></li>
					<li className="page-item active">
						<a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
					</li>
					<li className="page-item"><a className="page-link" href="#">3</a></li>
					<li class="page-item">
						<a class="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Pagination


// import React from 'react';
// import {TableFooter as TF, TableRow, TableRowColumn, FontIcon, IconButton} from 'material-ui';

// const styles = {
//   footerContent: {
//     float: 'right'
//   },
//   footerText: {
//     float: 'right',
//     paddingTop: 16,
//     height: 16
//   }
// };

// const TableFooter = React.createClass({

//   propTypes: {
//     offset: React.PropTypes.number.isRequired, // current offset
//     total: React.PropTypes.number.isRequired, // total number of rows
//     limit: React.PropTypes.number.isRequired, // num of rows in each page
//     onPageClick: React.PropTypes.func // what to do after clicking page number
//   },

//   render() {
//     let offset = this.props.offset;
//     let total = this.props.total;
//     let limit = this.props.limit;
//     return (
//       <TF adjustForCheckbox={false}>
//         <TableRow>
//           <TableRowColumn style={styles.footerContent}>
//             <IconButton disabled={offset === 0} onClick={this.props.onPageClick.bind(null, offset - limit)}>
//               <FontIcon className="material-icons">chevron_left</FontIcon>
//             </IconButton>
//             <IconButton disabled={offset + limit >= total} onClick={this.props.onPageClick.bind(null, offset + limit)}>
//               <FontIcon className="material-icons">chevron_right</FontIcon>
//             </IconButton>
//           </TableRowColumn>
//           <TableRowColumn style={styles.footerText}>
//             {Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' of ' + total}
//           </TableRowColumn>
//         </TableRow>
//       </TF>
//     );
//   }

// });

// export default TableFooter;