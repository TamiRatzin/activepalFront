
import React from 'react';
import NotificationItem from '../Elements/NotificationItem';
import '../Elements/Notifications.css';
import { Row, Col } from 'react-bootstrap';
import NavigationBar from '../Elements/NavigationBar';
import { Outlet } from 'react-router-dom';


export default function FCnotification() {

    const notifications = [
        {
          avatar: 'https://via.placeholder.com/40', // Placeholder image URL
          name: 'Tom Ram and Avidan Gerber',
          description: 'reacted to a post...',
          time: '22m',
          linkText: null,
          linkUrl: null,
        },
        {
          avatar: 'https://via.placeholder.com/40',
          name: 'data analyst',
          description: '2 opportunities in Israel',
          time: '22m',
          linkText: 'View jobs',
          linkUrl: '#',
        },
        {
          avatar: 'https://via.placeholder.com/40',
          name: 'Keren Tal',
          description: 'posted: מלאו עוד היום...',
          time: '2h',
          linkText: 'http://bit.ly/DreamJob2',
          linkUrl: 'http://bit.ly/DreamJob2',
        },
        // Add more notifications as needed
      ];

      
  return (
    
    <>
      <NavigationBar></NavigationBar>
   <Row> <Col>  <h2 className="notifications-title">Notifications</h2> </Col> </Row>
    <div className="notifications-container">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} {...notification} />

      ))}
      <Outlet/>
    </div>
  
    </>


  )
}
