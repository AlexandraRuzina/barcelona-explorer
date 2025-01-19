import '../styles/NotFoundComponent.css';
import {useNavigate} from "react-router-dom";

export default function NotFoundComponent(){

    const navigate = useNavigate()

    function goToHome() {
        navigate("/");
    }

    return (
        <main className="notFound">
            <h1>No Results Found</h1>
            <p>We couldn't find anything matching your search. Please try again with a different query.</p>
            <button className="ReturnBtn" onClick={goToHome}>Return to Home</button>
        </main>
    )
}