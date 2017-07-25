import React from 'react'
import { connect } from 'react-redux';
import { NavLink, Link, Route } from 'react-router-dom'
import classnames from 'classnames';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './HeaderInner.scss';

const PublicHeader = React.createClass ({
  getInitialState () {
    return {
      navExpanded: false
    }
  },

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  },

  closeNav() {
    this.setState({ navExpanded: false });
  },

  render() {
    return (
      <div>
        <Navbar fluid onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded}
								className="my-navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="some url">Wisdom</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onSelect={this.closeNav}>
              <LinkContainer to="#"><NavItem eventKey={1} className="nav-item">Features</NavItem></LinkContainer>
	 						<LinkContainer to="#"><NavItem eventKey={2} className="nav-item">Pricing</NavItem></LinkContainer>
		 					<LinkContainer to="#"><NavItem eventKey={3} className="nav-item">Contact Us</NavItem></LinkContainer>
            </Nav>
						<Nav onSelect={this.closeNav} pullRight>
							<LinkContainer to="/login" activeClassName="activeNavLink"><NavItem eventKey={1}>Login</NavItem></LinkContainer>
							<LinkContainer to="/register" activeClassName="activeNavLink"><NavItem eventKey={2}>Sign Up</NavItem></LinkContainer>
						</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
});

const PrivateHeader = React.createClass ({
  getInitialState () {
    return {
      navExpanded: false
    }
  },

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  },

  closeNav() {
    this.setState({ navExpanded: false });
  },

  render() {
    return (
      <div>
        <Navbar fluid onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded}
								className="my-navbar collapse-early">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="some url">Wisdom</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav onSelect={this.closeNav}>
              <LinkContainer to="/system" activeClassName="activeNavLink"><NavItem eventKey={1} className="nav-item">Transactions</NavItem></LinkContainer>
	 						<LinkContainer to="/account" activeClassName="activeNavLink"><NavItem eventKey={2} className="nav-item">Accounts</NavItem></LinkContainer>
		 					<LinkContainer to="/calculate" activeClassName="activeNavLink"><NavItem eventKey={3} className="nav-item">Calculate</NavItem></LinkContainer>
		 					<LinkContainer to="/reports" activeClassName="activeNavLink"><NavItem eventKey={3} className="nav-item">Reports</NavItem></LinkContainer>
		 					<LinkContainer to="/charts" activeClassName="activeNavLink"><NavItem eventKey={3} className="nav-item">Charts</NavItem></LinkContainer>
            </Nav>
						<Nav className="nav-right-dropdown" onSelect={this.closeNav} pullRight>
							<NavDropdown eventKey={1} title={ this.props.user.firstName } id="basic-nav-dropdown">
								<LinkContainer to="/logout"><MenuItem eventKey={1.1}>Logout</MenuItem></LinkContainer>
							</NavDropdown>
						</Nav>
						<Nav className="nav-right" pullRight>
							<MenuItem className="menu-divider" divider/>
							<LinkContainer to="/logout"><MenuItem eventKey={1}>Logout</MenuItem></LinkContainer>
						</Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
});

// const HeaderInner = props => {
// 	const { user } = props;

// 	const publicHeader = (
// 		<Navbar bsStyle="inverse" collapseOnSelect fixedTop fluid className="my-navbar">
// 			<Navbar.Header>
// 				<Navbar.Brand>
// 					<a href="#">React-Bootstrap</a>
// 				</Navbar.Brand>
// 				<Navbar.Toggle />
// 			</Navbar.Header>
// 			<Navbar.Collapse>
// 				<Nav>
// 					<LinkContainer to="#"><NavItem eventKey={1}>Features</NavItem></LinkContainer>
// 					<LinkContainer to="#"><NavItem eventKey={2}>Pricing</NavItem></LinkContainer>
// 					<LinkContainer to="#"><NavItem eventKey={3}>Contact Us</NavItem></LinkContainer>
// 				</Nav>
// 				<Nav pullRight>
// 					{/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
// 						<MenuItem eventKey={3.1}>Action</MenuItem>
// 						<MenuItem eventKey={3.2}>Another action</MenuItem>
// 						<MenuItem eventKey={3.3}>Something else here</MenuItem>
// 						<MenuItem divider />
// 						<MenuItem eventKey={3.3}>Separated link</MenuItem>
// 					</NavDropdown>*/}
// 					<LinkContainer to="/login"><NavItem eventKey={1}>Login</NavItem></LinkContainer>
// 					<LinkContainer to="/register"><NavItem eventKey={2}>Sign Up</NavItem></LinkContainer>
// 				</Nav>
// 			</Navbar.Collapse>
// 		</Navbar>
// 	);
	
