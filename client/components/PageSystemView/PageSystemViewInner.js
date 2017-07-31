// libs
import React from "react"
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title"
import styles from "./PageSystemViewInner.scss"
import { Link } from "react-router-dom";
import {Tabs, Tab} from 'material-ui/Tabs';


// src
import { TradingView, IncomeView, SpendingView }  from './TableViews'

const PageSystemViewInner = props => {
  return (
		<div>
			<DocumentTitle title="Transactions" />
				<section className="container-fluid">
					{/*<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="javascript:;">Page</a></li>
						<li className="breadcrumb-item active">Blank</li>
					</ul>*/}
					<QueueAnim type="bottom" className="ui-animate">
						<div key="1">
							<article className="article">
								<h2 className="article-title article-title-primary">Transactions</h2>
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
						</div>
					</QueueAnim>
				</section>
		</div>
  );
}

export default PageSystemViewInner;
