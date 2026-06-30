import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('astral_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('astral_token') || null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Persistir token y user
  useEffect(() => {
    if (token) {
      localStorage.setItem('astral_token', token)
    } else {
      localStorage.removeItem('astral_token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('astral_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('astral_user')
    }
  }, [user])

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Conectar a backend cuando esté listo
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()
      // setToken(data.token)
      // setUser(data.user)
      
      // Por ahora, simulamos login exitoso
      setUser({ 
        id: '1', 
        email, 
        nombre: email.split('@')[0],
        rol: 'USER'
      })
      setToken('mock-token-' + Date.now())
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email, password, nombre) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Conectar a backend cuando esté listo
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, nombre })
      // })
      // const data = await response.json()
      // setToken(data.token)
      // setUser(data.user)
      
      // Por ahora, simulamos registro exitoso
      setUser({ 
        id: Math.random().toString(36).substr(2, 9),
        email, 
        nombre,
        rol: 'USER'
      })
      setToken('mock-token-' + Date.now())
      return true
    } catch (err) {
      setError(err.message)
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
