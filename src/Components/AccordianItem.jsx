import { useEffect, useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
import right from '../assets/right.png';
import down from '../assets/down.png';

const AccordianItem = ({ spell, selectedCharacter, userData, setUserData }) => {
    const [expanded, setExpanded] = useState(false);
    const [failedAdd, setFailedAdd] = useState(false);
    const [failedAddDuplicate, setFailedAddDuplicate] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    
    const handleToggle = () => {
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
                    const response = await axios.put(`http://localhost:5000/update-user/${userData._id}`, updatedUserData);
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
        <div className="accordian-item">
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
                    <p>Level: <span className="thinner-text">{spell.level}</span></p>
                    <p>School: <span className="thinner-text">{spell.school.name}</span></p>
                    {spell.ritual && <p>Ritual</p>}
                    {spell.concentration && <p>Concentration</p>}
                    <p>Casting Time: <span className="thinner-text">{spell.casting_time}</span></p>
                    <p>Range: <span className="thinner-text">{spell.range}</span></p>
                    <p>Duration: <span className="thinner-text">{spell.duration}</span></p>
                    <p>Description: <span className="thinner-text">{spell.desc.join(' ')}</span></p>
                </div>
            )}
        </div>
     );
}
 
export default AccordianItem;