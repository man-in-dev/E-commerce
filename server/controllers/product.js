import Product from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock, category, brand } = req.body;
        if (!name || !description || !price || !image || !stock || !category || !brand) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const productExist = await Product.findOne({ name, category });
        if (productExist) {
            res.status(400).json({
                success: false,
                message: "Product already exist"
            });

            return;
        }

        const newProduct = await Product.create({ name, description, price: Number(price), image, stock: Number(stock), category, brand });

        const product = await Product.findOne({ _id: newProduct._id }).populate("category").populate("brand");

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while creating Product"
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category").populate("brand");

        res.status(200).json({
            success: true,
            message: "Getting all Products Successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting all Products"
        });
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id }).populate("category").populate("brand");

        res.status(200).json({
            success: true,
            message: "Getting Product Successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting Product"
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock, category, brand } = req.body;
        if (!name || !description || !price || !image || !stock || !category || !brand) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price: Number(price), stock: Number(stock), image, category, brand }, { new: true }).populate("category").populate("brand");

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while Updating Product"
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while deleting Product"
        });
    }
}

export const filterProduct = async (req, res) => {
    try {
        const arg = {};

        if (Number(req.query.price) > 99) arg.price = { $gte: 99, $lte: Number(req.query.price) }

        if (req.query.category.length) arg.category = req.query.category.length > 1 ? (req.query.category).split(",") : req.query.category;

        if (req.query.brand.length) arg.brand = req.query.brand.length > 1 ? (req.query.brand).split(",") : req.query.brand;

        const products = await Product.find(arg).populate("category").populate("brand")

        res.status(200).json({
            success: true,
            message: "Getting filtered Products Successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting filtered Products"
        });
    }
}

export const searchProduct = async (req, res) => {
    try {
        const products = await Product.find({ $or: [{ name: { $regex: req.query.search, $options: "i" } }, { description: { $regex: req.query.search, $options: "i" } }] }).populate("category");

        res.status(200).json({
            success: true,
            message: "Getting Searched Products Successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting Searched Products"
        });
    }
}

