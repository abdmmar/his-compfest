import {NavBar, Copyright} from 'components/Layout'
import {CardPatient, CardAdmin} from 'components/Card'
import {ButtonIcon} from 'components/Button'
import styles from './Dashboard.module.scss'
import {Plus} from 'components/Icon'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainHeader}>
            <h3 className={styles.mainHeaderTitle}>Appointment</h3>
            <div className={styles.mainHeaderAction}>
              <ButtonIcon>
                <Plus />
              </ButtonIcon>
            </div>
          </div>
          <div className={styles.mainContent}>
            <CardAdmin />
            <CardPatient />
            <CardPatient />
            <CardPatient />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  )
}
