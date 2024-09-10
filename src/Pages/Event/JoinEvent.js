import React from 'react'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import './JoinEvent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function JoinEvent({ participants }) {


   

  return (
  
    <div className="joined-participants">
    <h4 className="title">Joined Participants</h4>
    {participants.length > 0 ? (
      <ul className="participants-list">
        {participants.map((participant) => (
          <li key={participant.id} className="participant-card">
            <img 
              src={participant.profileImage} 
              alt={participant.name} 
              className="participant-image" 
            />
            <div className="participant-details">
              <span className="participant-name">{participant.name}</span>
              <span className="participant-info">
                {participant.email ? `Email: ${participant.email}` : ''}
                {participant.phone ? ` | Phone: ${participant.phone}` : ''}
              </span>
              <span className="participant-role">
                {participant.role ? `Role: ${participant.role}` : ''}
              </span>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No participants have joined yet.</p>
    )}
  </div>

  )
}
