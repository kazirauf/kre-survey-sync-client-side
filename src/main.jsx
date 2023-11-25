import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'
import AuthProvider from './Context/AuthProvider'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <AuthProvider>
   <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
    </QueryClientProvider>
 
   <ToastContainer/>
  </React.StrictMode>,
)
