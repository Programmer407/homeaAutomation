// libs
import React from "react"
import QueueAnim from 'rc-queue-anim';
import DocumentTitle from "react-document-title"
import styles from "./PageCalculateViewInner.scss"
import { Link } from "react-router-dom";

const PageCalculateViewInner = props => {
  return (
		<div>
			<DocumentTitle title="Calculate" />
				<section className="container-fluid">
					{/*<ul className="breadcrumb">
						<li className="breadcrumb-item"><a href="javascript:;">Page</a></li>
						<li className="breadcrumb-item active">Blank</li>
					</ul>*/}
					<QueueAnim type="bottom" className="ui-animate">
						<div key="1">
							<article className="article">
								<h2 className="article-title article-title-primary">Calculate</h2>
							</article>
						</div>
					</QueueAnim>
				</section>
		</div>
  );
}

export default PageCalculateViewInner;
