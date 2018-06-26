import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Usermenu from './navbar.usermenu.jsx'
import Uploader from '../uploader/uploader.jsx'
import { Navbar } from 'react-bootstrap'
import LoggedIn from '../authentication/logged-in.jsx'
import LoggedOut from '../authentication/logged-out.jsx'

const NavMenu = ({ profile, supportModal, loginModal }) => {
  const adminLink = (
    <NavLink className="nav-link" to="/admin">
      <span className="link-name">admin</span>
    </NavLink>
  )
  return (
    <ul className="nav navbar-nav main-nav">
      <li className="link-dashboard">
        <LoggedIn>
          <NavLink className="nav-link" to="/dashboard">
            <span className="link-name">my dashboard</span>
          </NavLink>
        </LoggedIn>
      </li>
      <li className="link-public">
        <NavLink className="nav-link" to="/public/datasets">
          <span className="link-name">Public Dashboard</span>
        </NavLink>
      </li>
      <li className="link-support">
        <a className="nav-link" onClick={() => supportModal()}>
          <span className="link-name">Support</span>
        </a>
      </li>
      <li className="link-faq">
        <NavLink className="nav-link" to="/faq">
          <span className="link-name">faq</span>
        </NavLink>
      </li>
      <li className="link-admin">{profile.superuser ? adminLink : null}</li>
      <li className="link-dashboard">
        <LoggedIn>
          <Uploader />
        </LoggedIn>
      </li>
      <li>
        <Navbar.Collapse>
          <LoggedIn>
            <Usermenu profile={profile} />
          </LoggedIn>
          <LoggedOut>
            <div className="navbar-right sign-in-nav-btn">
              <button className="btn-blue" onClick={() => loginModal()}>
                <span>Sign in</span>
              </button>
            </div>
          </LoggedOut>
        </Navbar.Collapse>
      </li>
    </ul>
  )
}

NavMenu.propTypes = {
  profile: PropTypes.object,
  scitran: PropTypes.object,
  isLoggedIn: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
}

export default NavMenu
