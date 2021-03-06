import React from 'react';
import logo from '../../images/logo.png';
import './Header.scss';

import Modal from 'react-modal';
import { withRouter, Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import UserContext from '../../contexts/UserContext';
import { slide as Menu } from 'react-burger-menu';

class Header extends React.Component {
  state = {
    loginIsOpen: false,
    signUpIsOpen: false,
    menuOpen: false,
    isMobile: false,
  };

  static contextType = UserContext;

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < 750 });
  };

  setLoginOpen = (bool) => {
    this.setState({ loginIsOpen: bool });
  };

  setSignUpOpen = (bool) => {
    this.setState({ signUpIsOpen: bool });
  };

  handleLogOut = () => {
    this.context.processLogout();
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') Modal.setAppElement('.App');
    if (this.props.location.pathname === '/login') {
      this.setLoginOpen(true);
    }
    if (this.props.location.pathname === '/sign-up') {
      this.setSignUpOpen(true);
    }
    document.addEventListener('mousedown', this.handleClick);
    window.addEventListener('resize', this.handleWindowResize);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    window.removeEventListener('resize', this.handleWindowResize);
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  };

  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  };

  render() {
    if (window.innerWidth < 750) {
      if (this.context.user.id == null) {
        return (
          <header>
            <div className='logo'>
              <img src={logo} alt='my clientele logo'></img>
            </div>

            <div className='main-menu'>
              <Menu
                width={'250px'}
                right
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}>
                <button
                  className='btn'
                  onClick={(e) => {
                    this.toggleMenu();
                    this.setLoginOpen(true);
                  }}>
                  Login
                </button>

                <button
                  className='btn'
                  onClick={(e) => {
                    this.toggleMenu();
                    this.setSignUpOpen(true);
                  }}>
                  Sign Up
                </button>
              </Menu>
            </div>

            <Modal
              isOpen={this.state.loginIsOpen}
              onRequestClose={(e) => this.setLoginOpen(false)}>
              <LoginForm closeModal={(e) => this.setLoginOpen(false)} />
            </Modal>
            <Modal
              isOpen={this.state.signUpIsOpen}
              onRequestClose={(e) => this.setSignUpOpen(false)}>
              <SignUpForm closeModal={(e) => this.setSignUpOpen(false)} />
            </Modal>
          </header>
        );
      }

      return (
        <header>
          <div className='logo'>
            <Link to='/schedule'>
              <img src={logo} alt='my clientele logo'></img>
            </Link>
          </div>

          <div className='main-menu'>
            <Menu
              width={'250px'}
              right
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}>
              <Link to='/add-client'>
                <button
                  onClick={() => this.toggleMenu()}
                  className='add-client btn'>
                  Add Client
                </button>
              </Link>
              <button
                className='logout-button btn'
                onClick={() => this.handleLogOut()}>
                Logout
              </button>
            </Menu>
          </div>
        </header>
      );
    }

    if (this.context.user.id == null) {
      return (
        <header>
          <div className='logo'>
            <img src={logo} alt='my clientele logo'></img>
          </div>
          <div className='header-buttons'>
            <button className='btn' onClick={(e) => this.setLoginOpen(true)}>
              Login
            </button>
            <Modal
              isOpen={this.state.loginIsOpen}
              onRequestClose={(e) => this.setLoginOpen(false)}>
              <LoginForm closeModal={(e) => this.setLoginOpen(false)} />
            </Modal>
            <button className='btn' onClick={(e) => this.setSignUpOpen(true)}>
              Sign Up
            </button>
            <Modal
              isOpen={this.state.signUpIsOpen}
              onRequestClose={(e) => this.setSignUpOpen(false)}>
              <SignUpForm closeModal={(e) => this.setSignUpOpen(false)} />
            </Modal>
          </div>
        </header>
      );
    }

    return (
      <header>
        <div className='logo'>
          <Link to='/schedule'>
            <img src={logo} alt='my clientele logo'></img>
          </Link>
        </div>
        <div className='header-buttons'>
          <Link to='/add-client'>
            <button className='add-client btn'>Add Client</button>
          </Link>

          <Link to='/reports'>
            <button className='reports btn'>Reports</button>
          </Link>

          <Link to='/my-account'>
              <button
                className='my-account btn'>
                My Account
              </button>
              </Link>
          <button
            className='logout-button btn'
            onClick={() => this.handleLogOut()}>
            Logout
          </button>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
