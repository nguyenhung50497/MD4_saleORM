import { Schema, model } from 'mongoose';
export interface IProduct {
    name ?: string;
    price ?: number;
    image ?: string;
    category ?: string;
}

const ProductSchema = new Schema<IProduct> ({
    name: String,
    price: Number,
    image: String,
    category: {
        type: String,
        ref: 'Category'
    }
})

const Product = model<IProduct> ('Product', ProductSchema);
export {Product};