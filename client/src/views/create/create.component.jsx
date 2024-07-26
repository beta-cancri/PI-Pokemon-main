import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createPokemon } from '../../redux/actions';
import './create.styles.css';

const CreatePage = () => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    image: '',
    health: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    typeIds: []
  });

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/types');
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching types:', error.message);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setForm({
      ...form,
      typeIds: selectedOptions.map(id => parseInt(id))
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some(value => value === '' || value.length === 0)) {
      alert('Please fill out all fields.');
      return;
    }
    dispatch(createPokemon(form));
  };

  return (
    <div className="create">
      <h1>Create a New Pokémon</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input type="text" name="image" value={form.image} onChange={handleChange} />
        </label>
        <label>
          Health:
          <input type="number" name="health" value={form.health} onChange={handleChange} />
        </label>
        <label>
          Attack:
          <input type="number" name="attack" value={form.attack} onChange={handleChange} />
        </label>
        <label>
          Defense:
          <input type="number" name="defense" value={form.defense} onChange={handleChange} />
        </label>
        <label>
          Speed:
          <input type="number" name="speed" value={form.speed} onChange={handleChange} />
        </label>
        <label>
          Height:
          <input type="number" name="height" value={form.height} onChange={handleChange} />
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={form.weight} onChange={handleChange} />
        </label>
        <label>
          Types:
          <select multiple={true} value={form.typeIds} onChange={handleTypeChange}>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Pokémon</button>
      </form>
    </div>
  );
};

export default CreatePage;
