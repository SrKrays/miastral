import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('astral_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  // Persistir carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('astral_cart', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => 
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeItem(id)
      return
    }
    setItems(prev => 
      prev.map(i => i.id === id ? { ...i, qty } : i)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((acc, item) => acc + (item.precio * item.qty), 0)
  }

  const getItemCount = () => {
    return items.reduce((acc, item) => acc + item.qty, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      total: getTotal(),
      count: getItemCount(),
    }}>
      {children}
    </CartContext.Provider>
  )
}
