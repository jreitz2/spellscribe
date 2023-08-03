import { useState } from "react";
import right from '../assets/right.png';
import down from '../assets/down.png';
import AccordianCharaSpell from "./AccordianCharaSpell";

const AccordianCharacter = ({ character, handleDeleteCharacter, selectedCharacter, setSelectedCharacter, userData, setUserData }) => {
    
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    }

    const handleSelectedCharacter = (charaId) => {
        setSelectedCharacter(charaId);
    }

    return ( 
        <li className={selectedCharacter === character._id ? "selectedChara accordian-item" : "accordian-item"}>
            <div className='accordian-header'>
                <div className='accordian-title' onClick={handleToggle}>
                    <img src={expanded? down : right} alt="expand/compress" />
                    <p>{character.characterName} - {character.characterClass}</p>
                </div>
                <div className="character-buttons">
                    <button onClick={() => handleSelectedCharacter(character._id)}>Select</button>
                    <button onClick={() => handleDeleteCharacter(character._id)}>Delete</button>
                </div>
            </div>
            {expanded && (
                <ul className="accordian-expanded">
                    {character.spells.map((spell) => (
                        <AccordianCharaSpell key={spell.index} spell={spell} character={character}
                         userData={userData} setUserData={setUserData} />
                    ))}
                </ul>
            )}
        </li>
     );
}
 
export default AccordianCharacter;