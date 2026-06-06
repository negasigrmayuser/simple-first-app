import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// 1. Import the Provider from react-redux and your configured store
import { Provider } from 'react-redux'
import { store } from './app/store.js' // Adjust this path based on where your store file is located

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap everything inside the Provider and pass the store */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)