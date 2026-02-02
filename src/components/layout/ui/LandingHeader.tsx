import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import logo from '../../../assets/logo.png'

export function LandingHeader() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrolled])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-base-100/80 backdrop-blur-md shadow-sm py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="navbar">
                    <div className="navbar-start">
                        <Link to="/" className="btn btn-ghost text-xl gap-2 hover:bg-transparent">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    {/* Using a placeholder or the actual logo if verified */}
                                    <img src={logo} alt="Amicats Logo" />
                                </div>
                            </div>
                            <span className={`font-bold text-2xl tracking-tight transition-colors ${scrolled ? 'text-base-content' : 'text-base-content'}`}>
                                AmiCat's
                            </span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 font-medium text-lg">
                            <li><a href="#about">Sobre</a></li>
                            <li><a href="#adopt">Adote</a></li>
                            <li><a href="#help">Como Ajudar</a></li>
                            <li><a href="#contact">Contato</a></li>
                        </ul>
                    </div>

                    <div className="navbar-end gap-2">
                        <Link to="/home" className="btn btn-primary btn-sm md:btn-md rounded-full px-6 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
