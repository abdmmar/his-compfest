import * as React from 'react'
import {Toaster} from 'react-hot-toast'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'

import {Login, Register, Dashboard, Error} from 'pages'
import {ErrorFallback} from 'components/Error'
import PrivateRoute from 'components/PrivateRoute'
import {AuthContext} from 'context/AuthContext'

import styles from 'styles/App.module.scss'

function App() {
  const {isLoggedIn} = React.useContext(AuthContext)

  return (
    <>
      <div className={styles.app}>
        <Router>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              window.location.reload()
            }}
          >
            <Switch>
              <Route path="/" exact>
                {isLoggedIn() ? <Redirect to="/dashboard" /> : <Login />}
              </Route>
              <Route path="/register" exact component={Register} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <Route path="*" component={Error} />
            </Switch>
          </ErrorBoundary>
        </Router>
      </div>
      <Toaster />
    </>
  )
}

export default App
