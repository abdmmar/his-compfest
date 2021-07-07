import {Toaster} from 'react-hot-toast'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'

import {Login, Register} from 'pages/'
import ErrorFallback from 'components/Error/Error'
import styles from 'styles/App.module.scss'

function App() {
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
            <main>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
              </Switch>
            </main>
          </ErrorBoundary>
        </Router>
      </div>
      <Toaster />
    </>
  )
}

export default App
