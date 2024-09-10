import React from 'react';

const NotificationItem = ({ avatar, name, time, description, linkText, linkUrl }) => {
  return (
    <div className="notification-item">
      <img src={avatar} alt="avatar" className="avatar" />
      <div className="notification-content">
        <p>
          <strong>{name}</strong> {description}
        </p>
        {linkText && (
          <a href={linkUrl} className="notification-link">
            {linkText}
          </a>
        )}
        <span className="notification-time">{time}</span>
      </div>
    </div>
  );
};

export default NotificationItem;