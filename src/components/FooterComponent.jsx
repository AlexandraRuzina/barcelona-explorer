import '../styles/FooterComponent.css';
import {useNavigate} from "react-router-dom";

export default function FooterComponent(){
    const navigate = useNavigate()

    function toImp(){
        navigate(`/legalNotice`)
    }

    function toContact(){
        navigate(`/contactForm`)
    }

    return (
        <footer className="footer">
            <div className="footer-section">
                <p onClick={toImp}>Legal Notice</p>
            </div>
            <div className="footer-section">
                <p onClick={toContact}>Contact Form</p>
            </div>
        </footer>
    );
}