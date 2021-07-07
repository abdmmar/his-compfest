import {Link} from 'react-router-dom'

import {Button} from 'components/Button'
import styles from './NavBar.module.scss'

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navigation}>
        <Link to="/">
          <a className={styles.link}>
            {/* <img
            src="/static/logo.png"
            alt="Big Data, Artificial Intelligence, and Cyber Security Logo"
            width="70"
            height="35"
          /> */}
            <strong>HIS</strong>
          </a>
        </Link>
        <ul className={styles.menu}>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
      <div className={styles.action}>
        <Button secondary={true}>Logout</Button>
      </div>
    </nav>
  )
}
