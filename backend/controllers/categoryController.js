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

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category_name, description } = req.body;

    const updated = await Category.findOneAndUpdate(
      { _id: categoryId, created_by: req.userId },
      { category_name, description, updated_at: Date.now() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", category: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deleted = await Category.findOneAndDelete({ _id: categoryId, created_by: req.userId });

    if (!deleted) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

