import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import './Membresia.css'

const PLANES = [
  {
    id: 1,
    nombre: 'Mensual',
    precio: 'US$ 9.99',
    periodo: '/mes',
    cta: 'Quiero ser parte',
    popular: false,
    beneficios: [
      'Clases semanales actualizadas',
      'Horóscopos para todos los signos',
      'Acceso a biblioteca de contenido',
      'Descuentos en productos',
    ]
  },
  {
    id: 2,
    nombre: 'Anual',
    precio: 'US$ 89',
    periodo: 'una sola vez',
    cta: 'Activar ahora',
    popular: true,
    beneficios: [
      'Todo de Mensual +',
      'Encuentros en vivo mensuales',
      'Sesión 1-a-1 con la astróloga',
      'Comunidad privada exclusiva',
      '3 meses gratis vs. pago mensual',
    ]
  }
]

function PricingCard({ plan }) {
  return (
    <div className={`pricing-card${plan.popular ? ' popular' : ''}`}>
      {plan.popular && <span className="pricing-badge">Más elegido</span>}
      <h3 className="pricing-name">{plan.nombre}</h3>
      <div className="pricing-price">
        <span className="price">{plan.precio}</span>
        <span className="periodo">{plan.periodo}</span>
      </div>
      <button className={plan.popular ? 'btn-coral' : 'btn-outline-dark'}>
        {plan.cta}
      </button>
      <ul className="pricing-benefits">
        {plan.beneficios.map(b => (
          <li key={b}>
            <span className="benefit-check">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Membresia() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="membresia-hero">
        <div className="membresia-hero-content">
          <span className="membresia-hero-eyebrow">Membresía Astral</span>
          <h1 className="membresia-hero-title">Transformá la duda <em>en decisión</em></h1>
          <p className="membresia-hero-desc">Acceso ilimitado a contenido astrológico exclusivo, clases en vivo y una comunidad de astrolovers como vos.</p>
        </div>
        <div className="membresia-hero-decoration">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="var(--accent-coral)" />
            <circle cx="100" cy="100" r="70" fill="var(--bg-black)" opacity="0.8" />
            <circle cx="100" cy="100" r="50" fill="var(--bg-cream)" opacity="0.7" />
          </svg>
        </div>
      </section>

      {/* PLANES */}
      <section className="membresia-plans">
        <div className="container-astral">
          <h2 className="membresia-plans-title">Elige tu plan</h2>
          <div className="membresia-cards-grid">
            {PLANES.map(plan => <PricingCard key={plan.id} plan={plan} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="membresia-faq">
        <div className="container-astral">
          <h2 className="membresia-faq-title">Preguntas frecuentes</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>¿Puedo cancelar en cualquier momento?</h3>
              <p>Sí, tu membresía es flexible. Podés cancelar en cualquier momento sin penalizaciones.</p>
            </div>
            <div className="faq-item">
              <h3>¿Qué métodos de pago aceptan?</h3>
              <p>Aceptamos tarjetas de crédito/débito, MercadoPago y transferencia bancaria.</p>
            </div>
            <div className="faq-item">
              <h3>¿Hay garantía de satisfacción?</h3>
              <p>Sí, tenés 7 días para probar la membresía. Si no te gusta, te devolvemos tu dinero.</p>
            </div>
            <div className="faq-item">
              <h3>¿Cuándo comienza el acceso?</h3>
              <p>Inmediatamente después del pago confirmado. Recibirás un email con todos tus datos de acceso.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

