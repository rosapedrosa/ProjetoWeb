import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Tarefas from './Tarefas.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'


const router = createBrowserRouter([
  {
  path: "/",
  element: <Tarefas />
},
{
  path: "/:id",
  element: <Tarefas />
},
{
  path: "/novatarefa",
  element:  <App />
  },
  {
  path: "/novatarefa/:id",
  element: <App />
  },
  {
  path: "/dashboard",
  element: <Dashboard />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />    
  </React.StrictMode>,
)

