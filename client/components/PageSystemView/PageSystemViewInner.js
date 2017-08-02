// libs
import React from "react"
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title"
import styles from "./PageSystemViewInner.scss"
import { Link } from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionHelp from 'material-ui/svg-icons/action/help'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'

// src
import { TradingView, IncomeView, SpendingView }  from './TableViews'
import { InfoDialog } from '../commons/CommonUI'

const PageSystemViewInner = props => {
	const { isHelpDialogOpen, isFormDialogOpen, onHelpDialogToggle, onFormDialogToggle } = props
	const cyan500 = 'rgba(0,188,212,0.8)'

	return (
		<div>
			<DocumentTitle title="Transactions" />
				<section className="container-fluid">
					{/*<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="javascript:;">Page</a></li>
						<li className="breadcrumb-item active">Blank</li>
					</ul>*/}
					<QueueAnim type="bottom" className="ui-animate">
						<div key="1" className="container-fluid">
							<article className="article">
								<div className="row">
									<div className="col-md-6">
										<h2 className="article-title article-title-primary">Transactions</h2>
									</div>

									<div className="col-md-6 right-align">
									 	<FlatButton label="Add Transaction" onClick={ onFormDialogToggle.bind(this) } primary/> 
										 <IconButton className="icon-btn" onClick={ onHelpDialogToggle.bind(this) }>
											<ActionHelp color={cyan500}/> 
										</IconButton> 
									</div>
								</div>
								<section className="box box-default">
									<Tabs>
										<Tab label="Trading" >
											<TradingView />
										</Tab>
										
										<Tab label="Income" >
											<IncomeView />	
										</Tab>
										
										<Tab label="Spending">
											<SpendingView />
										</Tab>
									</Tabs>
								</section>
							</article>
							<InfoDialog 
								title={ 'Help' }
								open={ isHelpDialogOpen }
								onDialogClose={ onHelpDialogToggle } />
							
							<InfoDialog 
								title={ 'New Form' }
								open={ isFormDialogOpen }
								onDialogClose={ onFormDialogToggle } />
						</div>
					</QueueAnim>
				</section>
		</div>
	)
}

export default PageSystemViewInner;
