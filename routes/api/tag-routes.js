const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tag including associated Products
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });

    // Send the categories as a JSON response
    res.status(200).json(tags);
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  // find one tag by its `id` value
  // be sure to include its associated Products
  try {
    
    const tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, }],
    })
    if (!tags) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    // Send the category as a JSON response
    res.status(200).json(categories);
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tags = await Category.create(req.body);
    res.status(201).json(tags);
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  // Update a Tag by its `id` value
  try {

    // Update the Tag in the database
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id, // Specify the category to update based on its ID
      },
    });

    // Check if any tag was updated
    if (updatedTag[0] === 0) {
      // If no tag was updated (tag with the specified ID not found), return a 404 status
      return res.status(404).json({ message: 'Tag not found.' });
    }

    // Send a success response with the updated category data
    res.status(200).json({ message: 'Tag updated successfully.' });
  } catch (err) {
    // Handle errors by sending a 500 status with the error message
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Find the tag by id and delete it
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!deletedTag) {
      // If no tag was found with the provided id, return 404 Not Found
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Return a success message indicating the category was deleted
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    // If an error occurs, return a 500 Internal Server Error with the error message
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
