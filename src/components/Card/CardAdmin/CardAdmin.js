import * as React from 'react'
import PropTypes from 'prop-types'
import {useQueryClient, useMutation} from 'react-query'
import toast from 'react-hot-toast'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

import {Button} from 'components/Button'
import {ReactComponent as Close} from 'components/Icon/Close.svg'
import {AuthContext} from 'context/AuthContext'
import styles from './CardAdmin.module.scss'
import {ButtonIcon} from 'components/Button'

export default function CardAdmin({data}) {
  const [showDialog, setShowDialog] = React.useState(false)
  const {logout, request} = React.useContext(AuthContext)
  const {_id, doctor_name, description, registrant_list = []} = data

  const queryCache = useQueryClient()

  const deleteMutation = useMutation((appointment_id) => {
    const options = {
      method: 'DELETE',
    }

    const loading = toast.loading('Deleting')

    return request(`/appointment/delete/${appointment_id}`, options)
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

  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

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
                    {registranst.first_name}
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
        <div className={styles.dialogHeader}>
          <h4 className={styles.dialogHeaderTitle}>Edit Appointment</h4>
          <ButtonIcon onClick={close} secondary={true}>
            <Close color="rgb (255,255,255)" />
          </ButtonIcon>
        </div>
      </Dialog>
    </>
  )
}

CardAdmin.propTypes = {
  data: PropTypes.object,
}
