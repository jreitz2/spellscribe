import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
axios.defaults.withCredentials = true;

const Login = ({ isLoggedIn, setIsLoggedIn, setUserData }) => {
    const [signupForm, setSignupForm] = useState({
        username: '',
        password: ''
      });
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
      });
    const [showSignup, setShowSignup] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);
    const navigate = useNavigate();
    
    const handleSignupChange = (e) => {
        const {name, value} = e.target;
        setSignupForm((prev) => ({...prev, [name]: value}));
      };
    
    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLoginForm((prev) => ({...prev, [name]: value}));
      };
    
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/signup', signupForm);
        console.log(response.data.message);
        setSignupForm({
          username: '',
          password: ''
        })
        handleShowSignup();
      } catch (err) {
        console.log(err);
      }
    }
    
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/login', loginForm);
        console.log(response.data)
        setLoginForm({
            username: '',
            password: ''
        });
        navigate('/');
        setIsLoggedIn(true);
        setUserData(response.data.user);
      } catch (err) {
        console.log(err);
        setFailedLogin(true);
      }
    }

    const handleShowSignup = () => {
      setShowSignup((prevShowSignup) => !prevShowSignup);
      setFailedLogin(false);
    }

    return ( 
        <div className='login-wrapper'>
          {!showSignup &&
          <div>
            <h2>Login to use SpellScribe!</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="loginUsername">Email/Username: </label>
                <input 
                type="email" 
                name="username"
                id="loginUsername" 
                value={loginForm.username} 
                onChange={handleLoginChange} 
                required
                />
                <br />
                <label htmlFor="loginPassword">Password: </label>
                <input 
                type="password" 
                name="password" 
                id="loginPassword"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {failedLogin && <p className='error' style={{textAlign: 'left'}}>Login failed. Have you created an account?</p>}
            <p>Not already a user? <a href="#" onClick={handleShowSignup}>Sign up!</a></p>
          </div> }

          {showSignup && 
          <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <label htmlFor="signupUsername">Username: </label>
                <input 
                type="email" 
                name="username"
                id="signupUsername" 
                value={signupForm.username} 
                onChange={handleSignupChange} 
                required
                />
                <br />
                <label htmlFor="signupPassword">Password: </label>
                <input 
                type="password" 
                name="password" 
                id="signupPassword"
                value={signupForm.password}
                onChange={handleSignupChange}
                required
                />
                <br />
                <button type="submit">Signup</button>
                <p>Already a user? <a href="#" onClick={handleShowSignup}>Back to login!</a></p>
            </form>
          </div> }
        </div>
     );
}
 
export default Login;