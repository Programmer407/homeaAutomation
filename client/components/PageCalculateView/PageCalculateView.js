// libs
import React from "react"
import { connect } from "react-redux"
import PageCalculateViewInner from "./PageCalculateViewInner"

export default class PageCalculateView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageCalculateViewInner {...this.props} />
  }
}