import * as React from 'react'
import {useQueryClient, useQuery} from 'react-query'
import toast from 'react-hot-toast'

import {NavBar, Copyright} from 'components/Layout'
import {CardPatient, CardAdmin} from 'components/Card'
import {ButtonIcon} from 'components/Button'
import {Plus} from 'components/Icon'
import {AuthContext} from 'context/AuthContext'
import styles from './Dashboard.module.scss'

export default function Dashboard() {
  const [appointments, setAppointments] = React.useState([])
  const {logout, isLoggedInAsAdmin, request} = React.useContext(AuthContext)
  const queryCache = useQueryClient()

  const queryAppoint = useQuery('appointments', () => {
    const options = {
      method: 'GET',
    }

    request('/appointment', options)
      .then((result) => {
        setAppointments(result.data)
        return result.data
      })
      .catch((err) => {
        const error = toast(`${err.message}`)

        if (err.message.includes('jwt')) {
          logout()
        }

        toast.dismiss(error)
      })
  })

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <NavBar />
      </header>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainHeader}>
            <h3 className={styles.mainHeaderTitle}>Appointment</h3>
            {isLoggedInAsAdmin() ? (
              <div className={styles.mainHeaderAction}>
                <ButtonIcon>
                  <Plus />
                </ButtonIcon>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.mainContent}>
            {queryAppoint.isLoading ? <div>Loading...</div> : ''}
            {queryAppoint.data?.length !== 0 ? (
              appointments.map((appoint) => {
                if (isLoggedInAsAdmin()) {
                  return <CardAdmin key={appoint._id} data={appoint} />
                }

                return <CardPatient key={appoint._id} data={appoint} />
              })
            ) : (
              <h4>Appointment not yet available</h4>
            )}
            {queryAppoint.isError ? <h4>{queryAppoint.error.message}</h4> : ''}
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  )
}
