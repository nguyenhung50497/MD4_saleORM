import { Schema, model } from 'mongoose';
export interface ICart {
    status?: string;
    quantity?: number;
    product ?: string;
    user ?: string;
}

const CartSchema = new Schema<ICart> ({
    status: String,
    quantity: Number,
    product: {
        type: String,
        ref: 'Product'
    },
    user: {
        type: String,
        ref: 'User'
    }
})

const Cart = model<ICart> ('Cart', CartSchema);
export {Cart};