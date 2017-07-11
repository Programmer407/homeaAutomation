// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./PageSystemViewInner.scss"
import { Link } from "react-router-dom";

const PageSystemViewInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Transactions - Cryptax" />
      {/*<div className="row">
        <div className="col-lg-12">
          Home Page
        </div>
      </div>*/}
      <div className="container-fluid">
        <nav>
          <h2>Transactions</h2>
        </nav>
      </div>
    </div>
  )
}

export default PageSystemViewInner
