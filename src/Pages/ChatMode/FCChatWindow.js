import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import FCmessage from './FCmessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';




const ChatBoxContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height-max: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative; /* To handle positioning of header and footer */
`;

const ChatHeader = styled.div`
  height:10%;
  background-size: cover;
  content-justify:space-between;
  position: relative;
  color: white;
  padding:10px;
  border-bottom: 1px solid #ccc;


`;

const CloseButton = styled.div`
  position: relative;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: black;
  float:right;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
  float: left;
`;


const MContent = styled.div`
 height:80%;
 max-height:75vh;
 min-height: 75vh;
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  height: calc(100% - 20%); /* Full height minus header (10%) and footer (10%) */
  background: white;
  margin-top: 1%; /* To start content below the fixed header */
  margin-bottom: 1%; /* To end content above the fixed footer */
`;

const ChatFooter = styled.div`
  padding: 10px;
  background: white;
  border-top: 1px solid #ccc;
  display: flex;
  content-justify: center;
`;

const MessageInput = styled.input`
 display:flex;
  flex: 1;
  padding: 10px;
  margin:0 0 auto;
  border: none;
  border-radius: 20px;
  outline: none;
  background: #f2f2f2;
  font-size: 14px;
`;

const SendButton = styled.button`
  background: transparent;
  border: none;
  color: #007bff;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
`;



export default function FCChatWindow({ selectedChat,onCloseChat }) {
 
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.chat || []);
    }
  }, [selectedChat]);
  
 
const name =selectedChat.name
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
  
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1 , pImage:"path-to-sender-image.jpg",text: newMessage, sender: true, 
          timestamp:  Date.now() },
      ]);
      setNewMessage('');
    }};
    

    const formatDate = (timestamp) => {
      return new Intl.DateTimeFormat('en-US', { weekday:'short',month: 'long', day: 'numeric', year: 'numeric' }).format(timestamp);
    };
  
    const renderMessagesWithDateSeparators = () => {
      const elements = [];
      let lastDate = '';
  
      messages.forEach((msg, index) => {
        const messageDate = formatDate(msg.timestamp);
  
        if (messageDate !== lastDate) {
          elements.push(
            <div key={`date-${index}`} style={{ textAlign: 'center', margin: '10px 0', color: 'gray' }}>
              {messageDate}
            </div>
          );
          lastDate = messageDate;
        }
  
        elements.push(
          <FCmessage
            key={msg.id}
            pImage={msg.pImage}
            text={msg.text}
            time={new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }).format(msg.timestamp)}
            isSender={msg.sender}
          />
        );
      });
  
      return elements;
    };


  return (

    
    <ChatBoxContainer>
    <ChatHeader>
      <CloseButton onClick={onCloseChat}><FontAwesomeIcon icon={faArrowLeftLong} /></CloseButton>
      <ProfileImage src="https://via.placeholder.com/50" alt="Profile" />
      <h3 style={{'color':'black'}}>{name}</h3>
    </ChatHeader>
    <MContent>
    {renderMessagesWithDateSeparators()}
   { /*messages.map((msg) => (
      <FCmessage key={`${msg.id}${name}`}
                 pImage= {msg.pImage} 
                 text= {msg.text} 
                 time=  {new Intl.DateTimeFormat('en-US', { weekday:'short',hour: '2-digit', minute: '2-digit'}).format(msg.timestamp) }
                 isSender= {msg.sender} />

      ))*/}

     
      </MContent>
    <ChatFooter>
      <MessageInput
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Send a message..."
      />
      <SendButton onClick={handleSend}>&#9658;</SendButton>
    </ChatFooter>
  </ChatBoxContainer>

    

  )
}
