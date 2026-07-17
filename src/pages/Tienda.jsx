import { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProductModal from '../components/ProductModal/ProductModal'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal/ScrollReveal'
import { API_URL } from '../config/api'
import { mapProducto } from '../utils/productAdapter'
import { CartContext } from '../context/CartContext'
import './Tienda.css'

/* Fallback si la API no responde (Render dormido, sin conexión, etc.) —
   así la tienda no queda vacía mientras se conecta. Mismos datos que ya
   están sembrados en la base. */
const PRODUCTOS_FALLBACK = [
  {
    id:1, tipo:'Guía física', titulo:'Conectá con tu poder creador — guía de manifestación',
    precio:'$25.000', precioNum:25000, bg:'linear-gradient(145deg,#3a2040,#1a0d28)', emoji:'◈',
    foto:'/img/guia-poder-creador-1.jpg',
    contacto:'cart', stock:20,
    desc:'Una guía práctica para comprender cómo funciona la manifestación y aprender a crear una realidad más alineada con tus deseos desde un enfoque consciente. Combina espiritualidad, ciencia y psicología para transformar creencias limitantes y desarrollar una mentalidad creadora.',
    features:[
      '✓ Contenido teórico: manifestación, leyes universales, coherencia, merecimiento y bloqueos energéticos',
      '✓ Ejercicios prácticos: reprogramación de creencias, mindfulness, gratitud, escritura consciente y afirmaciones',
      '✓ Envíos a todo el país por Correo Argentino',
      '✓ ¿Estás en el exterior? Escribime y vemos cómo adquirirla',
    ],
  },
  {
    id:2, tipo:'Oráculo', titulo:'Oráculo Matriz Cuántica',
    precio:'$28.000', precioNum:28000, bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⬡', tag:'Nuevo',
    contacto:'cart', stock:50,
    desc:'¿Qué pasaría si te dejaras guiar por los mensajes del campo cuántico? Un oráculo canalizado por Valentina para conectar con el campo unificado a través de mensajes, sincronicidades y señales — una invitación a ver tu realidad con ojos cuánticos.',
    features:['✓ Mazo de 44 cartas', '✓ Bolsita de lienzo para llevarlo a todos lados'],
  },
  {
    id:3, tipo:'Oráculo', titulo:'Oráculo 11:11',
    precio:'$35.000', precioNum:35000, bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji:'✦', tag:'Últimas unidades',
    foto:'/img/oraculo-1111-1.jpg',
    contacto:'cart', stock:2,
    desc:'¿Ves números repetidos todo el tiempo pero no lográs interpretarlos? Este oráculo, creado por Marce, te invita a interpretar el lenguaje del universo y las sincronicidades, conectando con tus guías y los mensajes que tienen disponibles para vos.',
    features:['✓ Mazo de 55 cartas', '✓ Libro explicativo incluido'],
  },
  {
    id:4, tipo:'Oráculo', titulo:'Oráculo Espejo del alma',
    precio:'$36.000', precioNum:36000, bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji:'◐', tag:'Últimas unidades',
    foto:'/img/oraculo-espejo-1.jpg',
    contacto:'cart', stock:2,
    desc:'Tus guías tienen algo para decirte. Este oráculo, canalizado por Orne, te trae mensajes profundos para conectar con tu alma y con lo que tus guías te quieren transmitir.',
    features:['✓ Mazo de 22 cartas', '✓ Libro explicativo incluido'],
  },
  {
    id:5, tipo:'Cuadro original', titulo:'Cuadros pintados a mano',
    precio:'Consultar', bg:'linear-gradient(145deg,#4a2d1a,#2a1810)', emoji:'▲', tag:'Según disponibilidad',
    contacto:'mail',
    desc:'Obras únicas, pintadas a mano. La disponibilidad varía según lo que tenga pintado en el momento — escribime y te cuento qué hay.',
  },
]

const SESIONES_FALLBACK = [
  {
    id:10, tipo:'Sesión 1:1', titulo:'El poder de recordar — sesión individual',
    precio:'$70.000 (USD 70)', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'✦', foto:'/img/sesion-poder-recordar.jpg',
    contacto:'whatsapp',
    desc:'En 90 minutos vamos a recorrer las bases de tu carta, integrar tu energía y conectar con tu manera única de tomar decisiones. Ideal si es la primera vez que conectás con la herramienta o si te interesa explorar otros aspectos de tu carta.',
    descCompleta:'¿Qué vamos a analizar?\n\nSi es la primera vez que harías una sesión, se toma como base la integración de los 3 pilares de tu carta (tipo, estrategia y autoridad), pasando luego a analizar otros aspectos importantes del diseño para que te lleves la mayor información y herramientas posibles.\n\nEn el caso de personalizar la lectura para analizar algún área particular (laboral, vincular, merecimiento, etc.), la sesión se orienta a los aspectos clave de esa área.',
    detalles:[{label:'Duración', value:'90 min'}, {label:'Modalidad', value:'Online por Google Meet'}],
    features:['✓ Grabación de la sesión', '✓ PDF de tu carta', '✓ 2 cuadernillos prácticos para continuar la integración'],
    nota:'Reservá tu lugar con una seña de $30.000 (se descuenta del valor total al saldar; no reembolsable si se suspende el servicio o no te presentás).',
  },
  {
    id:11, tipo:'Pack x4', titulo:'Del macro al micro cosmos — pack de 4 sesiones',
    precio:'$252.000 (USD 252)', bg:'linear-gradient(145deg,#3a5069,#2f4156)', emoji:'◈', foto:'/img/sesion-macro-micro.jpg',
    contacto:'whatsapp',
    desc:'Te acompaño a lo largo de 4 encuentros de 90 minutos donde exploraremos diferentes aspectos de tu carta: las bases de tu energía, los centros energéticos, perfil, activaciones y canales. Ideal si buscás experimentar la herramienta en varios aspectos de tu vida.',
    descCompleta:'¿Qué vamos a analizar?\n\nSe inicia por los 3 pilares de tu diseño y luego se avanza analizando perfil, centros energéticos, canales y activaciones de tu carta, de acuerdo a lo que vayamos experimentando a lo largo de las sesiones.\n\nEn este espacio podemos llevar alguna temática específica (laboral, vincular, límites, mente, etc.) o ir dejando que la información se presente en la sesión.',
    detalles:[{label:'Duración', value:'4 encuentros de 90 min cada uno'}, {label:'Modalidad', value:'Online por Google Meet'}],
    features:['✓ Grabación de cada sesión', '✓ PDF de tu carta', '✓ 2 cuadernillos prácticos', '✓ Informe final de tu diseño'],
    nota:'Reservá tu lugar con una seña de $60.000 (se descuenta del valor total al saldar; no reembolsable si se suspende el servicio o no te presentás).',
  },
  {
    id:12, tipo:'Sesión 1:1', titulo:'On demand — sesión individual',
    precio:'$70.000 (USD 70)', bg:'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji:'⚡', foto:'/img/sesion-on-demand.jpg',
    contacto:'whatsapp',
    desc:'En 90 minutos vamos a integrar aspectos más específicos de tu carta según lo que sientas que hoy quieras profundizar o aprender sobre tu energía. Ideal si ya tenés alguna base sobre la herramienta.',
    descCompleta:'¿Qué vamos a analizar?\n\nSi ya tomaste una sesión antes conmigo o con otra persona y querés profundizar sobre algún aspecto específico de tu carta, este espacio es para vos. La lectura va orientada directamente sobre lo que desees trabajar e integrar de tu energía (comunicación, trabajo, reprogramación de pensamientos, manifestación, etc.).',
    detalles:[{label:'Duración', value:'90 min'}, {label:'Modalidad', value:'Online por Google Meet'}],
    features:['✓ Grabación de la sesión', '✓ PDF de tu carta', '✓ Material complementario de ser necesario'],
    nota:'Reservá tu lugar con una seña de $30.000 (se descuenta del valor total al saldar; no reembolsable si se suspende el servicio o no te presentás).',
  },
  {
    id:13, tipo:'Lectura vincular', titulo:'Sinergia frecuencial — lectura vincular',
    precio:'Consultar', bg:'linear-gradient(145deg,#0d1520,#19232e)', emoji:'∿', foto:'/img/sesion-sinergia.jpg',
    contacto:'whatsapp',
    desc:'En 90 minutos vamos a comprender la dinámica energética entre vos y otra persona para descubrir cómo se potencian, cuáles son sus desafíos y qué necesita ese vínculo para desarrollarse de forma más consciente y alineada.',
    descCompleta:'¿Qué vamos a analizar?\n\nVamos a comprender la dinámica entre vos y la otra persona (pareja, hijo, familiar, colega, etc.) cuando tu campo y el del otro interactúan: potenciales, desafíos e interacciones energéticas, respetando la naturaleza única de cada uno.\n\nPara este tipo de sesión no es necesario que la otra parte esté presente o participando de la lectura.',
    detalles:[{label:'Duración', value:'90 min'}, {label:'Modalidad', value:'Online por Google Meet'}],
    features:['✓ Grabación de la sesión', '✓ PDF de la carta de ambos', '✓ Material complementario de ser necesario'],
    nota:'Reservá tu lugar con una seña de $50.000 (se descuenta del valor total al saldar; no reembolsable si se suspende el servicio o no te presentás). Precio final a confirmar.',
  },
  {
    id:14, tipo:'PDF', titulo:'Informe personalizado — PDF',
    precio:'Consultar', bg:'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji:'◎', foto:'/img/sesion-informe.jpg',
    contacto:'mail',
    desc:'Este informe personalizado reúne los aspectos esenciales de tu Diseño Humano para que puedas reconocer tu energía de forma clara, práctica y a tu propio ritmo.',
    descCompleta:'Documento digital de más de 40 páginas para acercarte a tu energía de manera guiada: tipo, estrategia, autoridad, perfil, centros de energía, canales y activaciones, acompañado de tu gráfico y claves para integrar cada aspecto de tu carta.\n\nEste servicio no incluye sesión 1:1.',
    detalles:[{label:'Formato', value:'PDF digital, +40 páginas'}],
    features:['✓ Gráfico de tu carta + claves para integrar cada aspecto', '✓ Envío por mail una vez realizado'],
    nota:'Para este servicio necesitamos tu nombre, fecha, hora y lugar de nacimiento, y un mail donde enviarte el informe. Precio a confirmar.',
  },
]

const PROGRAMAS_FALLBACK = [
  {
    id:20, tipo:'Programa pregrabado', titulo:'Programa de transformación cuántica — 7 semanas',
    precio:'$111.000', bg:'linear-gradient(145deg,#2f4156,#19232e)', emoji:'⚛', tag:'Más vendido',
    contacto:'link', link:'https://byvalentinam.tiendup.com/curso/programadetransformacioncuantica', linkLabel:'Ver programa completo',
    desc:'7 semanas de contenido pregrabado para integrar tu Diseño Humano desde la conciencia cuántica: liberar bloqueos y transformar tu energía en magnetismo.',
  },
]

/* ── CARD única para productos, servicios y programas ── */
function TiendaCard({ item, onView, delay = 0 }) {
  const isProximo = item.contacto === 'proximamente'
  return (
    <div className="tienda-card" onClick={() => onView(item)} style={{ cursor:'pointer', animationDelay:`${delay}s` }}>
      <div className="tienda-card-img" style={{ background: item.bg }}>
        {item.foto
          ? <img src={item.foto} alt={item.titulo} className="tienda-card-photo" />
          : <span className="tienda-card-emoji">{item.emoji}</span>
        }
        {item.tag && <span className="tienda-card-tag">{item.tag}</span>}
      </div>
      <div className="tienda-card-body">
        <span className="tienda-card-tipo">{item.tipo}</span>
        <h3 className="tienda-card-title">{item.titulo}</h3>
        <div className="tienda-card-footer">
          <span className="tienda-card-precio">{item.precio}</span>
          <button className="btn-coral tienda-add-btn" onClick={e => { e.stopPropagation(); onView(item) }}>
            {isProximo ? 'Ver más' : 'Ver detalle'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Tienda() {
  const { addItem } = useContext(CartContext)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productos, setProductos] = useState(PRODUCTOS_FALLBACK)
  const [sesiones, setSesiones] = useState(SESIONES_FALLBACK)
  const [programas, setProgramas] = useState(PROGRAMAS_FALLBACK)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const handleAddCart = (item) => {
    addItem(item)
    setSelectedProduct(null)
    setToast(item.titulo)
    setTimeout(() => setToast(null), 2500)
  }

  useEffect(() => {
    let cancelado = false
    fetch(`${API_URL}/api/productos`)
      .then(res => { if (!res.ok) throw new Error('bad response'); return res.json() })
      .then(data => {
        if (cancelado || !Array.isArray(data)) return
        setProductos(data.filter(p => p.tipo === 'producto').map(mapProducto))
        setSesiones(data.filter(p => p.tipo === 'servicio').map(mapProducto))
        setProgramas(data.filter(p => p.tipo === 'programa').map(mapProducto))
      })
      .catch(() => { /* nos quedamos con el fallback */ })
      .finally(() => { if (!cancelado) setLoading(false) })
    return () => { cancelado = true }
  }, [])

  return (
    <>
      <Navbar />

      {/* PRODUCTOS */}
      <section id="productos" className="tienda-section tienda-section-first">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <h2 className="tienda-section-title">Productos</h2>
              <p className="tienda-section-desc">Guías, oráculos y materiales para tu proceso de autoconocimiento</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-grid" staggerDelay={0.12}>
            {productos.map(item => (
              <StaggerItem key={item.id} direction="up">
                <TiendaCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* SESIONES */}
      <section id="sesiones" className="tienda-section tienda-section-alt">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <h2 className="tienda-section-title">Servicios</h2>
              <p className="tienda-section-desc">Sesiones individuales y lecturas personalizadas de Diseño Humano</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-grid" staggerDelay={0.12}>
            {sesiones.map(item => (
              <StaggerItem key={item.id} direction="up">
                <TiendaCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section id="programas" className="tienda-section">
        <div className="container-astral">
          <ScrollReveal direction="up">
            <div className="tienda-section-header">
              <h2 className="tienda-section-title">Programas y talleres</h2>
              <p className="tienda-section-desc">Experiencias grupales e intensivos de transformación</p>
            </div>
          </ScrollReveal>
          <StaggerGroup className="tienda-grid" staggerDelay={0.12}>
            {programas.map(item => (
              <StaggerItem key={item.id} direction="up">
                <TiendaCard item={item} onView={setSelectedProduct} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p className="tienda-nota">
            ✦ Los programas y talleres en vivo se publican a medida que se confirman fechas. Seguí las novedades en Instagram <a href="https://www.instagram.com/byvalentinam__/" target="_blank" rel="noopener noreferrer" className="contacto-link">@byvalentinam__</a>
          </p>
        </div>
      </section>

      {toast && (
        <div className="toast-notification">
          <span>✓</span> Agregado al carrito
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddCart={handleAddCart}
        />
      )}

      <Footer />
    </>
  )
}
