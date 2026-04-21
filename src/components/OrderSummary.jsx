// Reusable component to display a summary of an order
function OrderSummary({ order, onMarkDelivered }) {
  // Handle missing customer name
  const customer = order.customername || "unknown"
  return (
    <div>
      <p>Order ID: {order.orderid}</p>
      <p>Customer: {customer}</p>
      <p>Restaurant: {order.restaurant}</p>
      {/* Only show rating if it exists */}
      {order.rating && <p>Rating: {order.rating}</p>}
      {/* Show button only for pending orders */}
      {order.status === 'pending' && <button onClick={onMarkDelivered}>Mark as Delivered</button>}
    </div>
  )
}

export default OrderSummary