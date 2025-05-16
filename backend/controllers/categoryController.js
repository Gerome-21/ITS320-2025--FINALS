import Category from '../models/categoryModel.js';

export const createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    const category = new Category({
      category_name,
      description,
      created_by: req.userId
    });

    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ created_by: req.userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

