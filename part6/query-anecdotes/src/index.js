import React from 'react'
import ReactDOM from 'react-dom/client'
import { Query, QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)