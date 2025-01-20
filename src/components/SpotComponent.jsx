import '../styles/SpotComponent.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import DeleteModal from "./DeleteComponent";
import {deleteSight} from "../api";

const SpotComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { picture, name, category, price, description } = location.state || {};
    const apiKey = process.env.REACT_APP_API_KEY;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        setIsModalOpen(false);
        const result = await deleteSight(name);
        window.dispatchEvent(new Event('invalidate-sights-cache'));
        navigate('/')
    };

    function updateSpot(){
        navigate(`/spot/${name}/update`, { state: { picture, name, category, price, description } })
    }

    return (
        <main className="spot-details">
            <div className="details-container">
                <div className="details-info">
                    <h1>{name}</h1>
                    <div className="attribute">
                        <p>
                            <span className="labelSpot">Price:</span> {price}€
                        </p>
                        <p>
                            <span className="labelSpot">Category:</span> {category}
                        </p>
                        <p>
                            <span className="labelSpot">Description:</span>
                        </p>
                        <ul>
                            {description
                                .split('.')
                                .filter((item) => item.trim() !== '') // Entfernt leere Elemente
                                .map((item, index) => (
                                    <li key={index}>{item.trim()}</li>
                                ))}
                        </ul>
                    </div>
                    <p className="crudButtons">
                        <span><button className="button" onClick={updateSpot}>Update</button></span>
                        <span><button className="buttonDelete" onClick={() => setIsModalOpen(true)}>Delete</button>
                        <DeleteModal
                            show={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onConfirm={handleDelete}/>
                        </span>
                    </p>
                </div>
                {/* Right Side: Image */}
                <div className="details-image">
                    <img className="bildSpot" src={picture} alt={name}/>
                </div>
            </div>
            <div className="google-maps">
                <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${name},Barcelona+Spain`}
                ></iframe>
            </div>
        </main>

    )
        ;
};

export default SpotComponent;