import { Routes, Route, Link } from 'react-router-dom'
import Orders from './components/Orders'
import OrderDetail from './components/OrderDetail'
import Filter from './components/Filter'
import Stats from './components/Stats'

// Main App component with routing
function App() {
  return (
    <div>
      {/* Navigation links */}
      <nav>
        <Link to="/orders">Orders</Link> | 
        <Link to="/filter">Filter</Link> | 
        <Link to="/stats">Stats</Link>
      </nav>
      {/* Define routes */}
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App