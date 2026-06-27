import { createContext, useContext, useState } from 'react'
import { getGameById } from '../data/games'

const OrderContext = createContext(null)
const ORDERS_KEY = 'dgames-orders'

function loadOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function resolveOrderItem(item) {
  if (item.type === 'game') {
    const game = getGameById(item.id)
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      type: item.type,
      magnetLink: game?.magnetLink || item.magnetLink,
    }
  }

  if (item.type === 'bundle') {
    const bundleItems = (item.bundleItems || []).map((bi) => {
      if (bi.type === 'game') {
        const game = getGameById(bi.id)
        return { ...bi, magnetLink: game?.magnetLink }
      }
      return bi
    })
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      type: item.type,
      bundleItems,
    }
  }

  return {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    type: item.type,
  }
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders)

  const createOrder = (cartItems, paymentInfo) => {
    const order = {
      id: `DG-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      items: cartItems.map(resolveOrderItem),
      total: cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      paymentLast4: paymentInfo.cardNumber.slice(-4),
      status: 'completed',
    }
    const updated = [order, ...orders]
    setOrders(updated)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
    return order
  }

  const getOrder = (id) => orders.find((o) => o.id === id)

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrders must be used within OrderProvider')
  return ctx
}
