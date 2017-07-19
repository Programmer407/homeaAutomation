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
// import ActionDelete from 'material-ui/svg-icons/communication/call';
import ActionCached from 'material-ui/svg-icons/action/cached';
import ActionDelete from 'material-ui/svg-icons/action/delete';
// import {indigo500} from 'material-ui/styles/colors';
import {grey400, grey600, darkBlack, lightBlack} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

const MyAccounts = () => (
	<article className="article">
		<h2 className="article-title">Wallets</h2>
		<div className="row">
			<div className="col-md-8">
				<section className="box box-default">
					<div className="box-body">
						<List>
							<ListItem
								primaryText={"BTC Wallet / 124.4565 BTC"}
								secondaryText={
									<p>
										<span style={{color: darkBlack}}>57661c8804708820380006eb</span><br />
										Coinbase
									</p>
								}
								secondaryTextLines={2}>
								<ActionCached style={{float:'right', marginLeft: '20'}} color={grey600} />
								<ActionDelete style={{float:'right', marginLeft: '20'}} color={grey600} /> 
							</ListItem>

							<ListItem
								primaryText={"BTC Wallet / 85.9945 BTC"}
								secondaryText={
									<p>
										<span style={{color: darkBlack}}>5946de47aef8bb0e497b9bf3</span><br />
										Coinbase
									</p>
								}
								secondaryTextLines={2}>
								<ActionCached style={{float:'right', marginLeft: '20'}} color={grey600} />
								<ActionDelete style={{float:'right', marginLeft: '20'}} color={grey600} /> 
							</ListItem>
							
							<ListItem
								primaryText={"BTC Wallet / 15.6785 BTC"}
								secondaryText={
									<p>
										<span style={{color: darkBlack}}>595cf8722fbc10027244de23</span><br />
										Blockchain.info
									</p>
								}
								secondaryTextLines={2}>
								<ActionCached style={{float:'right', marginLeft: '20'}} color={grey600} />
								<ActionDelete style={{float:'right', marginLeft: '20'}} color={grey600} /> 
							</ListItem>
							
							<ListItem
								primaryText={"ETH Wallet / 298.4142 BTC"}
								secondaryText={
									<p>
										<span style={{color: darkBlack}}>595cf91a8bfa3100bdc762c2</span><br />
										Blockchain.info
									</p>
								}
								secondaryTextLines={2}>
								<ActionCached style={{float:'right', marginLeft: '20'}} color={grey600} />
								<ActionDelete style={{float:'right', marginLeft: '20'}} color={grey600} /> 
							</ListItem>
						</List>
					</div>
				</section>
			</div>
			<div className="col-md-4">
				<section className="box box-default">
					<div className="box-header">Coinbase</div>
					<div className="box-body">
						<List>
							<ListItem
								//leftIcon={<ActionDelete color={indigo500} />}
								//rightIcon={<ActionDelete />}
								primaryText={"BTC Wallet / 124.4565 BTC"}
								secondaryText={
									<p>
										<span style={{color: darkBlack}}>57661c8804708820380006eb</span><br />
										Coinbase
									</p>
								}
								secondaryTextLines={2}>
								<ActionCached style={{float:'right', marginLeft: '20'}} color={grey600} />
								<ActionDelete style={{float:'right', marginLeft: '20'}} color={grey600} /> 
							</ListItem>
							<ListItem
								//leftIcon={<ActionDelete color={indigo500} />}
								//rightIcon={<ActionDelete />}
								primaryText={"BTC Wallet / 124.4565 BTC"}
								secondaryText={
									<p>
										<span style={{color: darkBlack}}>57661c8804708820380006eb</span><br />
										Coinbase
									</p>
								}
								secondaryTextLines={2}>
								<ActionCached style={{float:'right', marginLeft: '20'}} color={grey600} />
								<ActionDelete style={{float:'right', marginLeft: '20'}} color={grey600} /> 
							</ListItem>
						</List>
					</div>

					<div className="box-header">Blockchain.info</div>
					<div className="box-body">
						<List>
							<ListItem
								//leftIcon={<ActionDelete color={indigo500} />}
								rightIcon={<ActionCached />}
								primaryText="(650) 555 - 1234"
								secondaryText="Mobile"
							/>
							<ListItem
								//insetChildren
								rightIcon={<ActionCached />}
								primaryText="(323) 555 - 6789"
								secondaryText="Work"
							/>
						</List>
					</div>
				</section>
			</div>
		</div>
	</article>
)

const MyAddresses = () => (
	<article className="article">
		<h2 className="article-title">Addresses</h2>
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
