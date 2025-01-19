import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SendModal from "./SendComponent";
import '../styles/ContactFormComponent.css';

export default function ContactFormComponent() {
    const [answer, setAnswer] = useState("Your request has been sent.")
    const navigate = useNavigate()
    const [valid, setValid] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReturn = () => {
        setIsModalOpen(false);
        setValid(false)
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <main>
            <div>
                <h1>Contact Form</h1>
                <div className="boxContactForm">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-column">
                                <label className="label">Name:</label>
                                <input
                                    className="input"
                                    name="name"
                                    type="text"
                                    required
                                    pattern="^[a-zA-Z\s]+$"
                                />
                            </div>
                            <div className="form-column">
                                <label className="label">Enter your email:</label>
                                <input
                                    className="input"
                                    name="name"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="form-column">
                                <label htmlFor="category-select" className="label">Your concern:</label>
                                <select id="category-select" name="category" className="input" required>
                                    <option value="" disabled selected>
                                        -- Please select your concern --
                                    </option>
                                    <option value="Login"> Login does not work</option>
                                    <option value="selectionEntries">Not enough entries</option>
                                    <option value="insufficient">Descriptions are insufficient</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-spacer"></div>
                        <div className="form-row">
                            <div className="form-column full-width">
                                <label className="label">Description:</label>
                                <textarea
                                    className="input textarea"
                                    name="description"
                                    rows="6"
                                />
                            </div>
                        </div>
                        <button type="submit" className="NewSpotButton">Send</button>
                        <div className="extraKomponente">
                                <SendModal
                                    show={isModalOpen}
                                    text={answer}
                                    onClose={handleReturn}
                                />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );

}