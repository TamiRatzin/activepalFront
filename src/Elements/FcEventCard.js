// EventCard.jsx
import React from 'react';
import './EventCard.css';


 export default function  EventCard ({ image, title, subtitle, details })  {
    return (

     
            <div className="event-card">
            <img src={image} alt={`${title} event`}  className="event-image" />
            <button className="close-btn">×</button>
            <div className="event-info">
                <h3>{title}</h3>
                <p className="subtitle">{subtitle}</p>
                <p className="details">{details}</p>
                <button className="open-btn">open</button>
            </div>
        </div>
        
        
    );
};



