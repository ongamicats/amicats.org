import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/landing/')({
    component: LandingPage,
})

export function LandingPage() {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-primary">Landing Page</h1>
                    <p className="py-6">
                        Welcome to Amicats.org. This is the public landing page.
                    </p>
                    <Link to="/home" className="btn btn-primary">Go to App Home</Link>
                </div>
            </div>
        </div>
    )
}
