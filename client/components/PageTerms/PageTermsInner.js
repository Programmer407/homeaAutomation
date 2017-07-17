// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./PageTermsInner.scss"
import { Link } from "react-router-dom";

const PageTermsInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Terms - Wisdom" />
      <h2>Terms</h2>
      <Link to="/login" className="color-primary">Login</Link>
      <span className="divider-pipe" />
      <Link to="/register" className="color-primary">Register</Link>
    </div>
  )
}

export default PageTermsInner
