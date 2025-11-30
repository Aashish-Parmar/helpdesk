// src/controllers/phase4/kbCategoryController.js

const { KBCategory } = require("../../models");
const { Op } = require("sequelize");

// ---------------------------------------------------------
// ADMIN: Create a KB Category
// ---------------------------------------------------------
exports.createCategory = async (req, res) => {
    try {
        const { name, slug, description, sort_order, is_active } = req.body;

        const exists = await KBCategory.findOne({ where: { [Op.or]: [{ name }, { slug }] } });
        if (exists) {
            return res.status(400).json({ message: "Category name or slug already exists" });
        }

        const category = await KBCategory.create({
            name,
            slug,
            description,
            sort_order: sort_order ?? 0,
            is_active: is_active ?? true,
        });

        return res.status(201).json({
            message: "Category created successfully",
            data: category,
        });
    } catch (err) {
        console.error("Create Category Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ---------------------------------------------------------
// ALL USERS: Get all active categories (for frontend KB UI)
// ---------------------------------------------------------
exports.getActiveCategories = async (req, res) => {
    try {
        const categories = await KBCategory.findAll({
            where: { is_active: true },
            order: [["sort_order", "ASC"], ["name", "ASC"]],
        });

        return res.json({ data: categories });
    } catch (err) {
        console.error("Get Active Categories Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ---------------------------------------------------------
// ADMIN: Get all categories (active + inactive)
// ---------------------------------------------------------
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await KBCategory.findAll({
            order: [["created_at", "DESC"]],
        });

        return res.json({ data: categories });
    } catch (err) {
        console.error("Get All Categories Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ---------------------------------------------------------
// ADMIN: Update category
// ---------------------------------------------------------
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, sort_order, is_active } = req.body;

        const category = await KBCategory.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Prevent duplicate slug/name
        const duplicate = await KBCategory.findOne({
            where: {
                id: { [Op.ne]: id },
                [Op.or]: [{ name }, { slug }],
            },
        });

        if (duplicate) {
            return res.status(400).json({ message: "Slug or name already exists" });
        }

        await category.update({
            name,
            slug,
            description,
            sort_order,
            is_active,
        });

        return res.json({
            message: "Category updated successfully",
            data: category,
        });
    } catch (err) {
        console.error("Update Category Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ---------------------------------------------------------
// ADMIN: Delete category
// ---------------------------------------------------------
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await KBCategory.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();

        return res.json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Delete Category Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
