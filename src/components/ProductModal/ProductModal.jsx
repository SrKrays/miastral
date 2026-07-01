import { useState } from 'react'
import './ProductModal.css'

const MAIL_DEFAULT = 'valemelchior11@gmail.com'
const WHATSAPP_PHONE = '5493512115420'

const FEATURES_DEFAULT = [
  '✓ Contenido pensado para tu proceso de autoconocimiento',
  '✓ Acompañamiento personalizado',
  '✓ Espacio seguro y sin juicio',
]

/**
 * Modal de detalle reutilizable para productos, servicios y programas.
 *
 * product.contacto define el tipo de acción principal:
 *  - 'cart'         → selector de cantidad + "Agregar al carrito" (items con precio fijo)
 *  - 'whatsapp'      → botón único a WhatsApp (servicios/sesiones, sin precio fijo)
 *  - 'mail'          → botón único a mail (productos a consultar)
 *  - 'link'          → botón único a un link externo (programas alojados en Tiendup, etc.)
 *  - 'proximamente'  → sin compra, botón para dejar el mail y que se le avise
 */
export default function ProductModal({ product, onClose, onAddCart }) {
  const [quantity, setQuantity] = useState(1)
  const contacto = product.contacto || 'cart'

  const handleAddCart = () => {
    onAddCart({ ...product, qty: quantity })
    onClose()
  }

  const waHref = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    product.waText || `Hola! Me interesa "${product.titulo}", ¿me contás más?`
  )}`
  const mailHref = `mailto:${MAIL_DEFAULT}?subject=${encodeURIComponent(`Consulta sobre: ${product.titulo}`)}`
  const avisameHref = `mailto:${MAIL_DEFAULT}?subject=${encodeURIComponent(`Avisame cuando esté disponible: ${product.titulo}`)}&body=${encodeURIComponent('¡Hola Valentina! Quiero que me avises apenas esté disponible este producto 🙌')}`

  return (
    <>
      {/* Overlay */}
      <div className="product-modal-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="product-modal">
        <button className="product-modal-close" onClick={onClose}>✕</button>

        <div className="product-modal-content">
          {/* Imagen */}
          <div className="product-modal-image" style={{ background: product.bg }}>
            {product.foto
              ? <img src={product.foto} alt={product.titulo} className="product-modal-photo" />
              : <span className="product-modal-emoji">{product.emoji}</span>
            }
            {product.tag && <span className="product-modal-tag">{product.tag}</span>}
          </div>

          {/* Info */}
          <div className="product-modal-info">
            <span className="product-modal-tipo">{product.tipo}</span>
            <h2 className="product-modal-title">{product.titulo}</h2>

            <div className="product-modal-description">
              <p>{product.desc || 'Accedé a contenido exclusivo y transformador que te va a llevar a un nuevo nivel de comprensión de tu energía.'}</p>
              <ul className="product-modal-features">
                {(product.features || FEATURES_DEFAULT).map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div className="product-modal-price">{product.precio}</div>

            {/* ── Acción según tipo de contacto ── */}
            {contacto === 'cart' && (
              <>
                <div className="product-modal-qty">
                  <label>Cantidad:</label>
                  <div className="qty-selector">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="btn-coral product-modal-cta" onClick={handleAddCart}>
                  Agregar al carrito
                </button>
              </>
            )}

            {contacto === 'whatsapp' && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-coral product-modal-cta">
                Consultar por WhatsApp
              </a>
            )}

            {contacto === 'mail' && (
              <a href={mailHref} className="btn-coral product-modal-cta">
                Escribime por mail
              </a>
            )}

            {contacto === 'link' && (
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn-coral product-modal-cta">
                {product.linkLabel || 'Ver programa completo'}
              </a>
            )}

            {contacto === 'proximamente' && (
              <a href={avisameHref} className="btn-coral product-modal-cta">
                Avisame cuando esté
              </a>
            )}

            <button className="btn-outline-dark product-modal-secondary" onClick={onClose}>
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
