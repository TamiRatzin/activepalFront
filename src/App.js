
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Pages/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import Login from './Pages/Login/Login';
import HomePage from './Pages/homePage/homePage';
import FCnotification from './Pages/FCnotification';
import FCConnectionChat from './Pages/ChatMode/FCConnectionChat';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Event from './Pages/Event/Event';
import EventView from './Pages/Event/UsersView/Eventview';
import { UserProvider } from './Elements/UserContext'; 
import SearchUsers from './Elements/searchUsers';
import Connections from './Pages/Connections/Connections';

function App() {


 /* const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7065/api/User', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setUsers(result); // Update the state with the fetched users
        console.log(result);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once after the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
*/
  return (

<>

    <div className="App">
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login   ></Login>}></Route>
        <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
        <Route path='/homepage' element={<HomePage></HomePage>}></Route>
        <Route path="/notifications" element={<FCnotification></FCnotification>}></Route>
        <Route path="/Chats" element={<FCConnectionChat></FCConnectionChat>}></Route>
        <Route path="/ProfilePage" element={<ProfilePage></ProfilePage>} ></Route>
        <Route path="/event" element={<Event></Event>} ></Route>
        <Route path="/eventView" element={<EventView></EventView>}></Route>
        <Route path="/searchUsers" element={<SearchUsers></SearchUsers>}>  </Route>
        <Route path="/Connections" element={<Connections></Connections>}>  </Route>
      </Routes>
      </UserProvider>
    </div>
      
</>

  );
}

export default App;
