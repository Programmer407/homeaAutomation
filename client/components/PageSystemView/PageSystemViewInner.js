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
import { TabView, InfoDialog, FormDialog } from '../commons'

const PageSystemViewInner = props => {
	const { isHelpDialogOpen, isFormDialogOpen, onHelpDialogToggle, onFormDialogToggle } = props
	const cyan500 = 'rgba(0,188,212,0.8)';

	return (
		<div>
			<DocumentTitle title="Transactions" />
				<section className="container-fluid">
					<QueueAnim type="bottom" className="ui-animate">
						<div key="1">
							<article className="article">
								
								<div className="row">
									<div className="col-xs-10">
										<h2 className="article-title article-title-primary">Transactions</h2>
									</div>

									<div className="col-xs-2 text-right" style={{ alignSelf: 'center' }}>
										 <IconButton style={{ top: '12px'}} onClick={ onHelpDialogToggle.bind(this) }>
											<ActionHelp color={cyan500}/> 
										</IconButton> 
									</div>
								</div>

								<section className="box box-transparent">
									<TabView {...props} />
								</section>

							</article>

							<InfoDialog 
								title={ 'Help' }
								open={ isHelpDialogOpen }
								onDialogClose={ onHelpDialogToggle } />
							
							<FormDialog 
								title={ 'Add Transaction' }
								open={ isFormDialogOpen }
								onDialogClose={ onFormDialogToggle } />
						</div>
					</QueueAnim>
				</section>
		</div>
	)
}

export default PageSystemViewInner;
