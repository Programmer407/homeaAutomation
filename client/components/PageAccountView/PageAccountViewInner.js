// libs
import React, {PropTypes} from "react";
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title";
import MyAddresses from './MyAddresses/MyAddressesView'
import MyAccounts from './MyAccounts/MyAccountsView'
import styles from "./PageAccountViewInner.scss";


const PageAccountViewInner = (props) => {
  return (
    <section className="container-fluid chapter">
			<DocumentTitle title="Accounts" />
      <QueueAnim type="bottom" className="ui-animate">
				<article className="article">
					<div key="1"><MyAccounts {...props} /></div>  
					<div className="divider"/>
					<div key="2"><MyAddresses {...props} /></div>  
				</article>
      </QueueAnim>
    </section>
  )
}

PageAccountViewInner.propTypes={
  providerList: PropTypes.array,
	userProviderList: PropTypes.array,
	userAddressesList: PropTypes.array,
	onSelectionChange: React.PropTypes.func.isRequired,
	onSelectionSubmit: React.PropTypes.func.isRequired,
	onRefreshAddressClick: React.PropTypes.func.isRequired,
	onDeleteAddressClick: React.PropTypes.func.isRequired
};

export default PageAccountViewInner;
