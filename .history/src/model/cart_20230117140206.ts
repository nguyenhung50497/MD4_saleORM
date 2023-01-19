import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface ICart {
    status?: string;
    quantity?: number;
    product ?: string;
    user ?: string;
}

@Entity()
export class Cart {
    @PrimaryGeneratedColumn
}

