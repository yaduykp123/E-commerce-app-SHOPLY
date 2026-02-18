import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Admin/context/AuthContext.jsx'
import { StoreProvider } from '../public/StoreContext.jsx'
import { AdminProductProvider } from './Admin/context/ProductContext.jsx'


createRoot(document.getElementById('root')).render(
 <AuthProvider>
  <AdminProductProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
    </AdminProductProvider>
  </AuthProvider>
)
