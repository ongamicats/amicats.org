import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
    component: AppLayout,
})

function AppLayout() {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to="/app/home" className="btn btn-ghost text-xl">Amicats App</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a href="/">Landing</a></li>
                    </ul>
                </div>
            </div>
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}
