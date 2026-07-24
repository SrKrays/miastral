import { createContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  // El token vive también acá en un ref para que authFetch siempre lea el
  // valor más nuevo, sin tener que recrear la función en cada render.
  const tokenRef = useRef(null)

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

  const userRef = useRef(user)
  useEffect(() => { userRef.current = user }, [user])
  useEffect(() => { tokenRef.current = token }, [token])

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

  const loginAdmin = async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/Auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas')
      }
      setToken(data.token)
      setUser({ email, nombre: data.nombre, rol: 'admin' })
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

  // Cierra la sesión por vencimiento del token y redirige al login que
  // corresponda (admin o cliente), con un flag en la URL para mostrar el
  // clásico "tu sesión expiró, iniciá sesión de nuevo".
  const cerrarPorExpiracion = () => {
    const eraAdmin = userRef.current?.rol === 'admin'
    logout()
    navigate(eraAdmin ? '/admin/login?expirado=1' : '/login?expirado=1')
  }

  // Wrapper de fetch para pedidos autenticados: agrega el header
  // Authorization automáticamente y, si el back devuelve 401 (token vencido
  // o inválido), cierra la sesión y redirige solo, en vez de dejar que cada
  // pantalla falle en silencio o muestre un error confuso.
  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${tokenRef.current}`,
      },
    })
    if (res.status === 401) {
      cerrarPorExpiracion()
    }
    return res
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
      loginAdmin,
      logout,
      authFetch,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
