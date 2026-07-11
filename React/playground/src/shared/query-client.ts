import { QueryClient } from '@tanstack/react-query'

/** 学到 05/08 章时在 main 或 App 里挂 QueryClientProvider */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})
