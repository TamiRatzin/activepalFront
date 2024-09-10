import React, { useState } from 'react';
import JoinEvent from './JoinEvent';
import PendingApproval from './PendingAproval';
//import InviteParticipants from './InviteParticipants';
import './EventManger.css'

export default function EventParticipantsManager({ usersList }) {
    const [invitedParticipants, setInvitedParticipants] = useState([
      {
        id: 4,
        name: 'bvbvbn cvcxvc',
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        id: 5,
        name: 'vcvc Svcvcv',
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        id: 7,
        name: 'Avcve Jocvcvon',
        profileImage: 'https://via.placeholder.com/50',
      }
    ]);
  
    const [approvedParticipants, setApprovedParticipants] = useState([
      {
        id: 1,
        name: 'John Doe',
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        id: 2,
        name: 'Jane Smith',
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        id: 3,
        name: 'Alice Johnson',
        profileImage: 'https://via.placeholder.com/50',
      }
    ]);
  
    const handleApprove = (id) => {
      const participant = invitedParticipants.find(p => p.id === id);
      if (participant) {
        setApprovedParticipants([...approvedParticipants, participant]);
        setInvitedParticipants(invitedParticipants.filter(p => p.id !== id));
      }
    };
  
    return (
      <div className="event-manager">
        <JoinEvent participants={approvedParticipants} />
        <PendingApproval 
          pendingParticipants={invitedParticipants} 
          onApprove={handleApprove} 
        />
      </div>
    );
  }