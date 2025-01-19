import { useState } from 'react'
import '../styles/RegisterComponent.css';
import {useNavigate} from "react-router-dom";
import {addUser} from "../api";
import AnswerRegistryModal from "./AnswerRegistryComponent";

export default function RegisterComponent() {
    const navigate = useNavigate();
    const [exist, setExist] = useState(false);
    const [error, setError] = useState(false);
    const [answer, setAnswer] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleConfirm = () => {
        setIsModalOpen(false);
        setExist(false)
        setError(false)
        navigate('/login');
    };

    const handleReturn = () => {
        setIsModalOpen(false);
        setExist(false)
        setError(false)
        navigate('/signUp');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Überprüfung der Passwortgleichheit
        if (password !== passwordConfirm) {
            setErrorMessage("Passwords do not match. Please try again.");
            setError(true)
        } else {

            try {
                const result = await addUser([username, email, password]);
                setAnswer(result.value);
                if (result.value === "User already exists.") {
                    setExist(true)
                }
                setIsModalOpen(true);
            } catch (error) {
                console.error("Error during registration:", error);
            }
        }
    };

    return (
        <div className="bodyRegister">
            <form className="formRegister" onSubmit={handleSubmit}>
                <h2 className="hRegister">Sign Up</h2>
                <div>
                    <label htmlFor="text" className="RegisterLabel">Username:</label>
                    <input
                        className="RegisterInput"
                        type="text"
                        id="text"
                        minLength="3"
                        maxLength="75"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="RegisterLabel">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="RegisterInput"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="RegisterLabel">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="RegisterInput"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm" className="RegisterLabel">Confirm Password:</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        className="RegisterInput"
                        required
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                {errorMessage && (
                    <p className="ErrorMessage">{errorMessage}</p>
                )}
                <button className="RegisterBtn" type="submit">Create Account</button>
                <div className="extraKomponente">
                        <AnswerRegistryModal
                            show={isModalOpen}
                            text={answer}
                            onAction={exist ? handleReturn : handleConfirm} // Eine einzige Aktion je nach "exist"
                            buttonText={exist ? "Okay" : "Login"} // Dynamischer Button-Text
                        />
                </div>
            </form>
        </div>
    );
}
