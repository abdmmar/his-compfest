/* eslint-disable react/prop-types */
import * as React from 'react'
import PropTypes from 'prop-types'
import {useQueryClient, useMutation} from 'react-query'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import toast from 'react-hot-toast'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

import {DialogHeader} from 'components/Layout'
import {Button} from 'components/Button'
import {AuthContext} from 'context/AuthContext'
import {AppointmentSchema} from 'utils/schema'
import styles from './CardAdmin.module.scss'

export default function CardAdmin({data}) {
  const [showDialog, setShowDialog] = React.useState(false)
  const {logout, request} = React.useContext(AuthContext)
  let {_id, doctor_name, description, registrant_list = []} = data

  const queryCache = useQueryClient()

  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const deleteMutation = useMutation((appointment_id) => {
    const options = {
      method: 'DELETE',
    }

    const loading = toast.loading('Deleting')

    return request(`/appointment/${appointment_id}`, options)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Deleted!')
          toast.dismiss(loading)

          queryCache.invalidateQueries('appointments')

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

  const editMutation = useMutation((data) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
    }
    const loading = toast.loading('Editing appointment')

    return request('/appointment', options)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Appointment edited!')

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

  const handleDelete = () => {
    toast((t) => (
      <div className={styles.toastDelete}>
        <p>
          Are you sure want to delete <strong>appointment</strong>?
        </p>
        <Button
          secondary={true}
          onClick={() => {
            deleteMutation.mutate(_id)
            toast.dismiss(t.id)
          }}
        >
          Delete
        </Button>
      </div>
    ))
  }

  const handleEditAppointment = (value) => {
    editMutation.mutate({id: _id, ...value})
  }

  return (
    <>
      <div className={styles.card}>
        <h4 className={styles.cardTitle}>{doctor_name}</h4>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.patientContainer}>
          <p className={styles.patientTitle}>Patients:</p>
          <select className={styles.patientSelect}>
            {registrant_list.length !== 0 ? (
              registrant_list.map((registranst) => {
                return (
                  <option
                    key={registranst.user_id}
                    value={registranst.first_name}
                  >
                    {`${registranst.first_name} ${registranst.last_name}`}
                  </option>
                )
              })
            ) : (
              <option value="" selected disabled hidden>
                No Registrant
              </option>
            )}
          </select>
        </div>
        <div className={styles.cardAction}>
          <Button onClick={open} secondary={true}>
            Edit
          </Button>
          <Button onClick={handleDelete} secondary={true}>
            Delete
          </Button>
        </div>
      </div>
      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        aria-label="Edit Appointment"
      >
        <DialogHeader title="Edit appointment" onClick={close} />
        <Formik
          initialValues={{doctor_name: doctor_name, description: description}}
          validationSchema={AppointmentSchema}
          onSubmit={(value) => handleEditAppointment(value)}
        >
          {(props) => (
            <Form className={styles.form}>
              <section className={styles.section}>
                <label htmlFor="doctor_name">Doctor Name</label>
                <Field
                  type="text"
                  id="doctor_name"
                  name="doctor_name"
                  value={props.values.doctor_name}
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  name="doctor_name"
                  render={(msg) => (
                    <small className={styles.error}>{msg}</small>
                  )}
                />
              </section>

              <section className={styles.section}>
                <label htmlFor="description">Description</label>
                <Field
                  component="textarea"
                  rows="5"
                  id="description"
                  name="description"
                  value={props.values.description}
                  onChange={props.handleChange}
                />
                <ErrorMessage
                  name="description"
                  render={(msg) => (
                    <small className={styles.error}>{msg}</small>
                  )}
                />
              </section>

              <div className={styles.sectionBtn}>
                <Button type="submit">Edit Appointment</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

CardAdmin.propTypes = {
  data: PropTypes.object,
}
