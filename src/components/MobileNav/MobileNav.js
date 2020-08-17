import React from 'react';
import './MobileNav.scss';

import { withRouter, NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class MobileNav extends React.Component {
  static contextType = UserContext;

  handleLogOut = () => {
    this.context.processLogout();
  };

  componentDidMount() {

  }

  render() {
    // if (this.context.user.id == null) {
    // }

    return (
      <footer className="mobile-nav">
        <nav>
          <NavLink to='/schedule'><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon> Schedule</NavLink>
          <NavLink to='/clients'><FontAwesomeIcon icon={faStoreAlt}></FontAwesomeIcon> Clients</NavLink>
          <NavLink to='/reports'><FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon> Reports</NavLink>
          <NavLink to='/my-account'><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon> Account</NavLink>
        </nav>
      </footer>
    );

    // <button
    //   className='logout-button btn'
    //   onClick={() => this.handleLogOut()}>
    //   Logout
    // </button>
  }
}

export default withRouter(MobileNav);