import React from 'react';
import styled from 'styled-components';
import { memo } from 'react';


const ProfileContainer = styled.div`
   margin-top:10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   border: 1px solid #ccc;
   margin-bottom:10px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;



 const  ProfilePicture =memo( ({ src, online })=> {
  return (
    <ProfileContainer>
      <Image src="https://via.placeholder.com/40" alt="Profile"  />
    </ProfileContainer>
  );
});

export default ProfilePicture
