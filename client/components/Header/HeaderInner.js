import React from 'react'
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'
import classnames from 'classnames';
// import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';

import styles from './HeaderInner.scss';

const HeaderInner = props => {
	const { user } = props;
	
	return (
		<div>
			<Choose>
				<When condition={ user }>
					<nav className="navbar navbar-inverse navbar-primary navbar-static-top">
						<div className="container-fluid">
							<div className="row">
								<div className="col-xs-6 my-col-6">
									<div className="float-left-primary">
										<div className="navbar-header">
											<Link className="navbar-brand float-left-primary my-brand" to="#">Wisdom</Link>
											<div className="dropdown float-left-primary">
												<button className="navbar-toggle toggle-primary dropdown-toggle-primary float-left-primary" type="button" data-toggle="dropdown">
													<span className="icon-bar"></span>
													<span className="icon-bar"></span>
													<span className="icon-bar"></span>
												</button>
												<ul className="dropdown-menu">
													<li><Link to="/system">Transactions</Link></li>
													<li><Link to="/account">Account</Link></li>
												</ul>
											</div>
										</div>
										<div className="collapse navbar-collapse float-left-primary" id="myNavbar">
											<ul className="nav navbar-nav">
												<li><Link to="/system">Transactions</Link></li>
												<li><Link to="/account">Account</Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xs-6">
									<ul className="nav navbar-nav navbar-right dropdown">
										<li className="nav-right menu-item">
											<Link to="#" className="dropdown-toggle toggle-primary" data-toggle="dropdown">{user.firstName + ' ' + user.lastName}</Link>
											<ul className="dropdown-menu">
												<li><Link to="#">Profile</Link></li>
												<li><Link to="#">Settings</Link></li>
												<li><Link to="/logout">Logout</Link></li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
				</When>
				<Otherwise>
					<nav className="navbar navbar-inverse navbar-primary navbar-static-top">
						<div className="container">
							<div className="row">
								<div className="col-xs-6 my-col-6">
									<div className="float-left-primary">
										<div className="navbar-header">
											<Link className="navbar-brand float-left-primary my-brand" to="#">Wisdom</Link>
											<div className="dropdown float-left-primary">
												<button className="navbar-toggle toggle-primary dropdown-toggle-primary float-left-primary" type="button" data-toggle="dropdown">
													<span className="icon-bar"></span>
													<span className="icon-bar"></span>
													<span className="icon-bar"></span>
												</button>
												<ul className="dropdown-menu">
													<li><Link to="#">Features</Link></li>
													<li><Link to="#">Pricing</Link></li>
													<li><Link to="#">Contact Us</Link></li>
												</ul>
											</div>
										</div>
										<div className="collapse navbar-collapse float-left-primary" id="myNavbar">
											<ul className="nav navbar-nav">
												<li><Link to="#">Features</Link></li>
												<li><Link to="#">Pricing</Link></li>
												<li><Link to="#">Contact Us</Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xs-6">
									<ul className="nav navbar-nav navbar-right">
										<li className="nav-right menu-item"><Link to="/login">Login</Link></li>
										<li className="nav-right menu-item"><Link to="/register">Sign Up</Link></li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
				</Otherwise>
			</Choose>
		</div>
	)
}

export default HeaderInner;