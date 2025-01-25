import '../styles/ConfirmComponent.css';
import {addCategory} from "../api";
import ConfirmModal from "./ConfirmComponent";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAppContext} from "../AppContext";

export default function AddCategoryComponent() {
    const [category, setCategory] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()
    const {addCatDropDown} = useAppContext();
    const [valid, setValid] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleConfirm = () => {
        setIsModalOpen(false);
        setValid(false)
        navigate('/addCategory');
    };

    const handleReturn = () => {
        setIsModalOpen(false);
        setValid(false)
        navigate('/');
    };

    function capitalizeIfLowercase(word) {
        word = word.trim();
        if (word.charAt(0) === word.charAt(0).toLowerCase()) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const categoryValid = /^[a-zA-Z\s]+$/.test(category);

        if (categoryValid) {
            try {
                setValid(true);
                const result = await addCategory(category);
                window.dispatchEvent(new Event('invalidate-categories-cache'));
                setAnswer(result.value);
                setValid(true);
                setIsModalOpen(true);
                addCatDropDown(category)
            } catch (error) {
                console.error("Fehler beim Eintragen der Daten:", error);
            }
        }
    };

    return (
        <main className="edit-categories-body">
            <div>
                <h1>Create Category</h1>
                <div className="box">
                    <form className="formUpdate" onSubmit={handleSubmit}>
                        <label className="labelCat">
                            Category:
                            <input
                                className="inputUpdate"
                                name="category"
                                type="text"
                                minlength="3"
                                maxlength="75"
                                required
                                pattern="^[a-zA-Z\s]+$"
                                onChange={(e) => {
                                    setCategory(capitalizeIfLowercase(e.target.value))
                                }}
                            />
                            <button className="button">Save</button>
                            <div className="extraKomponente">
                                {valid && (
                                    <ConfirmModal
                                        show={isModalOpen}
                                        text={answer}
                                        onClose={handleReturn}
                                        onConfirm={handleConfirm}
                                    />
                                )}
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </main>
    )
}