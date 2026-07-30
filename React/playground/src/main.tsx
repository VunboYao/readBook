import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { queryClient } from './shared/query-client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
  </StrictMode>,
)
