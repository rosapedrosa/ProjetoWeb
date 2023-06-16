import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Tarefas from './Tarefas.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
  path: "/",
  element: <Tarefas />
},
{
  path: "/novatarefa",
  element:  <App />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />    
  </React.StrictMode>,
)

