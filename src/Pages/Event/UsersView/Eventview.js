import React, { useState, useCallback } from 'react';
import NavigationBar from '../../../Elements/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRankingStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import {   faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';
import './EventView.css';


export default  function EventView  ({ eventData })  {
      
    const sampleEventData = {
        title: "some sport event",
        date: "2024-08-30",
        time: "18:00",
        description: "People of rupin center ",
        minParticipants: 10,
        maxParticipants: 100,
        imageUrl: "",
        location: "", // Example coordinates
        joinedUsers: [
          { id: 1, name: "Alice Johnson", profilePic: "", ranks: [5, 4] },
          { id: 2, name: "Bob Smith", profilePic: "", ranks: [4, 3, 5] },
          { id: 3, name: "Catherine Lee", profilePic: "", ranks: [5, 5, 4] },
          { id: 4, name: "David Martinez", profilePic: "", ranks: [3, 4] },
          { id: 5, name: "Eva Green", profilePic: "", ranks: [4, 5, 5] },
          { id: 6, name: "Frank Brown", profilePic: "", ranks: [3, 4, 3] },
          { id: 7, name: "Grace Wilson", profilePic: "", ranks: [5, 4] },
          { id: 8, name: "Henry Walker", profilePic: "", ranks: [4, 4, 5] }
        ]
      };
      eventData=sampleEventData

  const [joinedUsers, setJoinedUsers] = useState(sampleEventData.joinedUsers);
  const [hasJoined, setHasJoined] = useState(false);

  // User join event handler
  const handleJoinEvent = useCallback(() => {
    if (!hasJoined) {
      setJoinedUsers(prevUsers => [
        ...prevUsers,
        { id: Date.now(), name: "New User", profilePic: "path/to/profile.jpg", ranks: [] }
      ]);
      setHasJoined(true);
    }
  }, [hasJoined]);

  return (
    <div className='divEventview'> 
   <NavigationBar></NavigationBar>
    <div className="event-container">
   <Header> </Header>
   <EventDetails handleJoinEvent={handleJoinEvent } eventData={eventData} hasJoined={hasJoined}> </EventDetails>
    <UserList users={joinedUsers} setUsers={setJoinedUsers} />
  </div>
  </div>
  );
};




const UserList = React.memo(({ users, setUsers }) => {
  const handleRank = useCallback((userId, rank) => {
      setUsers(prevUsers =>
          prevUsers.map(user => {
              if (user.id === userId) {
                  return { ...user, ranks: [...user.ranks, rank] };
              }
              return user;
          })
      );
  }, [setUsers]);

  return (
      <div className="table-container">
          <table className="user-table">
              <thead>
                  <tr>
                      <th>Profile Picture</th>
                      <th>Name</th>
                      <th>Average Rank</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map(user => (
                      <UserCard key={user.id} user={user} onRank={handleRank} />
                  ))}
              </tbody>
          </table>
      </div>
  );
});

const UserCard = React.memo(({ user, onRank }) => {
  const averageRank = user.ranks.length > 0
      ? (user.ranks.reduce((sum, rank) => sum + rank, 0) / user.ranks.length).toFixed(1)
      : 0;

  const filledStars = Math.floor(averageRank);
  const hasHalfStar = averageRank % 1 >= 0.5;

  const renderStars = () => {
      return [...Array(5)].map((_, index) => {
          if (index < filledStars) {
              return <FontAwesomeIcon key={index} icon={fullStar} className="filled-star" />;
          } else if (index === filledStars && hasHalfStar) {
              return <FontAwesomeIcon key={index} icon={faStarHalf} className="half-star" />;
          } else {
              return <FontAwesomeIcon key={index} icon={emptyStar} className="empty-star" />;
          }
      });
  };

  return (
      <tr className="user-row">
          <td><img src={user.profilePic} alt={``} className="user-profile-pic" /></td>
          <td>{user.name}</td>
          <td>
              <div className="stars-container">
                  {renderStars()}
              </div>
          </td>
          <td>
              <button onClick={() => onRank(user.id)} className="rank-button">
                  <FontAwesomeIcon size='xl' icon={faRankingStar} />
              </button>
          </td>
      </tr>
  );
});

  const Header = () => {
    return (
      <header className="header-container">
        <div className="header-background">
          <img
            src="https://via.placeholder.com/600x400"  // Replace with the actual path of the image
            alt="Volleyball"
            className="header-image"
          />
        </div>
       
      </header>
    );
  };


  const EventDetails = ({ eventData, handleJoinEvent, hasJoined }) => {
    return (
      <div className="event-details-container">
        <div className="event-details">
          <h2 className="event-title">{eventData.title}</h2>
          <div className="event-meta">
            <p><strong>Date:</strong> {eventData.date}</p>
            <p><strong>Time:</strong> {eventData.time}</p>
          </div>
          <p className="event-description">{eventData.description}</p>
          <p className="event-participants">
            <strong>Participants:</strong> {eventData.minParticipants} - {eventData.maxParticipants}
          </p>
          <button 
            className={`event-join-button ${hasJoined ? 'joined' : ''}`}
            onClick={handleJoinEvent} 
            disabled={hasJoined}
          >
            {hasJoined ? 'Joined' : 'Join Event'}
          </button>
        </div>
      </div>
    );
  };





