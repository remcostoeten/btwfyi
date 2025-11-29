import React from 'react'
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'

// Import page components
import HomePage from './pages/index'
import GettingStartedPage from './pages/getting-started'
import ConfigurationPage from './pages/configuration'
import ReactIntegrationPage from './pages/react-integration'
import VueIntegrationPage from './pages/vue-integration'
import APIPage from './pages/api'

// Define routes
const routes: Routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/getting-started',
    element: <GettingStartedPage />,
  },
  {
    path: '/configuration',
    element: <ConfigurationPage />,
  },
  {
    path: '/react-integration',
    element: <ReactIntegrationPage />,
  },
  {
    path: '/vue-integration',
    element: <VueIntegrationPage />,
  },
  {
    path: '/api',
    element: <APIPage />,
  },
]

// Create router
const router = createBrowserRouter(routes)

export default function App() {
  return (
    <RouterProvider router={router}>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Routes />
      </div>
    </RouterProvider>
  )
}