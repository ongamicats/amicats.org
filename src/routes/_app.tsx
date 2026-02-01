import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
    component: AppLayout,
})

function AppLayout() {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a href="/home" className="btn btn-ghost text-xl">Amicats App</a>
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
