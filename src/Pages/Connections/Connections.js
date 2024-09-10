
import React from 'react';
import './Connections.css';
import NavigationBar from '../../Elements/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Connections() {

    const requests = [
        { profileImage: 'path_to_image1.jpg', name: 'Eden Stern', mutualFriends: 13, timeAgo: '3y' },
        { profileImage: 'path_to_image2.jpg', name: 'Ofer Barkan', mutualFriends: 33, timeAgo: '2y' },
        // Add more requests...
      ];



  return (
    <> 
    <NavigationBar></NavigationBar>
    <div className="friend-requests-container">
      <div className='headDiv'>
        <div className='headline'>
            <h2>Friends</h2>
        </div>
        <div className='btnSearch'>
        <FontAwesomeIcon size='xl' icon={faSearch}></FontAwesomeIcon>
         </div>
      </div>
    <nav className="navbar">
      <button className="nav-button">Suggestions</button>
      <button className="nav-button">Your friends</button>
      <div className="search-icon">
        <i className="fas fa-search"></i>
      </div>
    </nav>

    <div className="friend-requests-header">
      <h2>Friend Requests <span className="request-count">32</span></h2>
    </div>

    <ul className="request-list">
      {requests.map((request, index) => (
        <li key={index} className="request-item">
          <img src={request.profileImage} alt={`${request.name}'s profile`} className="profile-image"/>
          <div className="request-info">
            <h3>{request.name}</h3>
            <p>{request.mutualFriends} mutual friends · {request.timeAgo}</p>
          </div>
          <div className="request-actions">
            <button className="confirm-button">Confirm</button>
            <button className="delete-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div></>
    
  )
}
