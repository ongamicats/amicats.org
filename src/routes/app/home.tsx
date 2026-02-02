import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/home')({
    component: HomePage,
})

function HomePage() {
    return (
        <div className="prose lg:prose-xl mx-auto">
            <h1>Welcome Home</h1>
            <p>This is the private application area.</p>
        </div>
    )
}
