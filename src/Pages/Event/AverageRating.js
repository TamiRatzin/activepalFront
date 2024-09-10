import React from 'react';

export default  function AverageRating({ ratings }) {
  const average = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

  return (
    <div>
      <h4>Average Rating: {average.toFixed(1)}</h4>
    </div>
  );
}


