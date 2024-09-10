import React, { useState } from 'react';

export default  function RatingForm({ onSubmitRating }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRating({ rating, feedback });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <input 
        type="number" 
        value={rating} 
        onChange={(e) => setRating(e.target.value)} 
        min="1" 
        max="5" 
      />
      <textarea 
        value={feedback} 
        onChange={(e) => setFeedback(e.target.value)} 
        placeholder="Leave feedback"
      />
      <button type="submit">Submit</button>
    </form>
  );
}


