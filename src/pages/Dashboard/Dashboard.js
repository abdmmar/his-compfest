import * as React from 'react'
import {useQueryClient, useQuery, useMutation} from 'react-query'
import toast from 'react-hot-toast'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

import {NavBar, Copyright, DialogHeader} from 'components/Layout'
import {CardPatient, CardAdmin} from 'components/Card'
import {Button, ButtonIcon} from 'components/Button'
import {Plus} from 'components/Icon'

import {AuthContext} from 'context/AuthContext'
import {AppointmentSchema} from 'utils/schema'
import styles from './Dashboard.module.scss'

export default function Dashboard() {
  const [showDialog, setShowDialog] = React.useState(false)
  const [appointments, setAppointments] = React.useState([])
  const {logout, isLoggedInAsAdmin, request} = React.useContext(AuthContext)
  const queryCache = useQueryClient()

  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const appointQuery = useQuery('appointments', () => {
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

  const addMutation = useMutation((data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const loading = toast.loading('Adding appointment')

    return request('/appointment', options)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Appointment added!')

          queryCache.invalidateQueries('appointments')
          setTimeout(() => {
            close()
            toast.dismiss(loading)
          }, 500)

          return result.data
        } else {
          toast.error(result.message)
          toast.dismiss(loading)
        }
      })
      .catch((err) => {
        const error = toast(`${err.message}`)

        if (err.message.includes('jwt')) {
          logout()
        }

        toast.dismiss(error)
      })
  })

  const handleAddAppointment = (value) => {
    addMutation.mutate({...value, registrant_list: []})
  }

  return (
    <>
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
                  <ButtonIcon onClick={open}>
                    <Plus color="rgb(255,255,255)" />
                  </ButtonIcon>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className={styles.mainContent}>
              {appointQuery.isLoading ? <div>Loading...</div> : ''}
              {appointments.length !== 0 || appointQuery.data?.length !== 0
                ? appointments.map((appoint) => {
                    if (isLoggedInAsAdmin()) {
                      return <CardAdmin key={appoint._id} data={appoint} />
                    }

                    return <CardPatient key={appoint._id} data={appoint} />
                  })
                : ''}
              {appointments.length === 0 ? (
                <p>Appointment not yet available</p>
              ) : (
                ''
              )}
              {appointQuery.isError ? (
                <h4>{appointQuery.error.message}</h4>
              ) : (
                ''
              )}
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <Copyright />
        </footer>
      </div>
      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        aria-label="Add Appointment"
      >
        <DialogHeader title="Add Appointment" onClick={close} />
        <Formik
          initialValues={{doctor_name: '', description: ''}}
          validationSchema={AppointmentSchema}
          onSubmit={(value) => handleAddAppointment(value)}
        >
          <Form className={styles.form}>
            <section className={styles.section}>
              <label htmlFor="doctor_name">Doctor Name</label>
              <Field type="text" id="doctor_name" name="doctor_name" />
              <ErrorMessage
                name="doctor_name"
                render={(msg) => <small className={styles.error}>{msg}</small>}
              />
            </section>

            <section className={styles.section}>
              <label htmlFor="description">Description</label>
              <Field
                component="textarea"
                rows="5"
                id="description"
                name="description"
              />
              <ErrorMessage
                name="description"
                render={(msg) => <small className={styles.error}>{msg}</small>}
              />
            </section>

            <div className={styles.sectionBtn}>
              <Button type="submit">Add Appointment</Button>
            </div>
          </Form>
        </Formik>
      </Dialog>
    </>
  )
}
