// libs
import React from "react";
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title";
import styles from "./PageAccountViewInner.scss";
import { Link } from "react-router-dom";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const mWidthStyle = {
  minWidth: '135px'
};


const PageAccountViewInner = props => {
  return (
    <section className="container-fluid">
			<QueueAnim type="bottom" className="ui-animate">
				<div key="1">
					<article className="article">
						<div className="box">
							<div className="box-header title-primary">My Accounts</div>
							<div className="box-body">
								<div className="row">
									<div className="col-xl-8">
										<div className="box box-default table-box table-responsive mdl-shadow--2dp">
											<table className="mdl-data-table">
												<thead className="tbl-header-primary">
													<tr>
														<th className="mdl-data-table__cell--non-numeric" colSpan="6">
															<span className="tbl-heading">Coinbase</span>
															<span className="float-right-primary action-icon icon-color-light"><i className="material-icons">delete</i></span>
															<span className="float-right-primary action-icon icon-color-light"><i className="material-icons">cached</i></span>
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">576615bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">34.5864 BTC</span>
															<h6 className="text-muted">3 weeks ago</h6>
														</td>
													</tr>

													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">9874125bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">4.5864 BTC</span>
															<h6 className="text-muted">1 year ago</h6>
														</td>
													</tr>

													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">576615bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">10.1634 BTC</span>
															<h6 className="text-muted">1 month ago</h6>
														</td>
													</tr>

													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">576615bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">34.5864 BTC</span>
															<h6 className="text-muted">3 weeks ago</h6>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="box box-default table-box table-responsive mdl-shadow--2dp">
											<table className="mdl-data-table">
												<thead className="tbl-header-primary">
													<tr>
														<th className="mdl-data-table__cell--non-numeric" colSpan="6">
															<span className="tbl-heading">Blockchain.info</span>
															<span className="float-right-primary action-icon icon-color-light"><i className="material-icons">delete</i></span>
															<span className="float-right-primary action-icon icon-color-light"><i className="material-icons">cached</i></span>
														</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">576615bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">34.5864 BTC</span>
															<h6 className="text-muted">3 weeks ago</h6>
														</td>
													</tr>

													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">9874125bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">4.5864 BTC</span>
															<h6 className="text-muted">1 year ago</h6>
														</td>
													</tr>

													<tr>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">BTC Wallet</span>
															<h6 className="text-muted">576615bb293a795dfc00042f</h6>
														</td>
														<td className="mdl-data-table__cell--non-numeric">
															<span className="row-text">10.1634 BTC</span>
															<h6 className="text-muted">1 month ago</h6>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="box box-transparent">
											<div className="box-header sub-section-header">
												<span className="action-header float-left-primary">Associated Addresses</span>
												<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
												<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
											</div>
											<div className="box-header">
												<p>These addresses were found in the transactions imported from you wallets.</p>
											</div>
											<div className="box box-default table-box table-responsive mdl-shadow--2dp">
												<table className="mdl-data-table">
													<tbody>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
															</td>
														</tr>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>

									<div className="col-xl-4">
										<div className="box box-transparent">
											<div className="box-header action-header">Add Account</div>
											<div className="box-body">
												<p>You will need to export trade data from each exchange and import them into this page using dropdown below. If coins were sold using a different exchange or given any away, they will need to be entered manually.</p>
												<div className="row">
													<div className="col-md-9">
														<SelectField className="select-item-primary float-left-primary">
															<MenuItem value={1} label="Bitfinex" primaryText="Bitfinex" />
															<MenuItem value={2} label="BitPay" primaryText="BitPay" />
															<MenuItem value={3} label="Blockchain.info" primaryText="Blockchain.info" />
															<MenuItem value={4} label="CEX.IO" primaryText="CEX.IO" />
															<MenuItem value={5} label="Coinbase" primaryText="Coinbase" />
															<MenuItem value={6} label="Core Wallet" primaryText="Core Wallet" />
															<MenuItem value={7} label="Kraken" primaryText="Kraken" />
															<MenuItem value={8} label="Mt.Gox" primaryText="Mt.Gox" />
														</SelectField>	
													</div>
	
													<div className="col-md-3">
														<RaisedButton className="float-left-primary submit-btn-primary" label="Connect" primary />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>

						<div className="box">
							<div className="box-header title-primary">My Addresses</div>
							<div className="box-body">
								<div className="row">
									<div className="col-xl-8">
										<div className="box box-transparent">
											{/*<div className="box-header sub-section-header">
												<span className="action-header float-left-primary">Associated Addresses</span>
												<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
												<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
											</div>
											<div className="box-header">
												<p>These addresses were found in the transactions imported from you wallets.</p>
											</div>*/}
											<div className="box box-default table-box table-responsive mdl-shadow--2dp">
												<table className="mdl-data-table">
													<tbody>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
															</td>
														</tr>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
															</td>
														</tr>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
															</td>
														</tr>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
															</td>
														</tr>
														<tr>
															<td className="mdl-data-table__cell--non-numeric" colSpan="6">
																<span className="float-left-primary">
																	<span className="row-text">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</span>
																	<h6 className="text-muted">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</h6>
																</span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">delete</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">edit</i></span>
																<span className="float-right-primary action-icon icon-color-dark"><i className="material-icons">cached</i></span>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>

									<div className="col-xl-4">
										<div className="box box-transparent">
											<div className="box-header action-header">Add BTC Addresses</div>
											<div className="box-body">
												<div className="row">
													<div className="col-md-9">
														<TextField
															floatingLabelText="Enter one address per line"
															multiLine
															rows={1}
															className="float-left-primary text-area-primary"
														/>
													</div>
	
													<div className="col-md-3">
														<RaisedButton className="float-left-primary submit-btn-primary" label="Add" primary />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</article>
				</div>
			</QueueAnim>
		</section>
  );
}

export default PageAccountViewInner
