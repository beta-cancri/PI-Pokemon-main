import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createPokemon } from '../../redux/actions';
import HomeButton from '../../components/home-button/home-button.component';
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
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleTypeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setForm({
      ...form,
      typeIds: selectedOptions.map(id => parseInt(id))
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      dispatch(createPokemon(form));
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
          <input type="number" name="health" value={form.health} onChange={handleChange} />
          {errors.health && <p className="error">{errors.health}</p>}
        </label>
        <label>
          Attack:
          <input type="number" name="attack" value={form.attack} onChange={handleChange} />
          {errors.attack && <p className="error">{errors.attack}</p>}
        </label>
        <label>
          Defense:
          <input type="number" name="defense" value={form.defense} onChange={handleChange} />
          {errors.defense && <p className="error">{errors.defense}</p>}
        </label>
        <label>
          Speed:
          <input type="number" name="speed" value={form.speed} onChange={handleChange} />
          {errors.speed && <p className="error">{errors.speed}</p>}
        </label>
        <label>
          Height:
          <input type="number" name="height" value={form.height} onChange={handleChange} />
          {errors.height && <p className="error">{errors.height}</p>}
        </label>
        <label>
          Weight:
          <input type="number" name="weight" value={form.weight} onChange={handleChange} />
          {errors.weight && <p className="error">{errors.weight}</p>}
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
          {errors.typeIds && <p className="error">{errors.typeIds}</p>}
        </label>
        <button type="submit" disabled={!isFormValid}>Create Pokémon</button>
      </form>
    </div>
  );
};

export default CreatePage;
