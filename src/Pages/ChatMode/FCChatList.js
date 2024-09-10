import React from 'react'
import  styled from 'styled-components'

const ProfileImage = styled.img`
width: 50px;
height: 40px;
border-radius: 50%;
margin-right: 20px;
`;

export default function FCChatList({ connections, searchQuery, onSelectChat }) {

    
        const filteredConnections = connections.filter(connection =>
          connection.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

       

  return (
    <ul className="chat-list">
       {filteredConnections.map(connection => (
        <li key={connection.id} onClick={() => onSelectChat(connection)} className="chat-item">
        <ProfileImage className ="floatingImg" src="https://via.placeholder.com/40" alt="Profile" /> {connection.name}
        </li>
      ))}
    </ul>

  )
}
