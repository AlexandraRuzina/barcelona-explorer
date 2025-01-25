import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((registration) => {
                console.log("Service Worker registriert:", registration);

                // Beispiel: Nachricht senden, nachdem der Service Worker registriert wurde
                if (navigator.serviceWorker.controller) {
                    console.log("Service Worker Controller gefunden.");
                } else {
                    console.log("Kein aktiver Controller. Service Worker übernimmt beim nächsten Reload.");
                }
            })
            .catch((error) => {
                console.error("Service Worker Registrierung fehlgeschlagen:", error);
            });
    });
}

// Funktion zum Senden von Nachrichten an den Service Worker
export const sendMessageToServiceWorker = (message) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(message);
    } else {
        console.error("Kein aktiver Service Worker Controller gefunden.");
    }
};

// Beispiel: Cache löschen
export const deleteCacheEntry = (key, cacheName) => {
    sendMessageToServiceWorker({
        action: "deleteCacheEntry",
        key,
        cacheName,
    });
};

