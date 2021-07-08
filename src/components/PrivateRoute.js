import * as React from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

import {AuthContext} from 'context/AuthContext'

const PrivateRoute = ({component: Component, ...otherProps}) => {
  const {isLoggedIn} = React.useContext(AuthContext)

  return (
    <Route
      {...otherProps}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/'} />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default PrivateRoute
