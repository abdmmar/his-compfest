import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'

import {Button} from 'components/Button'
import {LoginSchema} from 'utils/schema'
import styles from './Login.module.scss'

const Login = () => {
  const handleLogin = (val) => {
    console.log(val.username)
    console.log(val.password)
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
