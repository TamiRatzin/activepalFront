import React from 'react';
import './PendingApproval.css';

export default function PendingApproval({ pendingParticipants, onApprove }) {
  return (
    <div className="pending-approval">
      <h4 className="title">Pending Approval</h4>
      {pendingParticipants.length > 0 ? (
        <ul className="pending-list">
          {pendingParticipants.map((participant) => (
            <li key={participant.id} className="pending-item">
              <img 
                src={participant.profileImage} 
                alt={participant.name} 
                className="participant-image" 
              />
              <div className="participant-details">
                <span className="participant-name">{participant.name}</span>
                <button 
                  className="approve-button" 
                  onClick={() => onApprove(participant.id)}
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-participants">No participants are waiting for approval.</p>
      )}
    </div>
  );
}

