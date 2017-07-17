// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./PageSystemViewInner.scss"
import { Link } from "react-router-dom";

const PageSystemViewInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Transactions - Wisdom" />
      <h2>Transactions</h2>
    </div>
  )
}

export default PageSystemViewInner
