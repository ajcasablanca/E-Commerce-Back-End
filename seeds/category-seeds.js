const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
    category_description: ''
  },
  {
    category_name: 'Shorts',
    category_description: ''
  },
  {
    category_name: 'Music',
    category_description: ''
  },
  {
    category_name: 'Hats',
    category_description: ''
  },
  {
    category_name: 'Shoes',
    category_description: ''
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
