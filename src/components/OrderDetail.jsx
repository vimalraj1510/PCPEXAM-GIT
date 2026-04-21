import { useParams } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'

function OrderDetail() {
  const { id } = useParams()
  const { state } = useOrders()
  const order = state.orders.find(o => o.orderid === id)
  if (!order) return <div>Order not found</div>

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.orderid}</p>
      <p>Customer: {order.customername || "unknown"}</p>
      <p>Restaurant: {order.restaurant || "N/A"}</p>
      <h2>Items:</h2>
      <ul>
        {order.items.map((item, index) => (
          <li key={index} data-testid="order-item">
            {item.name || "Unknown Item"} - Subtotal: ${(item.price || 0) * (item.quantity || 0)}
          </li>
        ))}
      </ul>
      <p>Total Amount: ${order.totalamount}</p>
      <p>Status: {order.status || "N/A"}</p>
      <p>Delivery Time: {order.deliverytime || "N/A"}</p>
      {order.rating && <p>Rating: {order.rating}</p>}
    </div>
  )
}

export default OrderDetail