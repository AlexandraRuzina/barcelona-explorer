
import '../styles/ContentComponent.css';

import React from 'react';
import {useNavigate} from "react-router-dom";

const ContentComponent = ({picture, name, category, price, description }) => {
    const navigate = useNavigate();

    function showSpot( ){
        navigate(`/spot/${name}`, { state: { picture, name, category, price, description } })
    }

    return (
        <div className="tile" onClick={showSpot}>
            <img className="bild" src={picture} alt={name}/>
            <div className="name">{name}</div>
            <div className="info">{category}</div>
            <div className="info">{price}€</div>
        </div>
    );
};

export default ContentComponent;
