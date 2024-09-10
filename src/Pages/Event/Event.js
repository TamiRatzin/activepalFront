
import React, { useState } from 'react';
import EventForm from './EventForm';
import InviteParticipants from './InviteParticipants';
import NavigationBar from '../../Elements/NavigationBar';
import './event.css';
import EventParticipantsManager from './EventParticipantsManager';


export default function Event() {
    const [event, setEvent] = useState(null); // כל פרטי האירוע יישמרו כאן
    const [participants, setParticipants] = useState([]); // משתתפים שהוזמנו
    
    // יצירת אירוע
    const handleCreateEvent = (eventData) => {
      // יצירת אירוע ושמירתו ב-state
      setEvent({ ...eventData, participants: [] }); // התחלה עם רשימת משתתפים ריקה  
      console.log(eventData)
    };
  
    // הזמנת משתתפים
    const handleInviteParticipants = (participantList) => {
      setParticipants(participantList); // עדכון רשימת המשתתפים
      if (event) {
        setEvent((prevEvent) => ({ ...prevEvent, participants: participantList })); // עדכון האירוע עם המשתתפים שהוזמנו
      }
    };
  
 
    const usersList = [
        { id:1,name: 'John Doe', profileImage: "https://via.placeholder.com/40" },
        { id:2,name: 'Jane Smith', profileImage: "https://via.placeholder.com/40" },
        // עוד משתמשים
      ];

     
  
    return (
      <> 
     
      <div className="divEvent">
      <NavigationBar></NavigationBar>
      <div className='event-details'>  
      <h2>Create event</h2>  
       <EventForm onCreate={handleCreateEvent} />
       </div>
    
        {event && (
          <>
         
           <div className='usesDiv'> 

           <InviteParticipants 
              onInvite={handleInviteParticipants} 
               participants={participants} 
                usersList={usersList} 
                                      />
           <EventParticipantsManager userslist={ usersList }></EventParticipantsManager>
            
            </div>
           
          </>

        )}
      </div>
      </>
    );
  }