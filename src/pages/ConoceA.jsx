import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './ConoceA.css'

export default function ConoceA() {
  return (
    <>
      <Navbar />

      {/* HERO FOTO GRANDE */}
      <section className="conoce-hero">
        <div className="conoce-hero-photo">
          <div className="conoce-photo-placeholder">
            <span className="conoce-photo-icon">✦</span>
          </div>
          <div className="conoce-hero-overlay" />
        </div>
        <div className="conoce-hero-decor" />
      </section>

      {/* BIO SECTION */}
      <section className="conoce-bio">
        <div className="container-astral">
          <div className="conoce-bio-inner">
            <div className="conoce-bio-header">
              <p className="section-eyebrow">Conoce quién es</p>
              <h2 className="conoce-name">Valentina Melchior</h2>
              <p className="conoce-subtitle-label">DISEÑO HUMANO & FÍSICA CUÁNTICA AL SERVICIO DE TU AUTOCONOCIMIENTO</p>
            </div>

            <div className="conoce-bio-text">
              <p>
                Hola corazón, me presento como corresponde para una persona apasionada del Diseño Humano.
                Soy <strong>Generadora Manifestante</strong> con Autoridad esplénico-generada y perfil 2/4.
                Como mi tipo lo revela, llevo muchas identidades en una sola alma, y hoy mi mayor alegría es
                ofrecer comprensión, aceptación y honra a quienes elijan abrirse a este viaje de autoconocimiento
                tan profundo.
              </p>
              <p>
                Acompaño a personas a <strong>recordar</strong> su valor, a <strong>reconectar</strong> con su
                energía única y a <strong>encarnar</strong> la autenticidad que vinieron a expresar en este mundo
                desde la conciencia corporal.
              </p>
              <p>
                Diseño Humano llegó a mi vida en una gran crisis de identidad laboral. Como Arquitecta no me
                encontraba con mi profesión ni con la manera en la que se la ejercía. Tenía muchas dudas e
                inquietudes sobre mi identidad y mi manera de moverme que para el mundo "estaban falladas".
                Yo me creía fallada, creía que había algo malo en mí por el simple hecho de no poder encajar
                con lo que se suponía que "debía ser". Y ahí me encontró el Diseño Humano, trayendo claridad,
                entendimiento, honra, suavidad y aceptación a mi vida.
              </p>
              <p>
                Creo profundamente que <em>somos pura energía</em>, y que cuando entendemos cómo funcionamos
                energéticamente y honramos nuestra frecuencia, nos abrimos a vivir realidades más ligeras,
                creativas, coherentes, expansivas y magnéticas. Mi propósito actual es acompañarte a que te
                veas sin juicio, honres quien viniste a ser y te alinees a tu realidad deseada.
              </p>
              <p className="conoce-disclaimer">
                <strong>El contenido que se comparte en este sitio</strong> es desarrollado con la intención de crear
                consciencia sobre un tema y ofrecer espacios para aprender al respecto. Esta información no sustituye
                el consejo de un/a especialista de la salud mental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="conoce-stats">
        <div className="container-astral">
          <div className="stats-grid">
            {[
              { num:'✦',  label:'Generadora Manifestante — Autoridad esplénico-generada, perfil 2/4' },
              { num:'⚛',  label:'De Arquitecta a guía de Diseño Humano y Física Cuántica' },
              { num:'◈',  label:'Creadora del oráculo Matriz Cuántica' },
              { num:'✺',  label:'Creadora del podcast "El poder de recordar quien eres"' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="conoce-cta">
        <div className="container-astral" style={{ textAlign:'center' }}>
          <h3 className="conoce-cta-title">¿Querés conocer más sobre Diseño Humano?</h3>
          <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:15 }}>
            Explorá todos los recursos y contenidos disponibles.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/diseno-humano" className="btn-coral">Explorar Diseño Humano</a>
            <a href="/tienda" className="btn-outline-white">Ver tienda</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
