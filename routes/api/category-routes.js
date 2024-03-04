const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories including associated Products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });

    // Send the categories as a JSON response
    res.status(200).json(categories);
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product, }],
    })
    if (!categories) {
      return res.status(404).json({ error: 'Category not found' });
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
  // create a new category
  try {
    const categoryData = req.body;
    const category = await Category.create(categoryData);
    res.status(201).json(category);
  } catch (err) {
    // Log and handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  // Update a category by its `id` value
  try {
    // const categoryId = req.params.id; // Extract the category ID from the request parameters
    // const categoryData = req.body; // Extract the updated category data from the request body

    // Update the category in the database
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id, // Specify the category to update based on its ID
      },
    });

    // Check if any category was updated
    if (updatedCategory[0] === 0) {
      // If no category was updated (category with the specified ID not found), return a 404 status
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Send a success response with the updated category data
    res.status(200).json({ message: 'Category updated successfully.' });
  } catch (err) {
    // Handle errors by sending a 500 status with the error message
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Find the category by id and delete it
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!deletedCategory) {
      // If no category was found with the provided id, return 404 Not Found
      return res.status(404).json({ error: 'Category not found' });
    }

    // Return a success message indicating the category was deleted
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    // If an error occurs, return a 500 Internal Server Error with the error message
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
