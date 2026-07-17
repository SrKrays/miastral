import { createContext, useState, useEffect } from 'react'
import { API_URL } from '../config/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dh_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('dh_token') || null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Persistir token y user
  useEffect(() => {
    if (token) {
      localStorage.setItem('dh_token', token)
    } else {
      localStorage.removeItem('dh_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('dh_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('dh_user')
    }
  }, [user])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Email o contraseña incorrectos')
      }
      setToken(data.token)
      setUser({ email: data.email, nombre: data.nombre, rol: 'usuario' })
      return true
    } catch (err) {
      setError(err.message || 'No pudimos conectar con el servidor, intentá de nuevo.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async ({ nombre, apellido, email, password, telefono }) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/Auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, password, telefono }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'No pudimos crear la cuenta.')
      }
      setToken(data.token)
      setUser({ email: data.email, nombre: data.nombre, rol: 'usuario' })
      return true
    } catch (err) {
      setError(err.message || 'No pudimos conectar con el servidor, intentá de nuevo.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setError(null)
  }

  const isAuthenticated = () => {
    return !!user && !!token
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      error,
      login,
      register,
      logout,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
