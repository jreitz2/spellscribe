import { useState } from 'react';
import AccordianItem from './AccordianItem';

const Search = ({ userData, selectedCharacter, setUserData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedSpell, setSearchedSpell] = useState();
    const [failedSearch, setFailedSearch] = useState(false);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm !== "") {
            const newSearchTerm = searchTerm.replace(/ /g, '-').toLowerCase();
            try {
                const response = await fetch(`http://www.dnd5eapi.co/api/spells/${newSearchTerm}`);
                const data = await response.json();
                
                if (data.error) {
                    setFailedSearch(true);
                } else {
                    setFailedSearch(false);
                    setSearchedSpell(data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return ( 
        <div className="content-wrapper">
            <p>Search by name for the spell you want!</p>
            <form onSubmit={handleSearch}>
                <input 
                type="text"
                name="searchSpell"
                id="searchSpell"
                value={searchTerm}
                onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            {failedSearch &&
                <p className='error'>No matching spell was found. Please try again.</p>
            }
            {searchedSpell &&
            <div className='accordian'>
                <AccordianItem spell={searchedSpell} userData={userData} selectedCharacter={selectedCharacter}
                  setUserData={setUserData} />
            </div>
            }
        </div>
     );
}
 
export default Search;