import { Schema, model } from 'mongoose';
export interface ICart {
    status?: string;
    quantity?: number;
    product ?: string;
    user ?: string;
}

