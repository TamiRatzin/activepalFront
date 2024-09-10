import React, { useState } from 'react';


import { OpenStreetMapProvider } from 'leaflet-geosearch';

const GeoSearchInput = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const provider = new OpenStreetMapProvider();

  const handleSearch = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue.length > 2) { // Trigger search after 3 characters
      setLoading(true);

      try {
        const searchResults = await provider.search({ query: inputValue });
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search location..."
        style={{ padding: '8px', width: '300px' }}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.label} - ({result.x}, {result.y})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeoSearchInput;
