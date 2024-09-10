import React, { useState } from 'react';
import './inviteParticipants.css';

export default function InviteParticipants({ onInvite, participants, usersList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState(participants);
  const [inviteStatus, setInviteStatus] = useState({});

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddParticipant = (user) => {
    if (!selectedParticipants.some(participant => participant.id === user.id)) {
      const updatedParticipants = [...selectedParticipants, user];
      setSelectedParticipants(updatedParticipants);
      onInvite(updatedParticipants);
      setInviteStatus({ ...inviteStatus, [user.id]: true });
    }
  };

  const handleRemoveParticipant = (id) => {
    const updatedParticipants = selectedParticipants.filter(participant => participant.id !== id);
    setSelectedParticipants(updatedParticipants);
    onInvite(updatedParticipants);
    setInviteStatus({ ...inviteStatus, [id]: false });
  };

  const filteredUsers = (usersList || []).filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invite-participants">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search users"
        className="search-input"
      />
      
      <div className="users-list">
        {filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.profileImage} alt={user.name} className="user-image" />
            <div className="user-info">
              <p className="user-name">{user.name}</p>
            </div>
            <button 
              className="invite-button" 
              onClick={() => inviteStatus[user.id] ? handleRemoveParticipant(user.id) : handleAddParticipant(user)}
            >
              {inviteStatus[user.id] ? 'Cancel' : 'Invite'}
            </button>
          </div>
        ))}
      </div>

      <h5>Invited Participants</h5>

      <ul>
        {selectedParticipants.map((participant) => (
          <li key={participant.id}>
            {participant.name}
            <button 
              className="remove-button" 
              onClick={() => handleRemoveParticipant(participant.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
