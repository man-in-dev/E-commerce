import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String
    },
    phoneNum: {
        type: String
    }
});

const itemSchema = new mongoose.Schema({
    item: {
        type: Object,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
})

const orderSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        type: itemSchema,
        required: true
    }],
    address: {
        type: addressSchema,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "CANCELLED", "DELIVERED"],
        default: "PENDING"
    },
    paymentDetails: {
        type: Object,
    }
}, { timestamps: true });


export default mongoose.model("Order", orderSchema);