// libs
import React from "react"
import { connect } from "react-redux"
import PageChartsViewInner from "./PageChartsViewInner"

export default class PageChartsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageChartsViewInner {...this.props} />
  }
}
