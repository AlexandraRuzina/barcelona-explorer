import '../styles/NewSpotComponent.css';
import {addSight, fetchCategoriesDropDown, filterQuery} from '../api';
import {useEffect, useState} from "react";
import ConfirmModal from "./ConfirmComponent";
import {useNavigate} from "react-router-dom";

export default function NewSpotComponent() {
    const [categories, setCategories] = useState([]);
    const [answer, setAnswer] = useState("")
    const [name, setName] = useState("");
    const [price, setPrice] = useState("0");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate()
    const [valid, setValid] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleConfirm = () => {
        setIsModalOpen(false);
        setValid(false)
        navigate('/addSpot');
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

    useEffect(() => {
        const loadSights = async () => {
            try {
                const data = await fetchCategoriesDropDown(); // API-Aufruf
                setCategories(data);
            } catch (error) {
                console.error('Fehler beim Laden der Sights:', error);
            }
        };
        loadSights();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nameValid = /^[a-zA-ZáéíóúüñïçÁÉÍÓÚÜÑàèìòùÀÈÌÒÙ\s’]+$/.test(name);
        const priceValid = price >= 0 && price <= 100;
        const pictureValid = /^https?:\/\/.*\.(?:jpg|png)$/.test(picture);

        if (nameValid && priceValid && (pictureValid || picture==="")) {
            try {
                const result = await addSight([name, price, selectedCategory, picture, description]);
                window.dispatchEvent(new Event('invalidate-sights-cache'));
                setAnswer(result.value);
                setValid(true);
                setIsModalOpen(true); // Modal wird nur angezeigt, wenn die Eingaben gültig sind
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        }
    };


    return (
        <main>
            <div>
                <h1>Add New Spot</h1>
                <div className="boxNewSpot">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-column">
                                <label className="label">Name:</label>
                                <input
                                    className="input"
                                    name="name"
                                    type="text"
                                    minlength="3"
                                    maxLength="75"
                                    required
                                    pattern="^[a-zA-ZáéíóúüñïçÁÉÍÓÚÜÑàèìòùÀÈÌÒÙ\s’]+$"
                                    onChange={(e) => {
                                        setName(capitalizeIfLowercase(e.target.value))
                                    }}
                                />
                            </div>
                            <div className="form-column">
                                <label className="label">Price:</label>
                                <input
                                    className="input"
                                    name="price"
                                    type="number"
                                    step="1.00"
                                    min="0"
                                    max="100"
                                    defaultValue="0"
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="form-column">
                                <label htmlFor="category-select" className="label">Category:</label>
                                <select
                                    id="category-select"
                                    name="category"
                                    className="input"
                                    value={selectedCategory} // Korrekte Bindung an den Zustand
                                    onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value="All" disabled selected>Add Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className="form-spacer"></div>
                        <div className="form-row">
                            <div className="form-column">
                                <label className="label">Link to picture:</label>
                                <input
                                    className="input"
                                    name="picture"
                                    type="text"
                                    pattern="^https?:\/\/.*\.(?:jpg|png)$"
                                    onChange={(e) => {
                                        setPicture(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="form-column full-width">
                                <label className="label">Description:</label>
                                <textarea
                                    className="input textarea"
                                    name="description"
                                    rows="6"
                                    maxLength="800"
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="NewSpotButton">Save</button>
                        {valid && (
                            <ConfirmModal
                                show={isModalOpen}
                                text={answer}
                                onClose={handleReturn}
                                onConfirm={handleConfirm}
                            />
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}