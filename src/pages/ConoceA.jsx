import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
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
              <h2 className="conoce-name">Valentina Astral</h2>
              <p className="conoce-subtitle-label">CONOCE EL ADN CÓSMICO DETRÁS DE SU CREADORA</p>
            </div>

            <div className="conoce-bio-text">
              <p>
                Valentina, mejor conocida como <strong>Valen Astral</strong>, es astróloga, escritora y conferencista.
                Cuenta con la Certificación de Competencia Astrológica que otorga la Sociedad Internacional de
                Investigación Astrológica (ISAR), es instructora de yoga certificada y tiene una formación integral
                en bienestar holístico, lo cual le ha brindado herramientas multidisciplinarias en su destacada
                experiencia en el bienestar integral.
              </p>
              <p>
                Autora de 4 libros, entre los que se incluyen <em>ADN Cósmico</em> (2022) y <em>El libro de las relaciones</em> (2020),
                además de e-books importantes como <em>Rompiendo patrones</em> y la <em>Agenda Astral</em> de forma consecutiva
                desde el 2018. Ha protagonizado eventos públicos a sala llena en Argentina, México y España,
                y ha participado en alianzas claves con otras marcas y/o empresas.
              </p>
              <p>
                Se destaca por mantenerse en constante reinvención, y por su visión práctica e integral sobre el
                crecimiento personal, lo cual la ha convertido en referente y una resonante voz femenina para el
                mundo hispanohablante.
              </p>
              <p>
                Su misión, durante su larga trayectoria, ha sido comunicar y brindar lecciones para guiar a quienes
                desean revelar su potencial a través de la astrología y otras disciplinas complementarias.
                Día a día comparte, desde su plataforma y sus redes sociales, herramientas para elevar consciencia
                y apoyarnos en el proceso de crecimiento personal.
              </p>
              <p className="conoce-disclaimer">
                <strong>El contenido que se comparte en este sitio</strong> es desarrollado con la intención de crear
                consciencia sobre un tema y ofrecer lecciones para aprender al respecto. Esta información no sustituye
                el consejo de un/a especialista de la salud mental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="conoce-stats">
        <div className="container-astral">
          <div className="stats-grid">
            {[
              { num:'3M+',  label:'Seguidores en redes sociales' },
              { num:'4',    label:'Libros publicados' },
              { num:'15+',  label:'Años de trayectoria' },
              { num:'10+',  label:'Países con presencia' },
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
          <h3 className="conoce-cta-title">¿Querés conocer más sobre astrología?</h3>
          <p style={{ color:'var(--text-secondary)', marginBottom:32, fontSize:15 }}>
            Explorá todos los recursos y contenidos disponibles.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/astrologia" className="btn-coral">Explorar astrología</a>
            <a href="/tienda" className="btn-outline-white">Ver tienda</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
