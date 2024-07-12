import Category from "../models/category.js";
import Order from "../models/order.js";
import Razorpay from "razorpay"
import crypto from "crypto";

import dotenv from "dotenv"
dotenv.config()

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRETE
})

export const createOrder = async (req, res) => {
    try {
        let options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };

        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
            KEY_ID: process.env.KEY_ID,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error occured while creating order',
            error
        })
    }
}

export const verifyOrder = async (req, res) => {
    try {
        let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

        let expectedSign = crypto.createHmac('sha256', process.env.KEY_SECRETE).update(body.toString()).digest('hex');

        if (expectedSign === req.body.response.razorpay_signature) {
            return res.status(200).json({
                success: true,
                message: 'valid sign',
                paymentStatus: "Paid"
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'invalid sign'
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'error occured while verifying order',
            error
        })
    }
}

export const saveOrder = async (req, res) => {
    try {
        const { price, items, address, paymentDetails } = req.body;
        console.log(price)
        console.log(items)
        console.log(address)
        console.log(paymentDetails)
        if (!price || !items || !address || !paymentDetails) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const order = await Order.create({ price, customer: req.user, items, address, paymentDetails });

        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while creating Order"
        });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Getting Order Successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting Order"
        });
    }
}


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            success: true,
            message: "Getting all Orders Successfully",
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting all Orders"
        });
    }
}

export const getOrder = async (req, res) => {
    try {
        const order = await Order.find({ customer: req.user });

        res.status(200).json({
            success: true,
            message: "Getting Order Successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while getting Order"
        });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            res.status(400).json({
                success: false,
                message: "Please fill all the given fields"
            });

            return;
        }

        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while Updating Order"
        });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Order Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occur while deleting Order"
        });
    }
}