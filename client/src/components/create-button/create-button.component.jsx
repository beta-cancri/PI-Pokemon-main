import React from 'react';
import { Link } from 'react-router-dom';
import './create-button.styles.css';

const CreateButton = () => {
  return (
    <Link to="/create" className="create-button">
      Create Pokémon
    </Link>
  );
};

export default CreateButton;
