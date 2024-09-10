import React, { useEffect, useState } from 'react';

export default function EventPreview({ event }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (event && event.eventImage instanceof Blob) {
      try {
        const url = URL.createObjectURL(event.eventImage);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to create object URL", error);
      }
    }
  }, [event]);

  return (
    <div className="event-preview">
      <h3>{event.eventName}</h3>
      <p>{event.eventDate} at {event?.eventTime}</p>
      <p>{event.eventLocation}</p>
      <p>{event.eventDescription}</p>
      {imageUrl && <img src={imageUrl} alt="Event" />}
    </div>
  );
}