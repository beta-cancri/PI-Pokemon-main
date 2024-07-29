import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createPokemon } from '../../redux/actions';
import { toast } from 'react-toastify';
import './create.styles.css';

const typeImages = {
  normal: 'https://i.imgur.com/Lbdodvd.png',
  fire: 'https://i.imgur.com/HX0e6cR.png',
  water: 'https://i.imgur.com/YbRxT4V.png',
  grass: 'https://i.imgur.com/gUKk5Ik.png',
  rock: 'https://i.imgur.com/IP2mQeI.png',
  steel: 'https://i.imgur.com/IOjkJ1C.png',
  psychic: 'https://i.imgur.com/0uikIqg.png',
  poison: 'https://i.imgur.com/YYKiOA1.png',
  fighting: 'https://i.imgur.com/3Uz1rIH.png',
  flying: 'https://i.imgur.com/cKrcb8U.png',
  ground: 'https://i.imgur.com/pDGN8Rf.png',
  bug: 'https://i.imgur.com/sQVfDgc.png',
  ghost: 'https://i.imgur.com/OsVFeqL.png',
  fairy: 'https://i.imgur.com/qoXOnXH.png',
  unknown: 'https://i.imgur.com/TKaaKZg.png',
  dark: 'https://i.imgur.com/t9Hb89A.png',
  dragon: 'https://i.imgur.com/3dsst6S.png',
  ice: 'https://i.imgur.com/rDBPlbV.png',
  electric: 'https://i.imgur.com/Nd9pGpY.png',
  stellar: 'https://i.imgur.com/eMWxTmI.png',
};

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
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const maxTypes = 2; // Set the maximum number of types

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

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (!form.name) newErrors.name = 'Name is required';
      if (!form.image) newErrors.image = 'Image is required';
      if (!form.health) newErrors.health = 'Health is required';
      if (!form.attack) newErrors.attack = 'Attack is required';
      if (!form.defense) newErrors.defense = 'Defense is required';
      if (!form.speed) newErrors.speed = 'Speed is required';
      if (!form.height) newErrors.height = 'Height is required';
      if (!form.weight) newErrors.weight = 'Weight is required';
      if (form.typeIds.length === 0) newErrors.typeIds = 'At least one type is required';
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [form]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeClick = (typeId) => {
    setForm((prevForm) => {
      const newTypeIds = prevForm.typeIds.includes(typeId)
        ? prevForm.typeIds.filter((id) => id !== typeId)
        : [...prevForm.typeIds, typeId];

      if (newTypeIds.length > maxTypes) {
        toast.error(`You can select up to ${maxTypes} types only`);
        return prevForm;
      }

      return { ...prevForm, typeIds: newTypeIds };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(createPokemon(form));
      toast.success('Pokemon created successfully!');
      setForm({
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
    }
  };

  return (
    <div className="create">
      <h1>Create a New Pokémon</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Image:
          <input type="text" name="image" value={form.image} onChange={handleChange} />
          {errors.image && <p className="error">{errors.image}</p>}
        </label>
        <label>
          Health:
          <input type="number" step="0.01" name="health" value={form.health} onChange={handleChange} />
          {errors.health && <p className="error">{errors.health}</p>}
        </label>
        <label>
          Attack:
          <input type="number" step="0.01" name="attack" value={form.attack} onChange={handleChange} />
          {errors.attack && <p className="error">{errors.attack}</p>}
        </label>
        <label>
          Defense:
          <input type="number" step="0.01" name="defense" value={form.defense} onChange={handleChange} />
          {errors.defense && <p className="error">{errors.defense}</p>}
        </label>
        <label>
          Speed:
          <input type="number" step="0.01" name="speed" value={form.speed} onChange={handleChange} />
          {errors.speed && <p className="error">{errors.speed}</p>}
        </label>
        <label>
          Height:
          <input type="number" step="0.01" name="height" value={form.height} onChange={handleChange} />
          {errors.height && <p className="error">{errors.height}</p>}
        </label>
        <label>
          Weight:
          <input type="number" step="0.01" name="weight" value={form.weight} onChange={handleChange} />
          {errors.weight && <p className="error">{errors.weight}</p>}
        </label>
        <div className="type-selection">
          {types.map((type) => (
            <img
              key={type.id}
              src={typeImages[type.name]}
              alt={type.name}
              className={`type-icon ${form.typeIds.includes(type.id) ? 'selected' : ''}`}
              onClick={() => handleTypeClick(type.id)}
            />
          ))}
          {errors.typeIds && <p className="error">{errors.typeIds}</p>}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Create Pokémon
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
