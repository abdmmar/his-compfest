import * as React from 'react'
import PropTypes from 'prop-types'
import decode from 'jwt-decode'
import toast from 'react-hot-toast'
import {useHistory} from 'react-router'

const URL = 'http://localhost:9191'
const TOKEN = localStorage.getItem('JWT_TOKEN')

export const AuthContext = React.createContext({})

export default function AuthProvider({children}) {
  const [user, setUser] = React.useState(TOKEN != null ? decode(TOKEN) : null)
  const history = useHistory()

  const register = async (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await fetch(`${URL}/user/register`, options)
    const result = await res.json()

    if (result.type !== 'success' || result.status !== 200)
      return await Promise.reject(result)

    return await Promise.resolve(result)
  }

  const login = async (data) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await fetch(`${URL}/user/login`, options)

    /*
      Response value:

      res = {
        "type": "success",
        "status": 200,
        "message": "Auth success",
        "data": {
          "token": "JWT_TOKEN"
        }
      }
    */

    const result = await res.json()

    if (result.type !== 'success' || result.status !== 200)
      return await Promise.reject(result)

    setToken(result.data?.token)
    setUser(getUser())

    return await Promise.resolve(result)
  }

  const logout = () => {
    setUser(null)
    removeToken()
  }

  const isLoggedIn = () => {
    const data = getUser()

    if (data == null) {
      return false
    }

    const now = Date.now().valueOf() / 1000

    // Check if token is expired
    if (data.exp == null && data.exp < now) {
      toast.error('Token is expired')
      logout()
      history.push('/')
      return false
    }

    return true
  }

  const isLoggedInAsAdmin = () => {
    const data = getUser()

    if (data == null) {
      return false
    }

    const now = Date.now().valueOf() / 1000

    // Check if token is expired
    if (data.exp == null && data.exp < now) {
      return false
    }

    if (data == null) return false
    if (data.role === 'admin') return true
  }

  const setToken = (token) => {
    localStorage.setItem('JWT_TOKEN', token)
  }

  const getToken = () => {
    return localStorage.getItem('JWT_TOKEN')
  }

  const removeToken = () => {
    localStorage.removeItem('JWT_TOKEN')
  }

  const getUser = () => {
    const token = getToken()
    if (token != null) {
      const userData = decode(token)
      return userData
    }
    return null
  }

  const request = async (endpoint, options) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    }

    const res = await fetch(`${URL}${endpoint}`, {headers, ...options})
    const result = await res.json()

    if (result.type !== 'success' || result.status !== 200)
      return await Promise.reject(result)

    return await Promise.resolve(result)
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoggedIn,
        isLoggedInAsAdmin,
        user,
        request,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.node,
  ]),
}
