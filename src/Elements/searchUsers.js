import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  max-width: 800px;
  width:400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Results = styled.div`
  margin-top: 20px;
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResultItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
  flex-wrap: wrap;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ProfilePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 15px;

  @media (max-width: 480px) {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;

  div {
    font-size: 16px;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const RequestButton = styled.button`
  padding: 10px 15px;
  background-color: ${({ isPending }) => (isPending ? '#ffc107' : '#28a745')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isPending }) => (isPending ? '#e0a800' : '#218838')};
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

export default function SearchUsers() {
  const [username, setUsername] = useState('');
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState([
    // Mock data
    { id: 1, username: 'JohnDoe', sport: 'Soccer', location: 'New York', rank: 4 },
    { id: 2, username: 'JaneSmith', sport: 'Basketball', location: 'Los Angeles', rank: 5 },
    { id: 3, username: 'AlexKing', sport: 'Tennis', location: 'Miami', rank: 3 },
    // Add more mock data as needed
  ]);
  const [filteredResults, setFilteredResults] = useState(results);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const filterResults = () => {
      const filtered = results
        .filter(user => {
          return (
            (username === '' || user.username.toLowerCase().includes(username.toLowerCase())) &&
            (sport === '' || user.sport.toLowerCase().includes(sport.toLowerCase())) &&
            (location === '' || user.location.toLowerCase().includes(location.toLowerCase()))
          );
        })
        .sort((a, b) => {
          if (rank === '') return 0;
          return Math.abs(a.rank - rank) - Math.abs(b.rank - rank);
        });
      setFilteredResults(filtered);
    };

    filterResults();
  }, [username, sport, location, rank, results]);

  const handleRequest = (userId) => {
    setPendingRequests([...pendingRequests, userId]);
    console.log(`Request pending for user ID: ${userId}`);
  };

  return (
    <SearchContainer>
      <h2>Search Users</h2>
      <Form>
        <Input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter username" 
        />
        <Select 
          value={sport} 
          onChange={(e) => setSport(e.target.value)}
        >
          <option value="">Select sport</option>
          <option value="soccer">Soccer</option>
          <option value="basketball">Basketball</option>
          <option value="tennis">Tennis</option>
          {/* Add more options as needed */}
        </Select>
        <Input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Enter location" 
        />
        <Select 
          value={rank} 
          onChange={(e) => setRank(e.target.value)}
        >
          <option value="">Select rank</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </Select>
      </Form>
      <Results>
        <h3>Results:</h3>
        {filteredResults.length > 0 ? (
          <ResultList>
            {filteredResults.map((user) => (
              <ResultItem key={user.id}>
                <ProfilePicture />
                <UserInfo>
                  <div>{user.username}</div>
                </UserInfo>
                <RequestButton 
                  isPending={pendingRequests.includes(user.id)}
                  onClick={() => handleRequest(user.id)} 
                  disabled={pendingRequests.includes(user.id)}
                >
                  {pendingRequests.includes(user.id) ? 'Pending' : 'Request'}
                </RequestButton>
              </ResultItem>
            ))}
          </ResultList>
        ) : (
          <p>No results found</p>
        )}
      </Results>
    </SearchContainer>
  );
}