// 	return (
// 		<div>
// 			<Choose>
// 				<When condition={ user }>
// 					{/*<nav className="navbar navbar-inverse navbar-primary navbar-fixed-top">
// 						<div className="container-fluid">
// 							<div className="row">
// 								<div className="col-xs-7 my-col-6">
// 									<div className="">
// 										<div className="navbar-header">
// 											<Link className="navbar-brand my-brand" to="/system">Wisdom</Link>
// 											<div className="dropdown float-left">
// 												<button className="navbar-toggle toggle-primary dropdown-toggle-primary float-left" type="button" data-toggle="dropdown">
// 													<span className="icon-bar"></span>
// 													<span className="icon-bar"></span>
// 													<span className="icon-bar"></span>
// 												</button>
// 												<ul className="dropdown-menu">
// 													<li><Link to="/system">Transactions</Link></li>
// 													<li><Link to="/account">Accounts</Link></li>
// 													<li><Link to="/calculate">Calculate</Link></li>
// 													<li><Link to="/reports">Reports</Link></li>
// 													<li><Link to="/charts">Charts</Link></li>
// 												</ul>
// 											</div>
// 										</div>
// 										<div className="collapse navbar-collapse float-left fill-height" id="myNavbar">
// 											<ul className="nav navbar-nav">
// 												<li><NavLink to="/system" activeClassName="activeNavLink">Transactions</NavLink></li>
// 												<li><NavLink to="/account" activeClassName="activeNavLink">Accounts</NavLink></li>
// 												<li><NavLink to="/calculate" activeClassName="activeNavLink">Calculate</NavLink></li>
// 												<li><NavLink to="/reports" activeClassName="activeNavLink">Reports</NavLink></li>
// 												<li><NavLink to="/charts" activeClassName="activeNavLink">Charts</NavLink></li>
// 											</ul>
// 										</div>
// 									</div>
// 								</div>
// 								<div className="col-xs-5">
// 									<ul className="nav navbar-nav navbar-right dropdown">
// 										<li className="nav-right menu-item">
// 											<Link to="#" className="dropdown-toggle toggle-primary" data-toggle="dropdown">{user.firstName}</Link>
// 											<ul className="dropdown-menu"> 
// 												<li><Link to="/logout">Logout</Link></li>
// 											</ul>
// 										</li>
// 									</ul>
// 								</div>
// 							</div>
// 						</div>
// 					</nav>*/}
// 					{/*<nav className="navbar navbar-inverse my-navbar">
// 						<div className="container-fluid">
// 							<div className="navbar-header">
// 								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
// 									<span className="icon-bar"></span>
// 									<span className="icon-bar"></span>
// 									<span className="icon-bar"></span>                        
// 								</button>
// 								<NavLink className="navbar-brand" to="/">wisdom</NavLink>
// 							</div>
// 							<div className="collapse navbar-collapse" id="myNavbar">
// 								<ul className="nav navbar-nav">
// 									<li><NavLink to="/system" activeClassName="activeNavLink">Transactions</NavLink></li>
// 									<li><NavLink to="/account" activeClassName="activeNavLink">Accounts</NavLink></li>
// 									<li><NavLink to="/calculate" activeClassName="activeNavLink">Calculate</NavLink></li>
// 									<li><NavLink to="/reports" activeClassName="activeNavLink">Reports</NavLink></li>
// 									<li><NavLink to="/charts" activeClassName="activeNavLink">Charts</NavLink></li>
// 								</ul>
// 								<ul className="nav navbar-nav navbar-right">
// 									<li className="dropdown">
// 										<NavLink className="dropdown-toggle" data-toggle="dropdown" to="#">{user.firstName}</NavLink>
// 										<ul className="dropdown-menu">
// 											<li><NavLink to="/logout">Logout</NavLink></li>
// 										</ul>
// 									</li>
// 								</ul>
// 							</div>
// 						</div>
// 					</nav>*/}
// 				</When>
// 				<Otherwise>
// 					{/*<nav className="navbar navbar-inverse navbar-static-top my-navbar">
// 						<div className="container-fluid">
// 							<div className="navbar-header">
// 								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
// 									<span className="icon-bar"></span>
// 									<span className="icon-bar"></span>
// 									<span className="icon-bar"></span>                        
// 								</button>
// 								<NavLink className="navbar-brand" to="/">wisdom</NavLink>
// 							</div>
// 							<div className="collapse navbar-collapse" id="myNavbar">
// 								<ul className="nav navbar-nav">
// 									<li><NavLink to="#" activeClassName="activeNavLink">Feature</NavLink></li>
// 									<li><NavLink to="#" activeClassName="activeNavLink">Pricing</NavLink></li>
// 									<li><NavLink to="#" activeClassName="activeNavLink">Contact Us</NavLink></li>
// 								</ul>
// 								<ul className="nav navbar-nav navbar-right">
// 									<li><NavLink to="/login" activeClassName="activeNavLink">Login</NavLink></li>
// 									<li><NavLink to="/register" activeClassName="activeNavLink">Sign Up</NavLink></li>
// 								</ul>
// 							</div>
// 						</div>
// 					</nav>*/}
// 					{ publicHeader }
// 				</Otherwise>
// 			</Choose>
// 		</div>
// 	)
// }


const HeaderInner = (props) => {
	const { onToggle, expanded, fluid, onSelect, pullRight, eventKey, bsClass, bsStyle, user } = props;

	return (
		<Choose>
			<When condition={ user }>
				<PrivateHeader user={ user } onToggle expanded fluid onSelect pullRight eventKey />
			</When>
			<Otherwise>
				<PublicHeader onToggle expanded fluid onSelect pullRight eventKey/>
			</Otherwise>
		</Choose>
	);
}


export default HeaderInner;