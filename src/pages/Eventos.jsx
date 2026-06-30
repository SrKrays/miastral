import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Eventos.css'

const EVENTOS = [
  { id: 1, titulo: 'El poder de recordar quién sos', fecha: '12 de julio', hora: '19:00 hs', lugar: 'En vivo + Grabación', precio: '$15.000', capacidad: '50 lugares', emoji: '✦' },
  { id: 2, titulo: 'Tribu & Diseño Humano (nueva cohorte)', fecha: '3 de agosto', hora: '18:30 hs', lugar: 'Zoom', precio: '$77.000', capacidad: '20 lugares', emoji: '✺' },
  { id: 3, titulo: 'Del macro al micro cosmos', fecha: '15 de agosto', hora: '20:00 hs', lugar: 'Zoom + Grabación', precio: '$95.000', capacidad: '15 lugares', emoji: '⚛' },
  { id: 4, titulo: 'Sesión grupal: Conocé tu BodyGraph', fecha: '1 de septiembre', hora: '19:30 hs', lugar: 'Zoom privado', precio: '$25.000', capacidad: '30 lugares', emoji: '◈' },
  { id: 5, titulo: 'Taller: Centros energéticos en profundidad', fecha: '10 de septiembre', hora: '20:00 hs', lugar: 'En vivo + VOD', precio: '$35.000', capacidad: '40 lugares', emoji: '◐' },
  { id: 6, titulo: 'Encuentro de fin de semana: Conciencia corporal', fecha: '21-23 de septiembre', hora: 'Todo el día', lugar: 'Córdoba, Argentina', precio: '$199.000', capacidad: '20 lugares', emoji: '∿' },
]

function EventoCard({ evento }) {
  return (
    <div className="evento-card">
      <div className="evento-card-header">
        <span className="evento-emoji">{evento.emoji}</span>
        <span className="evento-precio">{evento.precio}</span>
      </div>
      <div className="evento-card-body">
        <h3 className="evento-titulo">{evento.titulo}</h3>
        <div className="evento-details">
          <div className="evento-detail">
            <span className="evento-label">Fecha</span>
            <span className="evento-value">{evento.fecha}</span>
          </div>
          <div className="evento-detail">
            <span className="evento-label">Hora</span>
            <span className="evento-value">{evento.hora}</span>
          </div>
          <div className="evento-detail">
            <span className="evento-label">Lugar</span>
            <span className="evento-value">{evento.lugar}</span>
          </div>
          <div className="evento-detail">
            <span className="evento-label">Capacidad</span>
            <span className="evento-value">{evento.capacidad}</span>
          </div>
        </div>
        <button className="btn-coral evento-cta">Reservar ahora</button>
      </div>
    </div>
  )
}

export default function Eventos() {
  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="eventos-banner">
        <h1 className="eventos-banner-title">Eventos en vivo</h1>
        <p className="eventos-banner-subtitle">Conectá con tu tribu en encuentros transformadores de Diseño Humano</p>
      </section>

      {/* EVENTOS */}
      <section className="eventos-section">
        <div className="container-astral">
          <div className="eventos-header">
            <h2 className="eventos-title">Próximos eventos</h2>
            <p className="eventos-desc">Clases, talleres, encuentros en vivo y sesiones grupales</p>
          </div>
          <div className="eventos-grid">
            {EVENTOS.map(evento => <EventoCard key={evento.id} evento={evento} />)}
          </div>
        </div>
      </section>

      {/* INFORMACIÓN */}
      <section className="eventos-info">
        <div className="container-astral">
          <div className="info-grid">
            <div className="info-item">
              <h3>¿Cómo participar?</h3>
              <ol>
                <li>Selecciona el evento que te interesa</li>
                <li>Haz click en "Reservar ahora"</li>
                <li>Completa tus datos</li>
                <li>Realiza el pago</li>
                <li>¡Recibe el link para acceder!</li>
              </ol>
            </div>
            <div className="info-item">
              <h3>Preguntas frecuentes</h3>
              <ul>
                <li><strong>¿Puedo acceder desde cualquier dispositivo?</strong> Sí, desde cualquier PC, tablet o celular.</li>
                <li><strong>¿Se quedan grabadas?</strong> La mayoría de los eventos quedan disponibles bajo demanda.</li>
                <li><strong>¿Hay devolución?</strong> Sí, hasta 24 horas antes del evento.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

