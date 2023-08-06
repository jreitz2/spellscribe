import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Login from './Components/Login';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Search from './Components/Search';
import Browse from './Components/Browse';
import Characters from './Components/Characters';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [userData, setUserData] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState(undefined);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://spellscribe-api.onrender.com/check-login', { withCredentials: true });
        setIsLoggedIn(response.data.loggedIn);
        setUserData(response.data.user);
        console.log(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData} setUserData={setUserData} />
        {!isLoggedIn && <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/>}
        {isLoggedIn && <Navbar />}
        {isLoggedIn && <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search userData={userData} setUserData={setUserData} selectedCharacter={selectedCharacter}/>} />
          <Route path="/Browse" element={<Browse userData={userData} setUserData={setUserData} selectedCharacter={selectedCharacter} />} />
          <Route path="/Characters" element={<Characters userData={userData} setUserData={setUserData} 
            selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} />} />
        </Routes>
        }
      </BrowserRouter>
    </>
  )
}

export default App
