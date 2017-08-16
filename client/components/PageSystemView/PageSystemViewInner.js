// libs
import React from "react"
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title"

// src
import styles from "./PageSystemViewInner.scss"
import { TabView, InfoDialog, FormDialog, FilterToolbar, UploadDialog, ActionTypeDialog } from '../commons'

// assets
import ActionHelp from 'material-ui/svg-icons/action/help'
import { grey600 } from 'material-ui/styles/colors'

const PageSystemViewInner = props => {
	const { isHelpDialogOpen, isFormDialogOpen, onHelpDialogToggle, onFormDialogOpen, isUploadDialogOpen, onUploadDialogToggle, isActionTypeDialogOpen, onActionTypeDialogToggle, tblData, trxId } = props

	return (
		<div>
			<DocumentTitle title="Transactions" />
				<section className="container-fluid">
					<QueueAnim type="bottom" className="ui-animate">
						<div key="1">
							<article className="article">
								<h2 className="article-title article-title-primary">Transactions <ActionHelp color={ grey600 } cursor="pointer" onClick={ onHelpDialogToggle.bind(this) } /></h2>
								{/* <ActionHelp color={ grey600 } onClick={ onHelpDialogToggle.bind(this) } /> */}
								
								<FilterToolbar data={ props.tblData } {...props}/>
								<br />

								<section className="box box-transparent">
									<TabView data={ tblData } {...props} />
								</section>

							</article>

							<InfoDialog 
								title={ 'Help' }
								open={ isHelpDialogOpen }
								onDialogClose={ onHelpDialogToggle } />
							
							<FormDialog 
								{...props}
								trxId={ trxId }
								title={ 'Add Transaction' }
								open={ isFormDialogOpen }
								onDialogClose={ onFormDialogOpen } />
							
							<UploadDialog 
								title={ 'Upload CSV' }
								open={ isUploadDialogOpen }
								onDialogClose={ onUploadDialogToggle } />
							
							<ActionTypeDialog 
								title={ 'Select transaction type...' }
								open={ isActionTypeDialogOpen }
								onDialogClose={ onActionTypeDialogToggle } />
						</div>
					</QueueAnim>
				</section>
		</div>
	)
}

export default PageSystemViewInner
