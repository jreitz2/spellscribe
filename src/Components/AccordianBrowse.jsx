import { useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
import right from '../assets/right.png';
import down from '../assets/down.png';

const AccordianBrowse = ({ spell, selectedCharacter, userData, setUserData }) => {
    const [expanded, setExpanded] = useState(false);
    const [spellDetails, setSpellDetails] = useState({});
    const [failedAdd, setFailedAdd] = useState(false);
    const [failedAddDuplicate, setFailedAddDuplicate] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);

    const handleToggle = async () => {
        if (!expanded) {
            const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spell.index}`)
            const data = await response.json();
            setSpellDetails(data);
        }
        setExpanded(!expanded);
    }
    
    const addToSpellbook = async () => {
        if (selectedCharacter === undefined) {
            setFailedAdd(true);
        } else {
            try {
                const characterIndex = userData.characters.findIndex((character) => character._id === selectedCharacter);
                const characterSpells = [...userData.characters[characterIndex].spells];
                const isSpellAlreadyAdded = userData.characters[characterIndex].spells.some((addedSpell) => addedSpell.index === spell.index);
                if (!isSpellAlreadyAdded) {
                    characterSpells.push(spell);
                    const updatedCharacter = {
                        ...userData.characters[characterIndex],
                        spells: characterSpells,
                      };
                    const updatedCharacters = [...userData.characters];
                    updatedCharacters[characterIndex] = updatedCharacter;
                    const updatedUserData = {
                        ...userData,
                        characters: updatedCharacters,
                      };
                    const response = await axios.put(`https://spellscribe-api.onrender.com/update-user/${userData._id}`, updatedUserData);
                    console.log(response.data);
                    setUserData(updatedUserData);
                    setSuccessAdd(true);
                } else {
                    setFailedAddDuplicate(true);
                    setSuccessAdd(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        setFailedAdd(false);
        setSuccessAdd(false);
        setFailedAddDuplicate(false);
    }, [spell]);

    return ( 
        <li className="accordian-item">
            {spell && (
                <div className="accordian-header">
                    <div className="accordian-title" onClick={handleToggle}>
                        <img src={expanded? down : right} alt="expand/compress" />
                        <p>{spell.name}</p>
                    </div>
                    
                    <button onClick={addToSpellbook}>+</button>
                </div>
            )}
            {failedAdd && <p className="error">Please select a character first!</p>}
            {failedAddDuplicate && <p className="error">The selected character already has this spell!</p>}
            {successAdd && <p className="success">Added to spellbook!</p>}
            {expanded && (
                <div className="accordian-expanded">
                    <p>Level: <span className="thinner-text">{spellDetails.level}</span></p>
                    <p>School: <span className="thinner-text">{spellDetails.school.name}</span></p>
                    {spellDetails.ritual && <p>Ritual</p>}
                    {spellDetails.concentration && <p>Concentration</p>}
                    <p>Casting Time: <span className="thinner-text">{spellDetails.casting_time}</span></p>
                    <p>Range: <span className="thinner-text">{spellDetails.range}</span></p>
                    <p>Duration: <span className="thinner-text">{spellDetails.duration}</span></p>
                    <p>Description: <span className="thinner-text">{spellDetails.desc.join(' ')}</span></p>
                </div>
            )}
        </li>
     );
}
 
export default AccordianBrowse;