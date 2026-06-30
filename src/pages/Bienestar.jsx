import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Bienestar.css'

const CONTENT_BIENESTAR = [
  { id:1, section:'manifestacion', tipo:'Manifestación', titulo:'Manifestación 101: poniendo las bases para crear desde otro lugar', desc:'Descubrí los fundamentos para crear desde la intención y la claridad.', emoji:'🌙', bg:'linear-gradient(145deg,#3a5069,#2f4156)' },
  { id:2, section:'manifestacion', tipo:'Manifestación', titulo:'Manifestación 102: 4 pasos importantes en el proceso de crear lo que deseas', desc:'Aprende los pasos prácticos para manifestar tus deseos en la realidad.', emoji:'⭐', bg:'linear-gradient(145deg,#2f4156,#19232e)' },
  { id:3, section:'yoga', tipo:'Yoga', titulo:'Clase de yoga: Preparación para la luna llena', desc:'Una práctica suave y poderosa para conectar con la energía lunar.', emoji:'🧘', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)' },
  { id:4, section:'yoga', tipo:'Yoga', titulo:'Yoga energético: Activa tu poder interno', desc:'Fortalece tu cuerpo y eleva tu vibración con esta práctica transformadora.', emoji:'🙏', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)' },
  { id:5, section:'magnetismo', tipo:'Magnetismo', titulo:'Magnetismo venusino: usa tu Venus natal para proyectar lo que deseas', desc:'Conectá con tu magnetismo natural y atrae lo que realmente quieres en la vida.', emoji:'💎', bg:'linear-gradient(145deg,#3a2040,#1a0d28)' },
  { id:6, section:'detox', tipo:'Detox Energético', titulo:'Dopamine detox: cómo limpiar tu energía de hábitos destructivos', desc:'Un proceso guiado para dejar ir lo que no te sirve y crear espacio para lo nuevo.', emoji:'🌿', bg:'linear-gradient(145deg,#0d1520,#19232e)' },
]

function WellnessCard({ item, delay = 0 }) {
  return (
    <div className="wellness-card anim-fadeInUp" style={{ animationDelay: `${delay}s` }}>
      <div className="wellness-card-img" style={{ background: item.bg }}>
        <span className="wellness-card-emoji">{item.emoji}</span>
      </div>
      <div className="wellness-card-body">
        <span className="wellness-card-tipo">{item.tipo}</span>
        <h3 className="wellness-card-title">{item.titulo}</h3>
        <p className="wellness-card-desc">{item.desc}</p>
        <button className="btn-blue wellness-card-cta">Ver clase</button>
      </div>
    </div>
  )
}

export default function Bienestar() {
  const manifestacionItems = CONTENT_BIENESTAR.filter(i => i.section === 'manifestacion')
  const yogaItems = CONTENT_BIENESTAR.filter(i => i.section === 'yoga')
  const magnetismoItems = CONTENT_BIENESTAR.filter(i => i.section === 'magnetismo')
  const detoxItems = CONTENT_BIENESTAR.filter(i => i.section === 'detox')

  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="wellness-banner">
        <div className="wellness-banner-decoration wellness-banner-left">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--bg-cream)" />
            <circle cx="100" cy="100" r="85" fill="var(--accent-coral)" />
            <circle cx="100" cy="100" r="60" fill="var(--bg-black)" opacity="0.8" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="var(--text-dark)" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
        <div className="wellness-banner-content">
          <h1 className="wellness-banner-title">Bienestar</h1>
          <p className="wellness-banner-subtitle">Cuida tu mente, tu cuerpo y tu espíritu</p>
        </div>
        <div className="wellness-banner-decoration wellness-banner-right">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--bg-cream)" />
            <circle cx="100" cy="100" r="80" fill="var(--bg-black)" />
            <circle cx="100" cy="100" r="70" fill="var(--accent-coral)" opacity="0.9" />
            <circle cx="70" cy="70" r="25" fill="var(--bg-cream)" opacity="0.6" />
          </svg>
        </div>
      </section>

      {/* MANIFESTACIÓN */}
      <section id="manifestacion" className="wellness-section">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Manifestación</h2>
            <p className="wellness-section-desc">Aprendé a crear la vida que deseas</p>
          </div>
          <div className="wellness-cards-grid">
            {manifestacionItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* YOGA */}
      <section id="yoga" className="wellness-section wellness-section-alt">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Yoga y movimiento</h2>
            <p className="wellness-section-desc">Conectá con tu cuerpo y tu energía</p>
          </div>
          <div className="wellness-cards-grid">
            {yogaItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* MAGNETISMO */}
      <section id="magnetismo" className="wellness-section">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Magnetismo y atracción</h2>
            <p className="wellness-section-desc">Desplegá tu poder magnético natural</p>
          </div>
          <div className="wellness-cards-grid">
            {magnetismoItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      {/* DETOX */}
      <section id="detox" className="wellness-section wellness-section-alt">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Detox energético</h2>
            <p className="wellness-section-desc">Limpia tu energía y transforma tu vida</p>
          </div>
          <div className="wellness-cards-grid">
            {detoxItems.map((item, i) => <WellnessCard key={item.id} item={item} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

