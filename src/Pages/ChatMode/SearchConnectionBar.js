import React from 'react'
import styled from'styled-components';
import { Row,Col } from'react-bootstrap';



const  CSearchBarContainer = styled.div`
width:100%;
display: flex;
flex-direction: column;
align-items: center;
padding: 7px;
border: 1px solid #ccc;
border-radius: 20px;
margin-bottom: 20px;
background-color: #fff;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CSearchInput = styled.input`
flex: 1;
width:90%;
border: 1px solid #ccc;
outline: none;
font-size: 16px;
padding: 5px 10px;
margin-right: 20px;
border-radius: 120px;
`;



export default function SearchConnectionBar({ searchQuery, setSearchQuery }) {

   

  return (
    <CSearchBarContainer>
    <Row xs={12} >
    <Col xs={12}  >
    <h3> Contacts</h3>
    </Col>
    <Col xs={12}  >
    <CSearchInput type="text" placeholder="Search...."
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     />
    </Col>
  </Row>
  </CSearchBarContainer>
  )
}
