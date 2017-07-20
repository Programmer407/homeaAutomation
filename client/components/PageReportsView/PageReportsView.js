// libs
import React from "react"
import { connect } from "react-redux"
import PageReportsViewInner from "./PageReportsViewInner"

export default class PageReportsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageReportsViewInner {...this.props} />
  }
}
