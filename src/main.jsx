import './App.css'
import 'flowbite'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CarritoProvider } from './components/context/CarritoContext.jsx'
import App from './App.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <CarritoProvider>
    <StrictMode>
      <>
        <Toaster richColors position="top-center" />
        <App />
      </>
    </StrictMode>
  </CarritoProvider>
)