import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("https://rickandmortyapi.com/api/character");
        setCharacters(response.data.results.slice(0, 20)); // Fetch the first 20 characters
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchCharacters();
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="App">
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id} onClick={() => openModal(character)}>
            {character.name}
          </li>
        ))}
      </ul>

      {selectedCharacter && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Character Details">
          <h2>{selectedCharacter.name}</h2>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
          <p>Gender: {selectedCharacter.gender}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
