'use client'

import { CategoryProvider } from "@/lib/CategoryContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers = ({ children }) => {
    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>
        <CategoryProvider>
            {children}
        </CategoryProvider>
    </QueryClientProvider>
}

export default Providers