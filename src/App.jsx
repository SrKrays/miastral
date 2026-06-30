import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Starfield          from './components/Starfield/Starfield'
import ScrollColorLayer   from './components/ScrollColorLayer/ScrollColorLayer'
import PageTransition     from './components/PageTransition/PageTransition'
import Home          from './pages/Home'
import Tienda        from './pages/Tienda'
import Astrologia    from './pages/Astrologia'
import Bienestar     from './pages/Bienestar'
import ConoceA       from './pages/ConoceA'
import Contacto      from './pages/Contacto'
import Login         from './pages/Login'
import Registro      from './pages/Registro'
import MiCuenta      from './pages/MiCuenta'
import Carrito       from './pages/Carrito'

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollColorLayer />
      <Starfield />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
          <Route path="/tienda"     element={<PageTransition><Tienda /></PageTransition>} />
          <Route path="/astrologia" element={<PageTransition><Astrologia /></PageTransition>} />
          <Route path="/bienestar"  element={<PageTransition><Bienestar /></PageTransition>} />
          <Route path="/conoce"     element={<PageTransition><ConoceA /></PageTransition>} />
          <Route path="/contacto"   element={<PageTransition><Contacto /></PageTransition>} />
          <Route path="/login"      element={<PageTransition><Login /></PageTransition>} />
          <Route path="/registro"   element={<PageTransition><Registro /></PageTransition>} />
          <Route path="/mi-cuenta"  element={<PageTransition><MiCuenta /></PageTransition>} />
          <Route path="/carrito"    element={<PageTransition><Carrito /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
