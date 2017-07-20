import React from 'react'
import { connect } from 'react-redux';
import { NavLink, Link, Route } from 'react-router-dom'
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
					<nav className="navbar navbar-inverse navbar-primary navbar-fixed-top">
						<div className="container-fluid">
							<div className="row">
								<div className="col-xs-7 my-col-6">
									<div className="">
										<div className="navbar-header">
											<Link className="navbar-brand my-brand" to="/system">Wisdom</Link>
											<div className="dropdown float-left-primary">
												<button className="navbar-toggle toggle-primary dropdown-toggle-primary float-left-primary" type="button" data-toggle="dropdown">
													<span className="icon-bar"></span>
													<span className="icon-bar"></span>
													<span className="icon-bar"></span>
												</button>
												<ul className="dropdown-menu">
													<li><Link to="/system">Transactions</Link></li>
													<li><Link to="/account">Accounts</Link></li>
													<li><Link to="/calculate">Calculate</Link></li>
													<li><Link to="/reports">Reports</Link></li>
													<li><Link to="/charts">Charts</Link></li>
												</ul>
											</div>
										</div>
										<div className="collapse navbar-collapse float-left-primary fill-height" id="myNavbar">
											<ul className="nav navbar-nav">
												<li><NavLink to="/system" activeClassName="activeNavLink">Transactions</NavLink></li>
												<li><NavLink to="/account" activeClassName="activeNavLink">Accounts</NavLink></li>
												<li><NavLink to="/calculate" activeClassName="activeNavLink">Calculate</NavLink></li>
												<li><NavLink to="/reports" activeClassName="activeNavLink">Reports</NavLink></li>
												<li><NavLink to="/charts" activeClassName="activeNavLink">Charts</NavLink></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xs-5">
									<ul className="nav navbar-nav navbar-right dropdown">
										<li className="nav-right menu-item">
											<Link to="#" className="dropdown-toggle toggle-primary" data-toggle="dropdown">{user.firstName}</Link>
											<ul className="dropdown-menu"> 
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
						<div className="container-fluid">
							<div className="row">
								<div className="col-xs-12">
									<div className="col-xs-7 my-col-x">
										<div className="float-left-primary">
											<div className="navbar-header">
												<Link className="navbar-brand my-brand" to="/login">Wisdom</Link>
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
									<div className="col-xs-5 my-col-x">
										<ul className="nav navbar-nav navbar-right">
											<li className="nav-right menu-item"><Link to="/login">Login</Link></li>
											<li className="nav-right menu-item"><Link to="/register">Sign Up</Link></li>
										</ul>
									</div>
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