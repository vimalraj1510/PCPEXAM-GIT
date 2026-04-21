import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Action types for the reducer
const SET_ORDERS = 'SET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

// Reducer function to manage order state
function orderReducer(state, action) {
  switch (action.type) {
    case SET_ORDERS:
      // Set the initial list of orders
      return { ...state, orders: action.payload }
    case UPDATE_ORDER:
      // Update a specific order's status
      const order = state.orders.find(o => o.orderid === action.payload.orderid)
      // Prevent updates for invalid or already delivered orders
      if (!order || order.status === 'delivered') return state
      return {
        ...state,
        orders: state.orders.map(o =>
          o.orderid === action.payload.orderid ? { ...o, ...action.payload } : o
        )
      }
    default:
      return state
  }
}

// Initial state for the context
const initialState = {
  orders: []
}

// Create the context
const OrderContext = createContext()

// Provider component to wrap the app and provide state
export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState)

  // Load data from public/data.json on mount
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        // Filter and validate orders
        const validOrders = data.filter(order => {
          // Basic validations
          if (!order.orderid || !order.restaurant && !order.restauant || !Array.isArray(order.items) || typeof order.totalamount !== 'number' || !order.status) {
            return false
          }
          // Validate items
          if (!order.items.every(item => item.name && typeof item.price === 'number' && typeof item.quantity === 'number')) {
            return false
          }
          // Additional filters
          if (order.items.length === 0) return false
          if (order.items.some(item => item.quantity < 0)) return false
          if (order.totalamount <= 0) return false
          return true
        }).map(order => ({
          // Normalize data
          orderid: order.orderid,
          customername: order.customername,
          restaurant: order.restaurant || order.restauant,
          items: order.items,
          totalamount: order.totalamount,
          status: order.status,
          deliverytime: order.deliverytime,
          rating: order.rating
        }))
        dispatch({ type: SET_ORDERS, payload: validOrders })
      })
      .catch(err => console.error('Failed to load data', err))
  }, [])

  // Compute stats dynamically
  const totalOrders = state.orders.length
  const deliveredOrders = state.orders.filter(order => order.status === 'delivered').length
  const cancelledOrders = state.orders.filter(order => order.status === 'cancelled').length

  // Expose stats globally for testing
  useEffect(() => {
    window.appState = {
      totalOrders: totalOrders,
      deliveredOrders: deliveredOrders,
      cancelledOrders: cancelledOrders
    }
  }, [state.orders])

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  )
}

// Custom hook to use the order context
export function useOrders() {
  const context = useContext(OrderContext)
  // Add a helper function to mark orders as delivered
  const markAsDelivered = (orderid) => context.dispatch({ type: UPDATE_ORDER, payload: { orderid, status: 'delivered' } })
  return { ...context, markAsDelivered }
}