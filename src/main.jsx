import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './CONTEXT/StoreContext.jsx'
import { AdminProductProvider } from './Admin/context/ProductContext.jsx'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <AdminProductProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </AdminProductProvider>
)
