import { useOrders } from '../context/OrderContext'

// Component for displaying order statistics
function Stats() {
  const { state } = useOrders()
  // Compute total orders
  const totalOrders = state.orders.length
  // Compute delivered orders using reduce
  const deliveredOrders = state.orders.reduce((count, order) => order.status === 'delivered' ? count + 1 : count, 0)
  // Compute cancelled orders using reduce
  const cancelledOrders = state.orders.reduce((count, order) => order.status === 'cancelled' ? count + 1 : count, 0)
  return (
    <div>
      <h1>Stats</h1>
      {/* Display stats with test IDs */}
      <div data-testid="total-orders">{totalOrders}</div>
      <div data-testid="delivered-orders">{deliveredOrders}</div>
      <div data-testid="cancelled-orders">{cancelledOrders}</div>
    </div>
  )
}

export default Stats