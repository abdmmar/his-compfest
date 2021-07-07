import {Link} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'

import {Button} from 'components/Button'
import {RegisterSchema} from 'utils/schema'
import styles from './Register.module.scss'

const Register = () => {
  const handleRegister = (val) => {
    console.log(val)
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <h3 className={styles.registerTitle}>Register</h3>
        <p className={styles.registerDesc}>
          Sign up to Healthcare Information System to apply an appointment
        </p>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
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
                <label htmlFor="firstname">First name</label>
                <Field type="text" id="firstname" name="firstname" />
                <ErrorMessage
                  name="firstname"
                  render={(msg) => <div className={styles.error}>{msg}</div>}
                />
              </div>
              <div>
                <label htmlFor="lastname">Last name</label>
                <Field type="text" id="lastname" name="lastname" />
                <ErrorMessage
                  name="lastname"
                  render={(msg) => <div className={styles.error}>{msg}</div>}
                />
              </div>
            </section>

            <section className={styles.section}>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                render={(msg) => <div className={styles.error}>{msg}</div>}
              />
            </section>

            <section className={styles.sectionGroup}>
              <div>
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage
                  name="username"
                  render={(msg) => <div className={styles.error}>{msg}</div>}
                />
              </div>

              <div>
                <label htmlFor="age">Age</label>
                <Field type="number" id="age" name="age" />
                <ErrorMessage
                  name="age"
                  render={(msg) => <div className={styles.error}>{msg}</div>}
                />
              </div>
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
