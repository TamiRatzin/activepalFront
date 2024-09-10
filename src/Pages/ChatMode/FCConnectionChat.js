import React, { useState } from 'react';
import FCChatList from './FCChatList';
import FCChatWindow from './FCChatWindow';
import SearchConnectionBar from './SearchConnectionBar';
import './ConnectionCht.css';
import NavigationBar from '../../Elements/NavigationBar';
export default function FCConnectionChat() {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

   // Mock messages for the selected chat. You would typically fetch this data from a database or API.
  // Here, we're using an array for simplicity.
  // Replace this with your own data fetching logic.
const messages1 = [
  { id: 1, pImage: "path-to-sender-image.jpg", text: 'Really cool stuff!', sender: true, timestamp:  Date.now() },
  { id: 2,  pImage:"path-to-sender-image.jpg",text: 'Can you share a link for the tutorial?', sender: false, timestamp:  Date.now() },
  { id: 3,  pImage:"path-to-sender-image.jpg",text: 'Yeah, hold on', sender: true, timestamp: Date.now() }
];

const messages2 = [
  { id: 1, pImage: "path-to-sender-image.jpg", text: 'tamir is the best !', sender: true, timestamp: Date.now() },
  { id: 2,  pImage:"path-to-sender-image.jpg",text: 'no fuck you?', sender: false, timestamp: Date.now() },
  { id: 3,  pImage:"path-to-sender-image.jpg",text: 'Yeah, hold on', sender: true, timestamp: Date.now() }
];
   


  const connections = [
    { id: 1, name: 'John Doe',chat:messages1 },
    { id: 2, name: 'Jane Smith',chat:messages2 },
    // Add more connections here
  ];

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (window.innerWidth <= 480) {
      setIsChatOpen(true); // Open chat and hide sidebar on small screens
    }
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    if (window.innerWidth <= 480) {
      setIsChatOpen(false); // Return to sidebar on small screens
    }
  };


  return (
<>
{!(isChatOpen && window.innerWidth <= 480) && <NavigationBar />}
<div className="chatPageContainer">
  
      <div className={`sidebar ${isChatOpen ? 'hidden' : ''}`}>
      <SearchConnectionBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FCChatList connections={connections} searchQuery={searchQuery} onSelectChat={handleSelectChat} />
      </div>
      <div className={`chat-container ${isChatOpen ? 'open' : ''}`}>
      {selectedChat&& ( <FCChatWindow selectedChat={selectedChat} onCloseChat={handleCloseChat}></FCChatWindow>)}
         
       </div>
    </div>
     </>


  );
}
