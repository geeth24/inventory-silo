import { AuthContextProvider } from "@/components/context/AuthContext"
import ProtectedRoute from "@/components/context/ProtectedRoute"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
const noAuthRequired = ["/", "/signin", "/password-reset"]

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()

    return (
        <>
            <AuthContextProvider>
                {noAuthRequired.includes(router.pathname) ? (
                    <Component {...pageProps} />
                ) : (
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                )}
            </AuthContextProvider>
        </>
    )
}
