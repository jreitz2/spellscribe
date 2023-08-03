import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav>
            <Link to="/">Home</Link>
            <Link to="/Search">Search</Link>
            <Link to="/Browse">Browse</Link>
            <Link to="/Characters">Characters</Link>
        </nav>
     );
}
 
export default Navbar;