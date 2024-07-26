import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPokemon } from '../../redux/actions';
import './create.styles.css';

const CreatePage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    image: '',
    health: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <input type="text" name="types" value={form.types} onChange={(e) => setForm({ ...form, types: e.target.value.split(',') })} placeholder="Enter types separated by comma" />
        </label>
        <button type="submit">Create Pokémon</button>
      </form>
    </div>
  );
};

export default CreatePage;
