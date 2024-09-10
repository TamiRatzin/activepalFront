import React, { useState,useEffect,useRef } from 'react';
import './ProfilePage.css';
import Preferences from './Preferences';
import SportRating from './SportRating';
import NavigationBar from '../../Elements/NavigationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '../../Elements/UserContext';

const LastFeed = () => (
  <div className="last-feed-section">
    <h2>Last Feed</h2>
    <div className="feed-item">
      <p>Sample feed item 1</p>
    </div>
    <div className="feed-item">
      <p>Sample feed item 2</p>
    </div>
  </div>
);

export default function ProfilePage() {
  const [isEditable, setIsEditable] = useState(false);
  const [isAboutEditable, setIsAboutEditable] = useState(false);
  const [isPreferencesEditable, setIsPreferencesEditable] = useState(false);
  const [isSportsEditable, setIsSportsEditable] = useState(false);

  const [profileImage, setProfileImage] = useState('/default-profile.png');
  const [backgroundImage, setBackgroundImage] = useState('/default-background.png');
  console.log(backgroundImage);
  const [name, setName] = useState('John Doe');
  const [about, setAbout] = useState('Soccer enthusiastic\nBarcelona fan\nStanford University (SU)\nCalifornia, USA');
  const [error, setError] = useState(null);
  const fileImagePload = useRef(null);
 const {userId}=useUserContext();
  const [usernew, setUser] = useState(null);

  console.log(userId);
   useEffect(() => {
    if (userId) {
      // Fetch user data based on ID
      fetch(`https://localhost:7065/api/User/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
      });
    }
  }, [userId]);


  const [preferences, setPreferences] = useState({
    days: ['Sunday', 'Wednesday'],
    hours: ['18:00 - 21:00'],
  });
  const [sports, setSports] = useState([
    { name: 'Soccer', value: 7.8 },
    { name: 'Basketball', value: 4 },
    { name: 'Tennis', value: 6.6 },
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
       
      };
      reader.readAsDataURL(file);
     
    }
  };

  const handleSave = () => {
    setIsEditable(false);
    setIsAboutEditable(false);
    setIsPreferencesEditable(false);
    setIsSportsEditable(false);
    // Handle save logic (e.g., send updated data to server)
  };

  const updateSport = (updatedSport) => {
    const updatedSports = sports.map(s =>
      s.name === updatedSport.name ? updatedSport : s
    );
    setSports(updatedSports);
  };

  return (
    <> 
    <NavigationBar></NavigationBar>
    <div className="profile-page">
  
      <div className="profile-header">
        <img src={backgroundImage} alt="Background" className="background-image" />
        {isEditable && 
        <label className='edit-button background-input'>  
        <input type="file" onChange={handleBackgroundImageChange} className="file-input background-input" />
        <FontAwesomeIcon icon={faPen}> </FontAwesomeIcon>
        </label>
       }
        <div className="profile-picture-container">
          <img src={profileImage} alt="Profile" className="profile-picture" />
          {isEditable && 
          <label className="edit-button profile-input"> 
          <input type="file"  ref={ fileImagePload} onChange={handleImageChange} className="file-input profile-input" />
           <FontAwesomeIcon icon={faPen}> </FontAwesomeIcon>
           </label>}
          
        </div>
        {isEditable ? (
          <button className="edit-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditable(true)}>Edit</button>
        )}
      </div>
      <h1>{name}</h1>
      <div className="profile-stats">
        <div>
          <span>Events</span>
          <span>56</span>
        </div>
        <div>
          <span>Friends</span>
          <span>203</span>
        </div>
        <div>
          <span>Rates Number</span>
          <span>189</span>
        </div>
      </div>

      <div className="about-section">
        <div className="section-header">
          <h2>About</h2>
          <button className="edit-button" onClick={() => setIsAboutEditable(prev => !prev)}>
            {isAboutEditable ? 'Save' : 'Edit'}
          </button>
        </div>
        {isAboutEditable ? (
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="about-textarea"
          />
        ) : (
          <p>{about}</p>
        )}
      </div>

      <div className="preferences-section">
        <div className="section-header">
          <h2>Preferences</h2>
          <button className="edit-button" onClick={() => setIsPreferencesEditable(prev => !prev)}>
            {isPreferencesEditable ? 'Save' : 'Edit'}
          </button>
        </div>
        <Preferences 
          preferences={preferences} 
          onChange={setPreferences} 
          isEditable={isPreferencesEditable} 
        />
      </div>

      <div className="sports-section">
        <div className="section-header">
          <h2>Your Sports</h2>
          <button className="edit-button" onClick={() => setIsSportsEditable(prev => !prev)}>
            {isSportsEditable ? 'Save' : 'Edit'}
          </button>
        </div>
        {sports.map((sport, index) => (
          <SportRating key={index} sport={sport} onChange={updateSport} />
        ))}
      </div>

      <LastFeed />
    </div>
    </>
  );
}



