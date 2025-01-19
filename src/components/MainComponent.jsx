import ContentComponent from "./ContentComponent";
import '../styles/MainComponent.css';

import { fetchSights } from '../api';
import {useEffect, useState} from "react";

const MainComponent = () => {
    const [sights, setSights] = useState([]);

    useEffect(() => {
        const loadSights = async () => {
            try {
                const data = await fetchSights(); // API-Aufruf
                setSights(data);
            } catch (error) {
                console.error('Fehler beim Laden der Sights:', error);
            }
        };
        loadSights();
    }, []);
    
    return (
        <main className="content">
            {sights.map((sight, index)  => (
                <ContentComponent
                    key={index}
                    name={sight.name}
                    category={sight.category}
                    price={sight.price}
                    picture={sight.picture}
                    description={sight.description}
                />
            ))}
        </main>
    );
};

export default MainComponent;