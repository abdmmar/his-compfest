import * as React from 'react'
import PropTypes from 'prop-types'
import {useQueryClient, useMutation} from 'react-query'
import toast from 'react-hot-toast'

import {Button} from 'components/Button'
import {AuthContext} from 'context/AuthContext'
import styles from './CardPatient.module.scss'

export default function CardPatient({data}) {
  const {_id, doctor_name, description, registrant_list = []} = data
  const list_length = registrant_list?.length
  const queryCache = useQueryClient()
  const {user, request} = React.useContext(AuthContext)

  const applyMutation = useMutation((data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const loading = toast.loading('Applying')

    return request('/appointment/apply', options)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Applied!')
          toast.dismiss(loading)

          queryCache.invalidateQueries('appointments')

          return result.data
        } else {
          toast.error(result.message)
          toast.dismiss(loading)
        }
      })
      .catch((err) => {
        toast.error(err.message)
        toast.dismiss(loading)
        return err
      })
  })

  const cancelMutation = useMutation((data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const loading = toast.loading('Canceling')

    return request('/appointment/cancel', options)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Canceled!')
          toast.dismiss(loading)

          queryCache.invalidateQueries('appointments')

          return result.data
        } else {
          toast.error(result.message)
          toast.dismiss(loading)
        }
      })
      .catch((err) => {
        toast.error(err.message)
        toast.dismiss(loading)
        return err
      })
  })

  let registrant_user_id = -1

  if (user != null) {
    for (const registrant of registrant_list) {
      if (registrant?.user_id === user?.id) {
        registrant_user_id = registrant?.user_id
      }
    }
  }

  const handleApply = () => {
    const data = {
      id: _id,
      user_id: user.id,
    }

    applyMutation.mutate(data)
  }

  const handleCancel = () => {
    const data = {
      id: _id,
      user_id: user.id,
    }

    cancelMutation.mutate(data)
  }

  return (
    <div className={styles.card}>
      <h4 className={styles.cardTitle}>{doctor_name}</h4>
      <p className={styles.cardDesc}>{description}</p>
      <p className={styles.cardCount}>
        Remaining appointments:{' '}
        <span className={styles.cardCountNum}>{10 - list_length}</span>
      </p>
      <div className={styles.cardAction}>
        {list_length >= 10 ? (
          <Button secondary={true} disabled>
            Fully Booked
          </Button>
        ) : registrant_user_id == -1 ? (
          <Button onClick={handleApply}>Apply</Button>
        ) : (
          <Button onClick={handleCancel} secondary={true}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

CardPatient.propTypes = {
  data: PropTypes.object,
}
