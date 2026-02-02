import { createFileRoute, Link } from '@tanstack/react-router'
import { AlertCircle } from 'lucide-react'

// Although __root configures it as a component, we can define it here.
// Attempting to export a Route for it in case it's used as a direct route too.
// If purely for 404 handling, the component export is enough.
// The user asked for "it's own route".

export const Route = createFileRoute('/not-found/')({
    component: NotFound,
})

export function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
            <div className="text-secondary mb-4 opacity-50">
                <AlertCircle size={64} />
            </div>
            <h1 className="text-9xl font-black text-primary/20 select-none">404</h1>
            <h2 className="text-4xl font-bold mt-[-2rem] mb-4 text-base-content">Página não encontrada</h2>
            <p className="text-lg opacity-60 mb-8 max-w-md mx-auto">
                Ops! Parece que os gatinhos brincaram com os cabos e esta página se perdeu.
            </p>
            <Link to="/" className="btn btn-primary rounded-full px-8 shadow-lg">
                Voltar para o Início
            </Link>
        </div>
    )
}
