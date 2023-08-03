import { useState } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
import right from '../assets/right.png';
import down from '../assets/down.png';

const AccordianCharaSpell = ({ spell, character, userData, setUserData }) => {

    const [spellDetails, setSpellDetails] = useState({});
    const [expanded, setExpanded] = useState(false);

    const handleSpellToggle = async () => {
        if (!expanded) {
            const response = await fetch(`https://www.dnd5eapi.co${spell.url}`)
            const data = await response.json();
            setSpellDetails(data);
        }
        setExpanded(!expanded);
    }

    const handleDeleteSpell = async () => {
        const updatedSpells = character.spells.filter((sp => sp.index !== spell.index));
        const updatedCharacter = {
            ...character,
            spells: updatedSpells,
        }
        const updatedCharacters = userData.characters.map((char) => {
            return char._id === character._id ? updatedCharacter : char;
        })
        const updatedUserData = {
            ...userData,
            characters: updatedCharacters,
        }
        const response = await axios.put(`https://spellscribe-api.onrender.com/update-user/${userData._id}`, updatedUserData);
        console.log(response.data);
        setUserData(updatedUserData);
    }

    return ( 
        <li className="spell-indent">
            <div className="accordian-header">
                <div className="accordian-title" onClick={handleSpellToggle}>
                    <img src={expanded? down : right} alt="expand/compress" />
                    <p>{spell.name}</p>
                </div>
                <button onClick={handleDeleteSpell}> &ndash; </button>
            </div>
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
 
export default AccordianCharaSpell;