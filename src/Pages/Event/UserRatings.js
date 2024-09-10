import React from 'react';

export default  function UserRatings({ ratings }) {
  return (
    <div className="user-ratings">
      {ratings.map((rating, index) => (
        <div key={index}>
          <p>Rating: {rating.rating}/5</p>
          <p>Feedback: {rating.feedback}</p>
        </div>
      ))}
    </div>
  );
}


