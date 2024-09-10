import React from 'react'
import { useState } from 'react';

export default function SportRating({ sport, onChange }) {


    const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(sport.value);

  const handleSave = () => {
    onChange({ ...sport, value: editedValue });
    setIsEditing(false);
  };

  return (
    <div className="sport-item">
      <span>{sport.name} </span>
      {isEditing ? (
        <>
          <input 
            type="number" 
            value={editedValue} 
            onChange={(e) => setEditedValue(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{sport.value}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
