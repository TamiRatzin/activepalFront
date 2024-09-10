import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCalendarAlt,  faMessage, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Row,Col } from 'react-bootstrap';
import { Link } from'react-router-dom';


  const  SearchBarContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top:20px;
  
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  width:90%;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  padding: 5px 10px;
  margin-right: 20px;
  border-radius: 120px;
`;



const ActionsContainer = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  gap: 50px;
`;
 


const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-evenly ;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 5px;
  }
`;

 export default function SearchBar ()  {
  return (
    <>
<SearchBarContainer>
    <Row xs={12} >
    <Col xs={2} md={3} >
    <Link to="/profilePage"><ProfileImage src="https://via.placeholder.com/40" alt="Profile" /></Link>
   
    </Col>
    <Col   xs={10} md={9} >
    <SearchInput type="text" placeholder="Search...." />
    </Col>
      </Row>
      <Row xs={12} className='p-2'> 
      <ActionsContainer>
        <ActionButton>
          <FontAwesomeIcon size='lg' icon={faPlusCircle} />
        </ActionButton>
        <ActionButton>
          <Link to='/event'><FontAwesomeIcon size='lg' icon={faCalendarAlt} /> </Link>
        
        </ActionButton>
        <ActionButton>
        <Link to="/Chats"><FontAwesomeIcon size='lg'  icon={faMessage} /> </Link>
          
        </ActionButton>
      </ActionsContainer>
      </Row>
    </SearchBarContainer>
    </> 


  );
};




