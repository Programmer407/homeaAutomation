// libs
import React from "react"
import { connect } from "react-redux"
import PageTermsInner from "./PageTermsInner"

export default class PageTerms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageTermsInner {...this.props} />
  }
}
