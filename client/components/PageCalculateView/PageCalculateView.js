// libs
import React from "react"
import classNames from 'classnames'
import { connect } from "react-redux"
// import PageCalculateViewInner from "./PageCalculateViewInner"

class PageCalculateView extends React.Component {
  /*constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <PageCalculateViewInner {...this.props} />
  }*/


	constructor(props) {
    super(props);
    this.state = { mode: undefined } ;
  }

  componentWillMount() {
    let mode;
    if (this.props.age > 70) {
      mode = 'old';
    } else if (this.props.age < 18) {
      mode = 'young';
    } else {
      mode = 'middle';
    }
    this.setState({ mode });
		console.log(mode);
  }

  render() {
    return (
      <div className={ classNames('person', this.state.mode) }>
        { this.props.name } (age: { this.state.mode })
      </div>
    );
  }
}

PageCalculateView.defaultProps = { age: '80' };

export default PageCalculateView;
