// libs
import React from "react"
import DocumentTitle from "react-document-title"
import styles from "./PageSystemViewInner.scss"

const PageSystemViewInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="System View - Sauron" />
      <div className="row">
        <div className="col-lg-12">
          Home Page
        </div>
      </div>
    </div>
  )
}

export default PageSystemViewInner
