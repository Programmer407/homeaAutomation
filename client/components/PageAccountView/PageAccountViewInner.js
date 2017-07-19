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

import IconButton from 'material-ui/IconButton/IconButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import ActionDelete className="action-icon" from 'material-ui/svg-icons/communication/call';
import ActionCached from 'material-ui/svg-icons/action/cached';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// import {indigo500} from 'material-ui/styles/colors';
import {grey400, grey600, darkBlack, lightBlack} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

const MyAccounts = () => (
	<article className="article">
		<h2 className="article-title">Wallets</h2>
		<div className="row">
			<div className="col-lg-8">
				<div className="box box-default table-box table-responsive mdl-shadow--2dp">
					<table className="mdl-data-table">
						<thead className="tbl-header">
							<tr>
								<th className="mdl-data-table__cell--non-numeric">Wallet</th>
								<th className="mdl-data-table__cell--non-numeric">Provider</th>
								<th>Balance</th>
								<th></th>
							</tr>
						</thead>
						<tbody className="tbl-body">
							<tr>
								<td className="mdl-data-table__cell--non-numeric">BTC Wallet</td>
								<td className="mdl-data-table__cell--non-numeric">Coinbase</td>
								<td>12.4566 BTC</td>
								<td>
									<a href="#" className="action-icon"><ActionCached color={grey400}/></a>
									<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
								</td>
							</tr>
							<tr>
								<td className="mdl-data-table__cell--non-numeric">BTC Wallet</td>
								<td className="mdl-data-table__cell--non-numeric">Coinbase</td>
								<td>174.9541 BTC</td>
								<td>
									<a href="#" className="action-icon"><ActionCached color={grey400}/></a>
									<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
								</td>
							</tr>
							<tr>
								<td className="mdl-data-table__cell--non-numeric">ETH Wallet</td>
								<td className="mdl-data-table__cell--non-numeric">Coinbase</td>
								<td>287.7412 ETH</td>
								<td>
									<a href="#" className="action-icon"><ActionCached color={grey400}/></a>
									<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
								</td>
							</tr>
							<tr>
								<td className="mdl-data-table__cell--non-numeric">DOGE Wallet</td>
								<td className="mdl-data-table__cell--non-numeric">Coinbase</td>
								<td>9.4574 DOGE</td>
								<td>
									<a href="#" className="action-icon"><ActionCached color={grey400}/></a>
									<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
								</td>
							</tr>
							<tr>
								<td className="mdl-data-table__cell--non-numeric">BTC Wallet</td>
								<td className="mdl-data-table__cell--non-numeric">Blockchain.info</td>
								<td>7.5241 BTC</td>
								<td>
									<a href="#" className="action-icon"><ActionCached color={grey400}/></a>
									<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="col-lg-4">
				<div className="box box-default">
					<div className="box-header box-header-primary">Add Account</div>
					<div className="box-body">
						<p>Connect to an online account by selecting a service provider from the dropdown.</p>
						<form className="form-inline" role="form">
							<SelectField
								className="select-field-primary"
								floatingLabelText="Select a provider">
								<MenuItem value={1} primaryText="BitGo" />
								<MenuItem value={2} primaryText="Bitstamp" />
								<MenuItem value={3} primaryText="Blockchain.info" />
								<MenuItem value={4} primaryText="CEX.IO" />
								<MenuItem value={5} primaryText="Coinbase" />
								<MenuItem value={6} primaryText="Kraken" />
								<MenuItem value={7} primaryText="Mt.Gox" />
							</SelectField>
							<RaisedButton label="Connect" primary />
						</form>
					</div>
				</div>
			</div>
		</div>

		<div className="row">
			<div className="col-lg-8">
				<div className="box box-default">
					<div className="box-header box-header-primary">Associated Addresses</div>
					<div className="box-body">
						<p>These addresses were found in the transaction histories of your connected wallets.</p>
						<div className="box box-default table-box table-responsive mdl-shadow--2dp">
							<table className="mdl-data-table">
								<thead className="tbl-header">
									<tr>
										<th className="mdl-data-table__cell--non-numeric">Nickname</th>
										<th className="mdl-data-table__cell--non-numeric">Address</th>
										<th></th>
									</tr>
								</thead>
								<tbody className="tbl-body">
									<tr>
										<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
										<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
										<td>
											<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
											<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
										</td>
									</tr>
									<tr>
										<td className="mdl-data-table__cell--non-numeric">1JeK3CgCuPHVw9S5niUj4D7HFJ5bXc1JYR</td>
										<td className="mdl-data-table__cell--non-numeric">BTC-Income</td>
										<td>
											<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
											<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
										</td>
									</tr>
									<tr>
										<td className="mdl-data-table__cell--non-numeric">3BUp6EH8Vs2BAYsPQCLX8hdo8oyFpM28R9</td>
										<td className="mdl-data-table__cell--non-numeric">ETH-Alice</td>
										<td>
											<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
											<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</article>
)

const MyAddresses = () => (
	<article className="article">
		<h2 className="article-title">Addresses</h2>
		
		<div className="row">
			<div className="col-lg-8">
				<div className="box box-default">
					<div className="box-header box-header-primary">My Addresses</div>
					<div className="box-body">
						<p>These are the addresses you added manually.</p>
						<div className="box box-default table-box table-responsive mdl-shadow--2dp">
							<table className="mdl-data-table">
								<thead className="tbl-header">
									<tr>
										<th className="mdl-data-table__cell--non-numeric">Nickname</th>
										<th className="mdl-data-table__cell--non-numeric">Address</th>
										<th></th>
									</tr>
								</thead>
								<tbody className="tbl-body">
									<tr>
										<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
										<td className="mdl-data-table__cell--non-numeric">145J2KWhnYgMpkMUGBrXfm6E9pFmrn5at3</td>
										<td>
											<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
											<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
										</td>
									</tr>
									<tr>
										<td className="mdl-data-table__cell--non-numeric">1JeK3CgCuPHVw9S5niUj4D7HFJ5bXc1JYR</td>
										<td className="mdl-data-table__cell--non-numeric">BTC-Income</td>
										<td>
											<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
											<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
										</td>
									</tr>
									<tr>
										<td className="mdl-data-table__cell--non-numeric">3BUp6EH8Vs2BAYsPQCLX8hdo8oyFpM28R9</td>
										<td className="mdl-data-table__cell--non-numeric">ETH-Alice</td>
										<td>
											<a href="#" className="action-icon"><EditorModeEdit color={grey400}/></a>
											<a href="#" className="action-icon"><ActionDelete color={grey400}/></a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="col-lg-4">
				<div className="box box-default">
					<div className="box-header box-header-primary">Add Addresses</div>
					<div className="box-body">
						<p>Enter one BTC address per line. Other addresses that are yours based on Wisdom's analysis of the blockchain will be automatically added for you.</p>
						<form className="form-inline" role="form">
							<TextField
								hintText="Enter one address per line"
								multiLine
								rows={1}
								rowsMax={10}
								fullWidth
							/>
							<RaisedButton label="Add" primary />
						</form>
					</div>
				</div>
			</div>
		</div>
	</article>
)

const PageAccountViewInner = () => {
  return (
    <section className="container-fluid chapter">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><MyAccounts /></div>
        <div key="2"><MyAddresses /></div>
      </QueueAnim>
    </section>
  )
}

export default PageAccountViewInner;
