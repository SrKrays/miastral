// Adapta la forma de "Producto" que devuelve la API (miastral-api) a la forma
// que ya usan TiendaCard / ProductCard / ProductModal en el frontend.
//
// Dos cosas que la BD todavía no tiene y viven acá como mapa local:
// - bg/emoji: son puramente decorativos, nunca los pedimos en el modelo.
// - contacto/link: qué botón mostrar (mail | whatsapp | link | proximamente).
//   Se infiere de tipo/requiereDatosNacimiento. El único caso especial es el
//   Programa, que hoy vive en Tiendup — cuando sumemos un campo Link real a
//   la BD, esto se puede sacar de acá.

const VISUAL_MAP = {
  'Conectá con tu poder creador — guía de manifestación': { bg: 'linear-gradient(145deg,#3a2040,#1a0d28)', emoji: '◈', tipoLabel: 'Guía física' },
  'Oráculo Matriz Cuántica': { bg: 'linear-gradient(145deg,#2f4156,#19232e)', emoji: '⬡', tipoLabel: 'Oráculo' },
  'Oráculo 11:11': { bg: 'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji: '✦', tipoLabel: 'Oráculo' },
  'Oráculo Espejo del alma': { bg: 'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji: '◐', tipoLabel: 'Oráculo' },
  'Cuadros pintados a mano': { bg: 'linear-gradient(145deg,#4a2d1a,#2a1810)', emoji: '▲', tipoLabel: 'Cuadro original' },
  'El poder de recordar — sesión individual': { bg: 'linear-gradient(145deg,#2f4156,#19232e)', emoji: '✦', tipoLabel: 'Sesión 1:1' },
  'Del macro al micro cosmos — pack de 4 sesiones': { bg: 'linear-gradient(145deg,#3a5069,#2f4156)', emoji: '◈', tipoLabel: 'Pack x4' },
  'On demand — sesión individual': { bg: 'linear-gradient(145deg,#1a3040,#0d1f2d)', emoji: '⚡', tipoLabel: 'Sesión 1:1' },
  'Sinergia frecuencial — lectura vincular': { bg: 'linear-gradient(145deg,#0d1520,#19232e)', emoji: '∿', tipoLabel: 'Lectura vincular' },
  'Informe personalizado — PDF': { bg: 'linear-gradient(145deg,#2d2d4a,#1a1a2e)', emoji: '◎', tipoLabel: 'PDF' },
  'Programa de transformación cuántica — 7 semanas': { bg: 'linear-gradient(145deg,#2f4156,#19232e)', emoji: '⚛', tipoLabel: 'Programa pregrabado' },
}
const VISUAL_DEFAULT = { bg: 'linear-gradient(145deg,#2f4156,#19232e)', emoji: '✦' }
const TIPO_DEFAULT = { producto: 'Producto', servicio: 'Servicio', programa: 'Programa' }

const LINKS_EXTERNOS = {
  'Programa de transformación cuántica — 7 semanas': {
    link: 'https://byvalentinam.tiendup.com/curso/programadetransformacioncuantica',
    linkLabel: 'Ver programa completo',
  },
}

function inferContacto(p) {
  if (LINKS_EXTERNOS[p.nombre]) return 'link'
  if (p.requiereDatosNacimiento) return 'mail'
  if (p.tipo === 'servicio') return 'whatsapp'
  // Producto físico con precio fijo y stock cargado → carrito de verdad.
  if (p.tipo === 'producto' && p.precio != null && p.stock) return 'cart'
  if (p.tipo === 'producto' && p.precio == null && !p.stock) return 'proximamente'
  return 'mail'
}

function formatPrecio(p) {
  if (p.precio == null) return 'Consultar'
  const base = `$${Number(p.precio).toLocaleString('es-AR')}`
  return p.precioUSD ? `${base} (USD ${p.precioUSD})` : base
}

// contenido = mapa de ContenidoContext. Permite, sin tocar la base de datos,
// sumarle a un producto puntual (por id): más fotos (producto{id}Imagen2/3/4),
// un link externo propio (producto{id}Link/LinkLabel) y una fecha para mostrar
// como dato del evento/taller (producto{id}Fecha).
export function mapProducto(p, contenido = {}) {
  const visual = VISUAL_MAP[p.nombre] || VISUAL_DEFAULT
  const externo = LINKS_EXTERNOS[p.nombre]
  const prefijo = `producto${p.id}`

  const linkPropio = contenido[`${prefijo}Link`]
  const fotosExtra = [2, 3, 4]
    .map(n => contenido[`${prefijo}Imagen${n}`])
    .filter(Boolean)

  const detalles = [
    p.duracion ? { label: 'Duración', value: p.duracion } : null,
    p.modalidad ? { label: 'Modalidad', value: p.modalidad } : null,
  ].filter(Boolean)

  let nota = null
  if (p.sena) {
    nota = `Reservá tu lugar con una seña de $${Number(p.sena).toLocaleString('es-AR')} (se descuenta del valor total al saldar; no reembolsable si se suspende el servicio o no te presentás).`
    if (p.precio == null) nota += ' Precio final a confirmar.'
  } else if (p.requiereDatosNacimiento) {
    nota = 'Para este servicio necesitamos tu nombre, fecha, hora y lugar de nacimiento, y un mail donde enviarte el informe.'
  }

  return {
    id: p.id,
    tipo: visual.tipoLabel || TIPO_DEFAULT[p.tipo] || p.tipo,
    titulo: p.nombre,
    precio: formatPrecio(p),
    precioNum: p.precio ?? null, // número crudo para matemática del carrito (precio es un string formateado)
    bg: visual.bg,
    emoji: visual.emoji,
    tag: p.tag || null,
    foto: p.imageUrl || undefined,
    fotosExtra: fotosExtra.length ? fotosExtra : undefined,
    stock: p.stock,
    contacto: linkPropio ? 'link' : inferContacto(p),
    desc: p.descripcion,
    descCompleta: p.descripcionCompleta || undefined,
    detalles: detalles.length ? detalles : undefined,
    features: p.incluye ? p.incluye.split('|').map(s => `✓ ${s.trim()}`) : undefined,
    nota: nota || undefined,
    link: linkPropio || externo?.link,
    linkLabel: contenido[`${prefijo}LinkLabel`] || externo?.linkLabel,
    fecha: contenido[`${prefijo}Fecha`] || undefined,
  }
}
