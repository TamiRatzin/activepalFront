
import { lazy,Suspense, useContext } from 'react';
import  { useState, useEffect } from 'react';
import './homePage.css';
/*import FCPost from '../../Elements/FCPost';
import NavigationBar from '../../Elements/NavigationBar';
import SearchBar from '../../Elements/SearchBar';
import CardCarousel from '../../Elements/CardCarousel';
import ProfilePicture from '../../Elements/ProfilePic';*/
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../../Elements/UserContext';
const NavigationBar = lazy(() => import('../../Elements/NavigationBar'));
const SearchBar = lazy(() => import('../../Elements/SearchBar'));
//const ProfilePicture = lazy(() => import('../../Elements/ProfilePic'));
const CardCarousel = lazy(() => import('../../Elements/CardCarousel'));
const FCPost = lazy(() => import('../../Elements/FCPost'));


 
const events = [
  {
      title: 'Volleyball',
      image: 'volleyball_image_url',
      subtitle: 'Intermediate level..',
      details: 'Tel Aviv 2 km from you 2 places remain ...',
  },
  {
      title: 'Soccer1',
      image: 'soccer_image_url',
      subtitle: 'Amateur',
      details: 'Ramat Gan 5 km from you 4 places remain',
  },
  {
    title: 'Soccer',
    image: 'soccer_image_url',
    subtitle: 'Amateur',
    details: 'Ramat Gan 5 km from you 4 places remain',
},
  // Add more events as needed
];

const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/50'
};

const postContent = "This is a sample LinkedIn post content. It's a beautiful day to code!";
const postImage = 'https://via.placeholder.com/600x400';
const timestamp = Date.now();
const likes = 688;
const comments = 23;
const reposts = 7;


export default function HomePage() {



  
  ;
  const { userId } =useUserContext();

  const [usernew, setUser] = useState(null);
  
   console.log(userId);
   useEffect(() => {
    if (userId) {
      // Fetch user data based on ID
      fetch(`https://localhost:7065/api/User/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    }
  }, [userId]);




  return (
<Suspense fallback={<div>Loading...</div>}>

<div className='homeContainer'>
<NavigationBar></NavigationBar>
<div className='left'> </div>
<div className='home-page'>
<SearchBar></SearchBar>
<div className="divHome">
<FCPost user={user} 
                content={postContent} 
                image={postImage} 
                timestamp={timestamp} 
                likes={likes}
                comments={comments}
                reposts={reposts}></FCPost>
<FCPost user={user} 
                content={postContent} 
                image={postImage} 
                timestamp={timestamp} 
                likes={likes}
                comments={comments}
                reposts={reposts}></FCPost>
<CardCarousel events={events} />
<FCPost user={user} 
                content={postContent} 
                image={postImage} 
                timestamp={timestamp} 
                likes={likes}
                comments={comments}
                reposts={reposts}> </FCPost>
<FCPost user={user} 
                content={postContent} 
                image={postImage} 
                timestamp={timestamp} 
                likes={likes}
                comments={comments}
                reposts={reposts}></FCPost>
<FCPost user={user} 
                content={postContent} 
                image={postImage} 
                timestamp={timestamp} 
                likes={likes}
                comments={comments}
                reposts={reposts}></FCPost>
                
</div>
<Outlet></Outlet>
</div>
<div className='right'> </div>
   </div>
</Suspense>
   
  )
}
