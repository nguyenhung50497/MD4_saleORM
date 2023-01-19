import { Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

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

