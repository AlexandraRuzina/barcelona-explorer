import '../styles/EditCategoryComponent.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {updateCategory} from "../api";
import ConfirmModal from "./ConfirmComponent";
import {useAppContext} from "../AppContext";

export default function EditCategoryComponent() {
    const location = useLocation();
    const { updateCatDropDown, updateCatTable} = useAppContext();
    const [change, setChange] = useState(false)
    const {category: initialCategory,} = location.state || {};
    const [category, setCategory] = useState(initialCategory || "");
    const [old, setOld] = useState(category);
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()
    const [valid, setValid] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = () => {
        setIsModalOpen(false);
        setValid(false)
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
        if(change) {
            const categoryValid = /^[a-zA-Z\s]+$/.test(category);

            if (categoryValid) {
                try {
                    setValid(true);
                    const result = await updateCategory([category, old]);
                    window.dispatchEvent(new Event('invalidate-categories-cache'));
                    window.dispatchEvent(new Event('invalidate-sights-cache'));
                    setAnswer(result.value);
                    setValid(true);
                    setIsModalOpen(true);
                    updateCatDropDown(old, category)
                    updateCatTable(old, category)
                } catch (error) {
                    console.error("Fehler beim Updaten der Daten:", error);
                }
            }
        }
    };

    return (
        <main className="edit-categories-body">
            <div>
                <h1>Update Category Name</h1>
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
                                defaultValue={category}
                                required
                                pattern="^[a-zA-Z\s]+$"
                                onChange={(e) => {setCategory(capitalizeIfLowercase(e.target.value)); setChange(true)}}
                            />
                            <button className="button">Save</button>
                            <div className="extraKomponente">
                                {valid && change &&(
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