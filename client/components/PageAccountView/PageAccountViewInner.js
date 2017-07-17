// libs
import React from "react";
import DocumentTitle from "react-document-title";
import styles from "./PageAccountViewInner.scss";
import { Link } from "react-router-dom";

const PageAccountViewInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Account - Wisdom" />
      <h2>Account</h2>
    </div>
  )
}

export default PageAccountViewInner
