import * as React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {useQueryClient, useMutation} from 'react-query'
import toast from 'react-hot-toast'

import {Button} from 'components/Button'
import {AuthContext} from 'context/AuthContext'
import {LoginSchema} from 'utils/schema'
import styles from './Login.module.scss'

const Login = () => {
  const queryCache = useQueryClient()
  const history = useHistory()

  const {login} = React.useContext(AuthContext)

  const mutation = useMutation(['login'], (data) => {
    const loading = toast.loading('Authenticating')

    return login(data)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Authenticated!')
          toast.dismiss(loading)

          history.push('/dashboard')

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

  const handleLogin = (val) => {
    mutation.mutate(val)
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h3 className={styles.loginTitle}>Login</h3>
        <p className={styles.loginDesc}>Please login to make an appointment</p>
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={(val) => handleLogin(val)}
        >
          <Form className={styles.form}>
            <section className={styles.section}>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage
                name="username"
                render={(msg) => <div className={styles.error}>{msg}</div>}
              />
            </section>

            <section className={styles.section}>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                render={(msg) => <div className={styles.error}>{msg}</div>}
              />
            </section>

            <div className={styles.sectionBtn}>
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </Formik>
        <p className={styles.link}>
          Doesn&apos;t have any account yet?
          <br />
          <Link to="/register">Register -&gt;</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
