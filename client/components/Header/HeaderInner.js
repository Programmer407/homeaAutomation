import React from 'react'
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import classnames from 'classnames';
// import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';

import styles from './HeaderInner.scss';

const HeaderInner = props => {
	const { user } = props
	
	return (
		// <div>
		// 	<If condition={user}>
		// 		<h1>Hello, World!</h1>
		// 	</If>
		// </div>
		<If condition={user}>
			<section className="app-header">
        <div
          className={classnames('app-header-inner', {
            'bg-color-light': ['11', '12', '13', '14', '15', '16', '21'].indexOf(31) >= 0,
            'bg-color-dark': '31' === '31',
            'bg-color-primary': ['22', '32'].indexOf(31) >= 0,
            'bg-color-success': ['23', '33'].indexOf(31) >= 0,
            'bg-color-info': ['24', '34'].indexOf(31) >= 0,
            'bg-color-warning': ['25', '35'].indexOf(31) >= 0,
            'bg-color-danger': ['26', '36'].indexOf(31) >= 0 })}
                >
				<div className="brand hidden-md-down">
					<h2><Link to="/">Cryptax</Link></h2>
				</div>

				<div className="top-nav-left hidden-md-down">
					<NavLeftList />
				</div>

				<div className="top-nav-right">
					<NavRightList/>
				</div>
				</div>
			</section>
		</If>
	)
}

export default HeaderInner;