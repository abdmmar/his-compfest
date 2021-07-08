import * as React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useMutation} from 'react-query'
import toast from 'react-hot-toast'

import {Button} from 'components/Button'
import {RegisterSchema} from 'utils/schema'
import {AuthContext} from 'context/AuthContext'
import styles from './Register.module.scss'

const Register = () => {
  const history = useHistory()

  const {register} = React.useContext(AuthContext)

  const mutation = useMutation(['register'], (data) => {
    const loading = toast.loading('Registering')

    return register(data)
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          toast.success('Registered!')
          toast.dismiss(loading)

          history.push('/')

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

  const handleRegister = (val) => {
    mutation.mutate(val)
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <div className={styles.registerHeader}>
          <img
            src="/favicon.png"
            alt="Healthcare Information System Logo"
            width="28px"
            height="28px"
          />
          <h3 className={styles.registerTitle}>Register</h3>
        </div>
        <p className={styles.registerDesc}>
          Sign up to Healthcare Information System to apply an appointment
        </p>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            age: '',
            username: '',
            password: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={(val) => handleRegister(val)}
        >
          <Form className={styles.form}>
            <section className={styles.sectionGroup}>
              <div>
                <label htmlFor="first_name">First name</label>
                <Field type="text" id="first_name" name="first_name" />
                <ErrorMessage
                  name="first_name"
                  render={(msg) => (
                    <small className={styles.error}>{msg}</small>
                  )}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last name</label>
                <Field type="text" id="last_name" name="last_name" />
                <ErrorMessage
                  name="last_name"
                  render={(msg) => (
                    <small className={styles.error}>{msg}</small>
                  )}
                />
              </div>
            </section>

            <section className={styles.section}>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                render={(msg) => <small className={styles.error}>{msg}</small>}
              />
            </section>

            <section className={styles.sectionGroup}>
              <div>
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage
                  name="username"
                  render={(msg) => (
                    <small className={styles.error}>{msg}</small>
                  )}
                />
              </div>

              <div>
                <label htmlFor="age">Age</label>
                <Field type="number" id="age" name="age" min="0" />
                <ErrorMessage
                  name="age"
                  render={(msg) => (
                    <small className={styles.error}>{msg}</small>
                  )}
                />
              </div>
            </section>

            <section className={styles.section}>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                render={(msg) => <small className={styles.error}>{msg}</small>}
              />
            </section>

            <div className={styles.sectionBtn}>
              <Button type="submit">Register</Button>
            </div>
          </Form>
        </Formik>
        <p className={styles.link}>
          Already have an account? <Link to="/">Login -&gt;</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
