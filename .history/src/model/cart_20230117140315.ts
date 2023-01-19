import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IProduct } from '../../.history/src/model/product_20230111093948';

export interface ICart {
    status?: string;
    quantity?: number;
    product ?: string;
    user ?: string;
}

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    idCart: number;
    @Column({type: "int"})
    IProduct: number;
    @Column({type: "int"})
    id
}

