// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./PageSystemViewInner.scss"
import { Link } from "react-router-dom";

const PageSystemViewInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="System View - Sauron" />
      {/*<div className="row">
        <div className="col-lg-12">
          Home Page
        </div>
      </div>*/}
      <div className="container-fluid">
        <nav class="navbar navbar-inverse bg-primary">
          <h1>Hello, World</h1>
          <Link to="/logout" className="btn btn-primary">Logout</Link>
        </nav>
      </div>
    </div>
  )
}

export default PageSystemViewInner
