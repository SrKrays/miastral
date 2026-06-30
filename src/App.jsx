import { Routes, Route } from 'react-router-dom'
import Starfield   from './components/Starfield/Starfield'
import Home       from './pages/Home'
import Tienda     from './pages/Tienda'
import Astrologia from './pages/Astrologia'
import Bienestar  from './pages/Bienestar'
import ConoceA    from './pages/ConoceA'
import Contacto   from './pages/Contacto'
import Login      from './pages/Login'
import Registro   from './pages/Registro'
import MiCuenta   from './pages/MiCuenta'
import Carrito    from './pages/Carrito'

function App() {
  return (
    <>
      <Starfield />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/tienda"    element={<Tienda />} />
        <Route path="/astrologia" element={<Astrologia />} />
        <Route path="/bienestar" element={<Bienestar />} />
        <Route path="/conoce"    element={<ConoceA />} />
        <Route path="/contacto"  element={<Contacto />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/registro"  element={<Registro />} />
        <Route path="/mi-cuenta" element={<MiCuenta />} />
        <Route path="/carrito"   element={<Carrito />} />
      </Routes>
    </>
  )
}

export default App
