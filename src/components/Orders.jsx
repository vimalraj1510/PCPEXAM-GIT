import { useOrders } from '../context/OrderContext'
import OrderSummary from './OrderSummary'

// Component for displaying pending orders
function Orders() {
  const { state, markAsDelivered } = useOrders()
  // Filter to show only pending orders
  const pendingOrders = state.orders.filter(order => order.status === 'pending')
  return (
    <div className="card">
      <h1>Pending Orders</h1>
      {/* Map over pending orders and display using OrderSummary */}
      {pendingOrders.map(order => (
        <OrderSummary key={order.orderid} order={order} onMarkDelivered={() => markAsDelivered(order.orderid)} />
      ))}
    </div>
  )
}

export default Orders