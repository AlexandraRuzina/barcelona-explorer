import ContentComponent from "./ContentComponent";
import '../styles/MainComponent.css';

import { fetchSights } from '../api';
import {useEffect, useState} from "react";

const MainComponent = () => {
    const [sights, setSights] = useState([]);

    useEffect(() => {
        const loadSights = async (forceRefresh = false) => {
            try {
                const cache = await caches.open("sights-cache-v1");

                if (forceRefresh) {
                    const data = await fetchSights(); // API-Aufruf
                    setSights(data);
                    await cache.put("/sights/allSights", new Response(JSON.stringify(data), {
                        headers: { "Content-Type": "application/json" }
                    }));
                    return;
                }

                const cachedResponse = await cache.match("/sights/allSights");

                if (cachedResponse) {
                    console.log("Daten aus Cache geladen");
                    const cachedData = await cachedResponse.json();
                    setSights(cachedData);
                } else {
                    const data = await fetchSights(); // API-Aufruf
                    setSights(data);
                    await cache.put("/sights/allSights", new Response(JSON.stringify(data), {
                        headers: { "Content-Type": "application/json" }
                    }));
                }
            } catch (error) {
                console.error('Fehler beim Laden der Sights:', error);
            }
        };

        // Event-Listener für Cache-Aktualisierung
        window.addEventListener('invalidate-sights-cache', () => loadSights(true));

        // Initial laden
        loadSights();

        // Cleanup beim Unmount
        return () => {
            window.removeEventListener('invalidate-sights-cache', () => loadSights(true));
        };
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