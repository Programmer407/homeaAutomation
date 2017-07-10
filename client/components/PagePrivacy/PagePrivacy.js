// libs
import React from "react"
import { connect } from "react-redux"
import PagePrivacyInner from "./PagePrivacyInner"

export default class PagePrivacy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PagePrivacyInner {...this.props} />
  }
}
