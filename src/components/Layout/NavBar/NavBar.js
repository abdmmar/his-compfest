import * as React from 'react'
import {Link, useHistory} from 'react-router-dom'

import {Button} from 'components/Button'
import {AuthContext} from 'context/AuthContext'

import styles from './NavBar.module.scss'

export default function NavBar() {
  const history = useHistory()
  const {logout} = React.useContext(AuthContext)

  const handleLogout = () => {
    logout()
    history.push('/')
    history.go()
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navigation}>
        <Link to="/" className={styles.link}>
          {/* <img
            src="/static/logo.png"
            alt="Big Data, Artificial Intelligence, and Cyber Security Logo"
            width="70"
            height="35"
          /> */}
          <strong>HIS</strong>
        </Link>
        <ul className={styles.menu}>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
      <div className={styles.action}>
        <Button secondary={true} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}
