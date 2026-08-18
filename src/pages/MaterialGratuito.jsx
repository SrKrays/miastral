import { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { ContenidoContext } from '../context/ContenidoContext'
import { getYoutubeThumb } from '../utils/youtube'
import './MaterialGratuito.css'

// clave = prefijo usado en el panel admin (Contenido) para esta card:
// {clave}Titulo, {clave}Desc y, según esVideo, {clave} (link de YouTube,
// pisa el link por defecto de abajo) o {clave}Imagen (foto subida a Ferozo).
const VIDEOS = [
  {
    id:1, clave:'materialVideo1', esVideo:true, tipo:'Video', titulo:'El poder de la palabra',
    desc:'Las palabras no son inocentes. Cada una lleva en sí una carga energética, una intención y una frecuencia que impacta no solo en quienes las reciben, sino también en quien las emite.',
    emoji:'∿', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)',
    foto:'/img/material-poder-palabra.jpg',
    link:'https://youtu.be/yjfWwwnglEA',
  },
  {
    id:2, clave:'materialVideo2', esVideo:true, tipo:'Video', titulo:'Diseño Humano y manifestación',
    desc:'Por qué cuando nos anclamos en nuestra frecuencia propia y verdadera, la manifestación y los procesos de cocreación son más alineados y suaves. Introducción a nuestra carta de Diseño Humano y al Programa de Transformación Cuántica.',
    emoji:'✺', bg:'linear-gradient(145deg,#2f4156,#19232e)',
    foto:'/img/dh-manifestacion.jpg',
    link:'https://youtu.be/tGXzNPjVgtc',
  },
  {
    id:3, clave:'materialVideo3', esVideo:true, tipo:'Video', titulo:'Reconectá con tu verdad',
    desc:'Menos mente y más conciencia corporal. La espera como acto de alineación y cómo la mente interfiere en la toma de decisiones.',
    emoji:'◐', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)',
    foto:'/img/material-reconecta.jpg',
    link:'https://youtu.be/wpdvSn7m3CY',
  },
]

const GUIAS = [
  {
    id:4, clave:'materialGuia1', esVideo:false, tipo:'Guía PDF', titulo:'Guía de centros energéticos',
    desc:'Conocé los centros de energía de tu BodyGraph y cómo cada uno influye en tu manera de tomar decisiones.',
    emoji:'⚛', bg:'linear-gradient(145deg,#0d1520,#19232e)',
    link:'https://drive.google.com/file/d/1ddLx7wW2Zl6rFWN5Eu6oiXu5IpO4-EgI/view?usp=sharing',
  },
  {
    id:5, clave:'materialGuia2', esVideo:false, tipo:'Guía PDF', titulo:'Guía de corte psicomágico',
    desc:'Un recurso práctico para trabajar el corte simbólico con patrones y vínculos que ya no te representan.',
    emoji:'◈', bg:'linear-gradient(145deg,#3a2040,#1a0d28)',
    link:'https://drive.google.com/file/d/18tGDzEjx81F9wtCeIOLL_q2llpy2vog9/view?usp=sharing',
  },
  {
    id:6, clave:'materialGuia3', esVideo:false, tipo:'Guía PDF', titulo:'Guía de reprogramación de pensamientos',
    desc:'Herramientas para identificar y transformar los patrones mentales que te alejan de tu autenticidad.',
    emoji:'✦', bg:'linear-gradient(145deg,#3a5069,#2f4156)',
    link:'https://drive.google.com/file/d/1Vf917KgDpT0f7dGiMLOAhEYO-AJAFYAc/view?usp=sharing',
  },
  {
    id:7, clave:'materialGuia4', esVideo:false, tipo:'Guía PDF', titulo:'Guía sobre conciencia corporal',
    desc:'Menos mente, más cuerpo: un recurso para volver a habitar tu conciencia corporal.',
    emoji:'⬡', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)',
    link:'https://drive.google.com/file/d/1ggKGgAf_ugEjIiH6CXu8JZcncjXmda6A/view?usp=sharing',
  },
]

function FreebieCard({ item, delay = 0, ctaLabel, contenido }) {
  const titulo = contenido?.[`${item.clave}Titulo`] || item.titulo
  const desc = contenido?.[`${item.clave}Desc`] || item.desc
  const link = item.esVideo ? (contenido?.[item.clave] || item.link) : item.link
  const foto = item.esVideo
    ? (getYoutubeThumb(link) || item.foto)
    : (contenido?.[`${item.clave}Imagen`] || item.foto)
  return (
    <a href={link} target="_blank" rel="noopener noreferrer"
       className="wellness-card anim-fadeInUp" style={{ animationDelay:`${delay}s`, textDecoration:'none' }}>
      <div className="wellness-card-img" style={{ background: item.bg }}>
        {foto
          ? <img src={foto} alt={titulo} className="wellness-card-photo" />
          : <span className="wellness-card-emoji">{item.emoji}</span>
        }
      </div>
      <div className="wellness-card-body">
        <span className="wellness-card-tipo">{item.tipo}</span>
        <h3 className="wellness-card-title">{titulo}</h3>
        <p className="wellness-card-desc">{desc}</p>
        <span className="btn-blue wellness-card-cta">{ctaLabel}</span>
      </div>
    </a>
  )
}

export default function MaterialGratuito() {
  const { contenido } = useContext(ContenidoContext)
  return (
    <>
      <Navbar />

      {/* BANNER */}
      <section className="wellness-banner">
        <div className="wellness-banner-content">
          <h1 className="wellness-banner-title">Material gratuito</h1>
          <p className="wellness-banner-subtitle">Videos y guías descargables para empezar tu proceso de autoconocimiento</p>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="wellness-section">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Videos</h2>
            <p className="wellness-section-desc">Contenido en profundidad para empezar a integrar tu energía</p>
          </div>
          <div className="wellness-cards-grid">
            {VIDEOS.map((item, i) => <FreebieCard key={item.id} item={item} delay={i * 0.1} ctaLabel="Ver video" contenido={contenido} />)}
          </div>
        </div>
      </section>

      {/* GUÍAS */}
      <section id="guias" className="wellness-section wellness-section-alt">
        <div className="container-astral">
          <div className="wellness-section-header">
            <h2 className="wellness-section-title">Guías descargables</h2>
            <p className="wellness-section-desc">Material práctico en PDF para trabajar a tu ritmo</p>
          </div>
          <div className="wellness-cards-grid">
            {GUIAS.map((item, i) => <FreebieCard key={item.id} item={item} delay={i * 0.1} ctaLabel="Descargar guía" contenido={contenido} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
