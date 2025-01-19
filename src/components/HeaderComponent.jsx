import '../styles/HeaderComponent.css';
import logo from '../images/Logo.png';

import {useAppContext} from "../AppContext";
import { useNavigate } from "react-router-dom"
import {useState} from "react";
import {searchQuery} from "../api";

export default function HeaderComponent() {
    const appContext = useAppContext();
    const { isAuthenticated, logout, username } = useAppContext();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await searchQuery(query);
            setAnswer(result);
            if (result.length === 0) {
                navigate(`/notFound`);
            } else {
                navigate(`/results`, { state: { answer: result } });
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
        }
    };

    function showSidebar() {
        appContext.setSidebarStatus(!appContext.sidebarStatus);
    }

    function onCategories() {
        navigate('/categories');
    }

    function newSpot() {
        navigate('/addSpot');
    }

    function goToHome() {
        navigate("/");
    }

    function login(){
        navigate("/login");
    }

    function logoutAuth(){
        logout()
    }

    function travel(){
        navigate(`/travelBlog/${username}`);

    }

    return (
        <header>
            <button id="toggle-sidebar" onClick={showSidebar}>☰</button>
            <img
                className="logo"
                src={logo}
                alt="Barcelona Explorer Logo"
                onClick={goToHome}
            />
            {isAuthenticated && (
                    <h1 className="lobster-regular">Welcome to Barcelona, {username}!</h1>
                ) ||
                <h1 className="lobster-regular">A Journey Through Barcelona</h1>}
            <nav>
                {isAuthenticated && (
                    <button className="catBtn" onClick={travel}>My Travel Blog</button>
                )}
                <button className="catBtn" onClick={onCategories}>Show Categories</button>
                <button className="catBtn" onClick={newSpot}>Add New Spot</button>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" disabled={!query.trim()}>
                    </button>
                </form>
                {isAuthenticated ? (
                    <>
                            <span className="logout-icon" onClick={logoutAuth}>
                            <svg><polyline
                            points="14 7 14 2 2 2 2 22 14 22 14 17"></polyline><line x1="10" y1="12" x2="22" y2="12"></line><polyline
                            points="18 8 22 12 18 16"></polyline></svg>
                            </span>
                    </>
                ) : (
                    <button className="login-button" onClick={login}>Login</button>
                )}
            </nav>
        </header>
    )
        ;
}
