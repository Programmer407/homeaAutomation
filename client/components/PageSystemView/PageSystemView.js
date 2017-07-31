// libs
import React from "react"
import { connect } from "react-redux"
import PageSystemViewInner from "./PageSystemViewInner"

// src
import { logoutWhenIdle } from '../../utils'

@logoutWhenIdle()
class PageSystemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageSystemViewInner {...this.props} />
  }
}

export default PageSystemView