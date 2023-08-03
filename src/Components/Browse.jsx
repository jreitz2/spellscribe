import { useState } from "react";
import AccordianBrowse from "./AccordianBrowse";

const Browse = ({ userData, selectedCharacter, setUserData }) => {
  
  const [browseParameters, setBrowseParameters] = useState({
    level: "",
    class: "",
    school: ""
  });
  const [browseResults, setBrowseResults] = useState([]);
  const [failedBrowse, setFailedBrowse] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setBrowseParameters((prev) => ({...prev, [name]: value}));
  };

  const handleBrowse = async (e) => {
    e.preventDefault();

    let browseClass = "";
    let data1 = [];
    if (browseParameters.class !== "") {
      browseClass = `classes/${browseParameters.class}/spells`;
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/${browseClass}`);
        data1 = await response.json();
        
        if (browseParameters.class !== "" && browseParameters.level === "" && browseParameters.school === "") {
          console.log("data1", data1);
          setFailedBrowse(data1.results.length === 0 ? true : false);
          setBrowseResults(data1.results);
        }
      } catch (err) {
        console.log(err);
      }
    }

    let browseTerm = "";
    if (browseParameters.school !== "" && browseParameters.level === "") {
      browseTerm = `spells?school=${browseParameters.school}`;
    } else if (browseParameters.school === "" && browseParameters.level === "" && browseParameters.class === "") {
      browseTerm = "spells?";
    } else {
      browseTerm = `spells?level=${browseParameters.level}&school=${browseParameters.school}`;
    }

    try {
      const response2 = await fetch(`https://www.dnd5eapi.co/api/${browseTerm}`);
      const data2 = await response2.json();

      if(browseParameters.class !== "") {
        if(browseParameters.level !== "" || browseParameters.school !== "") {
            // Perform intersection of spells from data1 and data2 based on spell's name
            const intersectedSpells = data1.results.filter((spell1) =>
            data2.results.some((spell2) => spell2.name === spell1.name)
            );
            console.log("intersected", intersectedSpells);
            setFailedBrowse(intersectedSpells.length === 0 ? true : false);
            setBrowseResults(intersectedSpells);
        }
      } else {
        console.log("data2", data2)
        setFailedBrowse(data2.results.length === 0 ? true : false);
        setBrowseResults(data2.results);
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  
  return ( 
        <div className="content-wrapper">
            <p>Apply one or more filters and browse matching spells!</p>
            <form onSubmit={handleBrowse}>
              <label htmlFor="level">Level: </label>
                <select 
                name="level" 
                id="level"
                value={browseParameters.level}
                onChange={handleChange}
                >
                  <option value="">Any</option>
                  <option value="0">0/Cantrip</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              <br />
              <label htmlFor="class">Class: </label>
                <select 
                name="class" 
                id="class"
                value={browseParameters.class}
                onChange={handleChange}
                >
                  <option value="">Any</option>
                  <option value="bard">Bard</option>
                  <option value="cleric">Cleric</option>
                  <option value="druid">Druid</option>
                  <option value="paladin">Paladin</option>
                  <option value="ranger">Ranger</option>
                  <option value="sorcerer">Sorcerer</option>
                  <option value="warlock">Warlock</option>
                  <option value="wizard">Wizard</option>
                </select>
              <br />
              <label htmlFor="school">School: </label>
                <select 
                name="school" 
                id="school"
                value={browseParameters.school}
                onChange={handleChange}
                >
                  <option value="">Any</option>
                  <option value="abjuration">Abjuration</option>
                  <option value="conjuration">Conjuration</option>
                  <option value="divination">Divination</option>
                  <option value="enchantment">Enchantment</option>
                  <option value="evocation">Evocation</option>
                  <option value="illusion">Illusion</option>
                  <option value="necromancy">Necromancy</option>
                  <option value="transmutation">Transmutation</option>
                </select>
              <br />
              <button type="submit">Submit</button>
            </form>
            {failedBrowse && <p className="error">There are no matching spells in the SRD</p>}
            {browseResults.length !== 0 && <p>{browseResults.length} results</p>}
            <ul>
              {browseResults.length !== 0 && browseResults.map((spell) => (
                <AccordianBrowse key={spell.index} spell={spell} userData={userData} selectedCharacter={selectedCharacter}
                  setUserData={setUserData} />
              ))}
            </ul>
        </div>
     );
}
 
export default Browse;