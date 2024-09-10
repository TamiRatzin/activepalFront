import React from 'react'
import './feed.css';


export default function Feed() {
  return (
    <>
    
    <div className="feed">
      <div className="header">
        <img src="profile-pic-url" alt="profile" className="profile-pic" />
        <input type="text" placeholder="Type something" className="search-bar" />
        <button className="post-btn">Post</button>
      </div>
      <div className="suggested-events">
        <h2>Your suggested events</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src="volleyball-pic-url" alt="Volleyball" />
            <div className="event-info">
              <h3>Volleyball</h3>
              <p>Intermediate level</p>
              <p>Tel Aviv 2 km from you</p>
              <p>2 places remain</p>
              <button className="open-btn">open</button>
            </div>
          </div>
          <div className="event-card">
            <img src="soccer-pic-url" alt="Soccer" />
            <div className="event-info">
              <h3>Soccer</h3>
              <p>Amateur</p>
              <p>Ramat Gan 5 km from you</p>
              <p>4 places remain</p>
              <button className="open-btn">open</button>
            </div>
          </div>
        </div>
      </div>
      <div className="post">
        <img src="john-doe-pic-url" alt="John Doe" className="post-profile-pic" />
        <div className="post-content">
          <p>Hello, I am looking for a new teammates for soccer and would appreciate your support.</p>
          <img src="soccer-field-pic-url" alt="Soccer Field" className="post-image" />
          <div className="post-stats">
            <span>1K Likes</span>
            <span>400 Comments</span>
            <span>270 Shares</span>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="home-btn">Home</button>
        <button className="menu-btn">Menu</button>
        <button className="notification-btn">Notifications</button>
        <button className="profile-btn">Profile</button>
      </div>
    </div>

    </>
  )
}
