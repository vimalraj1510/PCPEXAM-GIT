import { useState } from 'react'
import { useOrders } from '../context/OrderContext'
import OrderSummary from './OrderSummary'

// Component for filtering orders by restaurant name
function Filter() {
  const { state } = useOrders()
  const [restaurant, setRestaurant] = useState('')
  const [error, setError] = useState('')

  // Handle input change and validate
  const handleInput = (e) => {
    const value = e.target.value
    setRestaurant(value)
    // Show error if input is empty
    if (!value.trim()) {
      setError('Please enter a restaurant name')
    } else {
      setError('')
    }
  }

  // Filter orders by restaurant name (case-insensitive)
  const filtered = restaurant.trim() ? state.orders.filter(order =>
    order.restaurant.toLowerCase().includes(restaurant.toLowerCase())
  ) : []

  return (
    <div>
      <h1>Filter Orders by Restaurant</h1>
      {/* Input for restaurant name */}
      <input
        type="text"
        value={restaurant}
        onChange={handleInput}
        placeholder="Enter restaurant name"
      />
      {/* Display error if any */}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {/* Show no results message if filtered is empty and input is not empty */}
      {!error && filtered.length === 0 && restaurant.trim() && <p>No result found</p>}
      {/* Display filtered orders */}
      {!error && filtered.map(order => (
        <OrderSummary key={order.orderid} order={order} />
      ))}
    </div>
  )
}

export default Filter