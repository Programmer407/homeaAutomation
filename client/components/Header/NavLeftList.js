import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';
import { Link } from "react-router-dom";
import { renderMenuItem } from '../../utils';

const HeaderIconButtonStyle = {
  //width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '40px' // 36 + 16, algin with sub list
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item">
          {/*<Link to="/system" style={{textDecoration: 'none'}}><MenuItem primaryText="Transaction" style={{lineHeight: '60px', color: '#2196F3'}}/></Link>
          <Link to="/account" style={{textDecoration: 'none'}}><MenuItem primaryText="Account" style={{lineHeight: '60px', color: '#2196F3'}}/></Link>*/}
          
          <Link to="/system" className="color-primary">Transactions</Link>
          <span className="divider-pipe" />
          <Link to="/account" className="color-primary">My Account</Link>
        </li>
      </ul>
    );
  }
}

module.exports = NavLeftList;
