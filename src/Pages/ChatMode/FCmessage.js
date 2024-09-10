import React from 'react'
import styled from 'styled-components';



const MessageWrapper = styled.div`
  padding: 10px;
  display: flex;
  margin-bottom: 15px;
  justify-content: ${({ $isSender }) => ($isSender ? 'flex-end' : 'flex-start')};
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  max-height:80%
  position: relative;
  border-radius: 50%;
  margin: ${({ $isSender }) => ($isSender ? '0 0 0 5px' : '0 5px 0 0')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: -10px;
`;

const MessageContent = styled.div`
  max-width: 70%;
  background: ${({ $isSender }) => ($isSender ? '#007bff' : '#f1f0f0')};
  color: ${({ $isSender }) => ($isSender ? 'white' : 'black')};
  padding: 10px;
  border-radius: 20px;
  font-size: 14px;
  position: relative;
  top: 10px;

`;

const Timestamp = styled.p`
 font-size: 12px; /* Reduced font size */
  margin: 5px 0 0 10px; /* Adjusted margin */
  color: ${({ $isSender }) => ($isSender ? 'white' : 'black')};
  text-align: ${({ $isSender }) => ($isSender ? 'right' : 'left')};
`;

export default function FCmessage( {isSender, profileImage, text, time }) {

  

  return (
    <>
    <MessageWrapper $isSender={isSender}>
      {!isSender && <ProfileImage src={profileImage} alt="Profile" $isSender={isSender} />}
      <MessageContent $isSender={isSender}>
        {text}
        <Timestamp  $isSender={isSender}> {time}</Timestamp>
      </MessageContent>
     
      {isSender && <ProfileImage src={profileImage} alt="Profile" $isSender={isSender} />}
    </MessageWrapper>
  </>
  )
}
