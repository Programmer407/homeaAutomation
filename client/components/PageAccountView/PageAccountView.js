// libs
import React from "react"
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"

export default class PageAccountView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageAccountViewInner {...this.props} />
  }
}
