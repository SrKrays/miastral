import { useState } from 'react'
import './ProductModal.css'

export default function ProductModal({ product, onClose, onAddCart }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddCart = () => {
    onAddCart({ ...product, qty: quantity })
    onClose()
  }

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
            <span className="product-modal-emoji">{product.emoji}</span>
            {product.tag && <span className="product-modal-tag">{product.tag}</span>}
          </div>

          {/* Info */}
          <div className="product-modal-info">
            <span className="product-modal-tipo">{product.tipo}</span>
            <h2 className="product-modal-title">{product.titulo}</h2>
            
            <div className="product-modal-description">
              <p>Accede a contenido exclusivo y transformador que te llevará a un nuevo nivel de comprensión astrológica.</p>
              <ul className="product-modal-features">
                <li>✓ Acceso de por vida al contenido</li>
                <li>✓ Descargas en PDF y video</li>
                <li>✓ Actualizaciones futuras incluidas</li>
                <li>✓ Garantía de satisfacción</li>
              </ul>
            </div>

            <div className="product-modal-price">{product.precio}</div>

            {/* Cantidad */}
            <div className="product-modal-qty">
              <label>Cantidad:</label>
              <div className="qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Botones */}
            <button className="btn-coral product-modal-cta" onClick={handleAddCart}>
              Agregar al carrito
            </button>
            <button className="btn-outline-dark product-modal-secondary" onClick={onClose}>
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
