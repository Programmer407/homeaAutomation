// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./PagePrivacyInner.scss"
import { Link } from "react-router-dom";

const PagePrivacyInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Privacy - Cryptax" />
      {/*<div className="row">
        <div className="col-lg-12">
          Home Page
        </div>
      </div>*/}
      <div className="container-fluid">
        <nav class="navbar navbar-inverse bg-primary">
          <h2>Privacy Policy</h2>
          <Link to="/login" className="color-primary">Login</Link>
          <span className="divider-pipe" />
          <Link to="/register" className="color-primary">Register</Link>
        </nav>
      </div>
    </div>
  )
}

export default PagePrivacyInner
