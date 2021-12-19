import { useState } from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { routes } from './routes';

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen( !isOpen )
    }
    return (
        <BrowserRouter>
            <nav className="navbar container">
                <div className="navbar-left">
                    <h2 className="navbar-left-logo">CuraDeuda</h2>
                    <span className="navbar-left-toggle" onClick={ handleOpen }>
                        <svg className="navbar-left-toggle-icon" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2" d="M4 8h16M4 16h16"></path>
                        </svg>
                    </span>
                </div>
                <ul className="navbar-menu">
                    {
                        routes.map( ( { to, name, isOnNavbar }, index ) => (
                            isOnNavbar &&
                            <li key={ index } className="navbar-menu-item">
                                <NavLink
                                    to={ to }
                                    className={
                                        ({ isActive }) => isActive
                                        ? 'navbar-menu-item-content active'
                                        : 'navbar-menu-item-content'
                                    }
                                >
                                    { name }
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <ul
                id="nav-menu-mobile"
                className={`${ isOpen 
                    ? 'nav-menu-mobile-open'
                    : 'nav-menu-mobile-close' 
                }`}>
                {
                    routes.map( ( { to, name, isOnNavbar }, index ) => (
                        isOnNavbar &&
                        <li key={ index } id="nav-menu-mobile-item">
                            <NavLink
                                id="nav-menu-mobile-item-content"
                                to={ to }
                                onClick={ handleOpen }
                                className={
                                    ({ isActive }) => isActive
                                    ? 'nav-link-active'
                                    : ''
                                }
                            >
                                { name }
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
            <main className="container">
                <Routes>
                    {
                        routes.map( ({ path, Component }) => (
                            <Route key={ path } path={ path } element={ <Component /> }/>
                        ))
                    }
                    <Route path="/*" element={ <Navigate to={ routes[0].to } replace /> } />
                </Routes>
            </main>
        </BrowserRouter>
    )
}
