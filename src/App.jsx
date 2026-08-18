import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Starfield          from './components/Starfield/Starfield'
import ScrollColorLayer   from './components/ScrollColorLayer/ScrollColorLayer'
import PageTransition     from './components/PageTransition/PageTransition'
import NotFound      from './pages/NotFound'
import Home          from './pages/Home'
import Tienda        from './pages/Tienda'
import DisenoHumano  from './pages/DisenoHumano'
import Bienestar     from './pages/Bienestar'
import ConoceA       from './pages/ConoceA'
import Contacto      from './pages/Contacto'
import Membresia     from './pages/Membresia'
import MaterialGratuito from './pages/MaterialGratuito'
import Login         from './pages/Login'
import Registro      from './pages/Registro'
import MiCuenta      from './pages/MiCuenta'
import Carrito       from './pages/Carrito'
import ConfirmacionPedido from './pages/ConfirmacionPedido'
import AdminLogin     from './pages/admin/AdminLogin'
import AdminProductos from './pages/admin/AdminProductos'
import AdminOrdenes   from './pages/admin/AdminOrdenes'
import AdminContenido from './pages/admin/AdminContenido'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollColorLayer />
      <Starfield />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<PageTransition><Home /></PageTransition>} />
          <Route path="/tienda"            element={<PageTransition><Tienda /></PageTransition>} />
          <Route path="/diseno-humano"     element={<PageTransition><DisenoHumano /></PageTransition>} />
          <Route path="/bienestar"         element={<PageTransition><Bienestar /></PageTransition>} />
          <Route path="/conoce"            element={<PageTransition><ConoceA /></PageTransition>} />
          <Route path="/contacto"          element={<PageTransition><Contacto /></PageTransition>} />
          <Route path="/membresia"         element={<PageTransition><Membresia /></PageTransition>} />
          <Route path="/material-gratuito" element={<PageTransition><MaterialGratuito /></PageTransition>} />
          <Route path="/login"             element={<PageTransition><Login /></PageTransition>} />
          <Route path="/registro"          element={<PageTransition><Registro /></PageTransition>} />
          <Route path="/mi-cuenta"         element={<PageTransition><MiCuenta /></PageTransition>} />
          <Route path="/carrito"           element={<PageTransition><Carrito /></PageTransition>} />
          <Route path="/carrito/confirmacion" element={<PageTransition><ConfirmacionPedido /></PageTransition>} />
          <Route path="/admin/login"       element={<AdminLogin />} />
          <Route path="/admin"             element={<AdminProductos />} />
          <Route path="/admin/productos"   element={<AdminProductos />} />
          <Route path="/admin/ordenes"     element={<AdminOrdenes />} />
          <Route path="/admin/contenido"   element={<AdminContenido />} />
          <Route path="*"                  element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
