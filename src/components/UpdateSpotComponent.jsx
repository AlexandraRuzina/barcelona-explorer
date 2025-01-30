import '../styles/NewSpotComponent.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {addSight, fetchCategoriesDropDown, updateSight} from "../api";
import ConfirmModal from "./ConfirmComponent";
import {useAppContext} from "../AppContext";

export default function UpdateSpotComponent() {
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [answer, setAnswer] = useState()
    const [change, setChanged] = useState(false);
    const navigate = useNavigate()
    const [valid, setValid] = useState(false);
    const {categoriesTable, setCategoriesTable} = useAppContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleConfirm = () => {
        setIsModalOpen(false);
        setValid(false)
        setChanged(false)
    };

    const handleReturn = () => {
        setIsModalOpen(false);
        setValid(false)
        setChanged(false)
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
                const data = await fetchCategoriesDropDown();
                setCategories(data);
            } catch (error) {
                console.error('Fehler beim Laden der Sights:', error);
            }
        };
        loadSights();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(change){
            const nameValid = /^[a-zA-ZáéíóúüñïçÁÉÍÓÚÜÑàèìòùÀÈÌÒÙ\s’]+$/.test(name);
            const priceValid = price >= 0 && price <= 100;
            const pictureValid = /^https?:\/\/.*\.(?:jpg|png)$/.test(picture);

            if (nameValid && priceValid && (pictureValid || picture==="")) {
                try {
                    setValid(true);
                    const result = await updateSight([name, price, selectedCategory, picture, description, sight]);
                    window.dispatchEvent(new Event('invalidate-sights-cache'));
                    window.dispatchEvent(new Event('invalidate-categories-cache'));
                    setAnswer(result.value);
                    setValid(true);
                    setIsModalOpen(true); // Modal wird nur angezeigt, wenn die Eingaben gültig sind
                } catch (error) {
                    console.error("Fehler beim Abrufen der Daten:", error);
                }
            }
        }

    };

    // Convert description array to string if it's an array
    const processDescription = (desc) => {
        return Array.isArray(desc) ? desc.join('\n') : (desc || "");
    };

    const {
        picture: initialPicture,
        name: initialName,
        category: initialCategory,
        price: initialPrice,
        description: initialDescription
    } = location.state || {};

    const [picture, setPicture] = useState(initialPicture || "");
    const [name, setName] = useState(initialName || "");
    const [sight, setSight] = useState(name);
    const [selectedCategory, setCategory] = useState(initialCategory || "");
    const [price, setPrice] = useState(initialPrice || 0);
    const [description, setDescription] = useState(processDescription(initialDescription));

    const filteredCategories = [
        { name: selectedCategory }, // Die ausgewählte Kategorie
        ...categories.filter(cat => cat.name !== selectedCategory) // Die anderen Kategorien
    ];

    return (
        <main>
            <div>
                <h1>Update Spot</h1>
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
                                    maxlength="75"
                                    defaultValue={name}
                                    required
                                    pattern="^[a-zA-ZáéíóúüñïçÁÉÍÓÚÜÑàèìòùÀÈÌÒÙ\s’]+$"
                                    onChange={(e) => {setName(capitalizeIfLowercase(e.target.value)); setChanged(true)}}
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
                                    value={price}
                                    onChange={(e) => {setPrice(e.target.value); setChanged(true)}}
                                />
                            </div>
                            <div className="form-column">
                                <label htmlFor="category-select" className="label">Category:</label>
                                <select
                                    id="category-select"
                                    name="category"
                                    className="input"
                                    value={selectedCategory}
                                    onChange={(e) => { setCategory(e.target.value); setChanged(true) }}>
                                    {filteredCategories.map((category, index) => (
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
                                    pattern="^(https?:\/\/.*\.(?:jpg|png))?$"
                                    defaultValue={picture}
                                    onChange={(e) => {
                                        setPicture(e.target.value);
                                        setChanged(true)
                                    }}
                                />
                            </div>
                            <div className="form-column full-width">
                                <label className="label">Description:</label>
                                <textarea
                                    className="input textarea"
                                    name="description"
                                    rows="6"
                                    maxlength="800"
                                    defaultValue={description}
                                    onChange={(e) => {setDescription(e.target.value); setChanged(true)}}
                                >
                                </textarea>
                            </div>
                        </div>
                        <button type="submit" className="NewSpotButton">Save</button>
                        {valid && change && (
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