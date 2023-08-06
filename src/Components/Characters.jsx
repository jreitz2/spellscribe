import { useState } from 'react';
import axios from 'axios';
import AccordianCharacter from './AccordianCharacter';
axios.defaults.withCredentials = true;

const Characters = ({ userData, setUserData, selectedCharacter, setSelectedCharacter }) => {
    const [newCharacterForm, setNewCharacterForm] = useState({
        characterName: "",
        characterClass: "Bard"
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCharacterForm((prev) => ({...prev, [name]: value}));
      };

    const handleCreateCharacter = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://spellscribe-api.onrender.com/create-character/${userData._id}`, newCharacterForm);
            console.log(response.data);
            // const newCharacter = {
            //     characterName: newCharacterForm.characterName,
            //     characterClass: newCharacterForm.characterClass,
            //     spells: [],
            // }

            // const updatedUserData = {
            //     ...userData,
            //     characters: [...userData.characters, newCharacter],
            // }
            setUserData(response.data.user);
            
            setNewCharacterForm({
                characterName: "",
                characterClass: "Bard"
            });
            // const response2 = await axios.get('https://spellscribe-api.onrender.com/check-login', { withCredentials: true });
            // setUserData(response2.data.user);
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleDeleteCharacter = async (characterId) => {
        try {
            const updatedUserData = {
                ...userData,
                characters: userData.characters.filter((character) => character._id !== characterId),
            }
            const response = await axios.put(`https://spellscribe-api.onrender.com/update-user/${userData._id}`, updatedUserData);
            console.log(response.data);
            if(characterId === selectedCharacter) {
                setSelectedCharacter(undefined);
            }
            setUserData(updatedUserData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='content-wrapper'>
            <h2>New Character</h2>
            <form onSubmit={handleCreateCharacter}>
                <label htmlFor="characterName">Name: </label>
                <input 
                type="text"
                name="characterName"
                id="characterName"
                value={newCharacterForm.characterName}
                onChange={handleChange}
                required
                />
                <br />
                <label htmlFor="characterClass">Class: </label>
                <select
                name="characterClass"
                id="characterClass"
                value={newCharacterForm.characterClass}
                onChange={handleChange}
                required
                >
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Druid">Druid</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Warlock">Warlock</option>
                    <option value="Wizard">Wizard</option>
                </select>
                <br />
                <button type="submit">Create</button>
            </form>

            <h2>Characters</h2>
            {userData.characters.length === 0 && 
                <p>No character yet</p>
            }
            <ul>
                {userData.characters.map((character) => (
                    <AccordianCharacter key={character._id} character={character} selectedCharacter={selectedCharacter}
                    setSelectedCharacter={setSelectedCharacter} handleDeleteCharacter={handleDeleteCharacter}
                    userData={userData} setUserData={setUserData} />
                ))}
            </ul>
        </div>
     );
}

export default Characters;