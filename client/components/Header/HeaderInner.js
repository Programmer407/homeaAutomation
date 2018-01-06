import React from 'react'
import { connect } from 'react-redux';
import { NavLink, Link, Route } from 'react-router-dom'
import classnames from 'classnames';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styles from './HeaderInner.scss';
import Spinner from 'react-spinner-material';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';
import PageLoading from '../PageLoading'


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
              <Link to="/login">Home Automation</Link>
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
							<MenuItem className="menu-divider" divider/>
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
              <Link to="/dashboard">Home Automation</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
              <Nav onSelect={this.closeNav}>
              <LinkContainer to="/dashboard" activeClassName="activeNavLink"><NavItem eventKey={1} className="nav-item">Dashboard</NavItem></LinkContainer>
	 						<LinkContainer to="/currentStatus" activeClassName="activeNavLink"><NavItem eventKey={2} className="nav-item">Current Status</NavItem></LinkContainer>
		 					<LinkContainer to="/history" activeClassName="activeNavLink"><NavItem eventKey={3} className="nav-item">History</NavItem></LinkContainer>

            </Nav>
              <Nav className="nav-right-dropdown" onSelect={this.closeNav} pullRight>
                  <NavDropdown eventKey={1} title="kamran" id="basic-nav-dropdown">
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

const HeaderInner = (props) => {
	const { onToggle, expanded, fluid, onSelect, pullRight, eventKey, bsClass, bsStyle, user, isLogoutLoading } = props;

	return (
    <Choose>
			<When condition={ isLogoutLoading }>
        <PageLoading />
      </When>
			<Otherwise>
                <PrivateHeader/>
        {/*<Choose>
          <When condition={ user }>
            <PrivateHeader user={ user } />
          </When>
          <Otherwise>
            <PublicHeader />
          </Otherwise>
        </Choose>*/}
    </Otherwise>
		</Choose>
	);
}


export default HeaderInner;