


import React, { useState, useEffect } from 'react';
import './Preferences.css'; // Import custom CSS for styling

const PreferenceItem = ({ preference, onRemove }) => (
  <div className="preference-item">
    <span>{preference}</span>
    <button onClick={() => onRemove(preference)} className="remove-button">✖</button>
  </div>
);

export default function Preferences({ preferences, onChange, isEditable }) {
  const [newDay, setNewDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [newTime, setNewTime] = useState('');
  const [preferredSports, setPreferredSports] = useState(preferences.sports || []);
  const [newSport, setNewSport] = useState('');

  const days = Array.isArray(preferences.days) ? preferences.days : preferences.days.split(',').map(day => day.trim());
  const times = Array.isArray(preferences.hours) ? preferences.hours : preferences.hours.split(',').map(hour => hour.trim());

  useEffect(() => {
    setPreferredSports(preferences.sports || []);
  }, [preferences.sports]);

  const handleAddPreference = () => {

    setNewTime(`${startTime} - ${endTime}`);
    if (newDay && newTime) {
      onChange({
        ...preferences,
        days: [...days, newDay],
        hours: [...times, newTime],
      });
      setNewDay('');
      setNewTime('');
      setEndTime('');
      setStartTime('');
    }
  };

  const handleAddSport = () => {
    if (newSport && !preferredSports.includes(newSport)) {
      setPreferredSports([...preferredSports, newSport]);
      setNewSport('');
    }
  };

  const handleRemoveSport = (sport) => {
    setPreferredSports(preferredSports.filter(s => s !== sport));
  };

  return (
    <>
    {isEditable ? (
      <div className="preferences-form">
        {/* Preferred Sports Section */}
        <h3>Preferred Sports</h3>
        <div className="input-group">
          <div className="input-row">
            <input 
              type="text" 
              value={newSport} 
              onChange={(e) => setNewSport(e.target.value)} 
              placeholder="Add a sport" 
              className="input-field"
            />
            <button onClick={handleAddSport} className="add-button">Add</button>
          </div>
          <div className="sports-list">
            {preferredSports.map((sport, index) => (
              <div key={index} className="sport-item">
                <span>{sport}</span>
                <button onClick={() => handleRemoveSport(sport)} className="remove-button">✖</button>
              </div>
            ))}
          </div>
        </div>

        {/* Days and Hours Section */}
        <h3>Availability</h3>
        <div className="input-group">
          <div className="input-row">
            <label>Day:</label>
            <select 
              value={newDay} 
              onChange={(e) => setNewDay(e.target.value)} 
              className="days-select"
            >
              <option value="">Select</option>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <div className='timeRange'>  
            <label>Start Time:</label>
            <input 
              className="input-field" 
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label>End Time:</label>
            <input 
              className="input-field" 
              type="time" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)} 
              min={startTime} /* Setting the min value for end time */
            />
             </div>
            <button onClick={handleAddPreference} className="add-button">Add</button>
          </div>
        </div>

        {/* Preferences List */}

        <div className="preferences-list">
          {days.map((day, index) => (
            <PreferenceItem 
              key={index} 
              preference={`${day} (${times[index] || ''})`} 
              onRemove={() => {
                const updatedDays = days.filter(d => d !== day);
                const updatedTimes = times.filter((_, i) => i !== index);
                onChange({ ...preferences, days: updatedDays, hours: updatedTimes });
              }} 
            />
          ))}
        </div>
      </div>
    ) : (
      <div className="preferences-view">
      {/* Sports Section */}
      <div className="card sports-section">
        <div className="card-header">
          <span>Preferred Sports</span>
        </div>
        <div className="card-content">
        
          {preferredSports.length > 0 ? (
            preferredSports.map((sport, index) => (
              <React.Fragment key={index}>
                <div className="view-item">{sport}</div>
                
              </React.Fragment>
            ))
          ) : (
            <div className="view-item">No preferred sports</div>
          )}
        </div>
      </div>

      {/* Time Section */}
      <div className="card time-section">
        <div className="card-header">
          <span>Time Preferences</span>
        </div>
        <table className="preferences-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time Range</th>
            </tr>
          </thead>
          <tbody>
            {days.length > 0 ? (
              days.map((day, index) => (
                <tr key={index}>
                  <td>{day}</td>
                  <td>{times[index]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>No time preferences</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )};
      {/*<div className="preferences-view">
        <p><strong>Days:</strong> {days.join(', ')}</p>
        <p><strong>Hours:</strong> {times.join(', ')}</p>
        <p><strong>Preferred Sports:</strong> {preferredSports.join(', ')}</p>
      </div>*/}
    
  </>
  );
}
