import React, { useState } from 'react';
import MapSearch from '../../Elements/map/MapSearch';
import {  OpenStreetMapProvider } from 'leaflet-geosearch';



export default function EventForm({ onCreate }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState(null);
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('public');
  const [eventCategory, setEventCategory] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [minParticipants, setMinParticipants] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [minRating, setMinRating] = useState('');
  console.log(eventLocation)
  const provider = new OpenStreetMapProvider();
  provider.search({ query: '...' }).then(function (result) {
    console.log(result)
  });
 
  const handleImageChange = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setEventImage(imageUrl);
  };
  

 
  const handleSubmit = (e) => {
   
    e.preventDefault();

    // כאן אפשר לשלוח את הנתונים לשרת או להוסיף ל-state הכללי
    const eventData = {
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      eventType,
      eventCategory,
      eventImage
    };
    onCreate({eventData})
   
  };


  return (
    <> 
    
        <form onSubmit={handleSubmit} className="event-form">
     <div className="form-row">
        <div className="form-group">
          <label>Event Name:</label>
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>event for:</label>
          <select 
            value={eventType} 
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="all">Everyone</option>
        <option value="friends">Friends Only</option>
        <option value="invite">Invite Only</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select 
            value={eventCategory} 
            onChange={(e) => setEventCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="soccer">Soccer</option>
            <option value="basketball">Basketball</option>
            <option value="running">Running</option>
            {/* Additional categories */}
          </select>
        </div>
        
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={eventDate} 
            onChange={(e) => setEventDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input 
            type="time" 
            value={eventTime} 
            onChange={(e) => setEventTime(e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          {/*<label>Location:</label>
           <input 
            type="text" 
            value={eventLocation} 
            onChange={(e) => setEventLocation(e.target.value)} 
            required 
          />*/}
         <MapSearch searchResult={eventLocation} setSearchResult={setEventLocation}></MapSearch> 
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            value={eventDescription} 
            onChange={(e) => setEventDescription(e.target.value)} 
          />
        </div>
      </div>
      
      
      
      <div className="form-row">
        <div className="form-group">
          <label>Min Participants:</label>
          <input 
            type="number" 
            value={minParticipants} 
            onChange={(e) => setMinParticipants(e.target.value)} 
            min="2"
          />
        </div>
        <div className="form-group">
          <label>Max Participants:</label>
          <input 
            type="number" 
            value={maxParticipants} 
            onChange={(e) => setMaxParticipants(e.target.value)} 
            min={minParticipants}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Min Rating:</label>
          <input 
            type="number" 
            value={minRating} 
            onChange={(e) => setMinRating(e.target.value)} 
            min="1" 
            max="5"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Image:</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            accept="image/*"
          />
        </div>
      </div>
      <button  type="submit">Create Event</button>
    </form> 
    
    </>
  );
}


