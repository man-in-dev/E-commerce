import Category from "../models/category.js";

export const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const categoryExist = await Category.findOne({ name });
        if (categoryExist) {
            res.status(400).json({
                success: false,
                message: "Category already exist"
            });

            return;
        }

        const category = await Category.create({ name, image });

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while creating Category"
        });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            message: "Getting all Categories Successfully",
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting all Categories"
        });
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: "Getting Category Successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting Category"
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const category = await Category.findByIdAndUpdate(req.params.id, { name, image }, { new: true });

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while Updating Category"
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while deleting Category"
        });
    }
}