import Brand from "../models/brand.js";

export const createBrand = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const brandExist = await Brand.findOne({ name });
        if (brandExist) {
            res.status(400).json({
                success: false,
                message: "Brand already exist"
            });

            return;
        }

        const brand = await Brand.create({ name, image });

        res.status(201).json({
            success: true,
            message: "Brand Created Successfully",
            brand
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Error occur while creating Brand"
        });
    }
}

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();

        res.status(200).json({
            success: true,
            message: "Getting all Brands Successfully",
            brands
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting all Brands"
        });
    }
}

export const getBrand = async (req, res) => {
    try {
        const brand = await Brand.findOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: "Getting Brand Successfully",
            brand
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting Brand"
        });
    }
}

export const updateBrand = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const brand = await Brand.findByIdAndUpdate(req.params.id, { name, image }, { new: true });

        res.status(200).json({
            success: true,
            message: "Brand Updated Successfully",
            brand
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while Updating Brand"
        });
    }
}

export const deleteBrand = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Brand Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while deleting Brand"
        });
    }
}