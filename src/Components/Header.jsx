import axios from 'axios';
axios.defaults.withCredentials = true;

const Header = ({ isLoggedIn, setIsLoggedIn, userData, setUserData }) => {

    const handleLogout = async () => {
        try {
          const response = await axios.post('https://spellscribe-api.onrender.com/logout');
          setIsLoggedIn(false);
          setUserData({});
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      }

    return ( 
        <header>
            <h1>SpellScribe</h1>
            {isLoggedIn && 
              <div className='logout-wrapper'>
                <div>{userData.username.split('@')[0]}</div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            }
        </header>
     );
}
 
export default Header;