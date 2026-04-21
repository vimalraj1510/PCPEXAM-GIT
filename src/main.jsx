import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { OrderProvider } from './context/OrderContext.jsx'

// Entry point for the React app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide routing */}
    <BrowserRouter>
      {/* Provide order context to the entire app */}
      <OrderProvider>
        <App />
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>,
)