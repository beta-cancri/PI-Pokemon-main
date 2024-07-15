const { getAllTypes } = require('../controllers/typeControllers');

const getTypeHandler = async (req, res) => {
  try {
    const response = await getAllTypes();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTypeHandler };
