import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IProduct } from '../../.history/src/model/product_20230111093948';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    idCart: number;
    @Column({type: "varchar", length: 255})
    status: string;
    @Column({type: "int"})
    quantity: number;
    @Column({type: "int"})
    idProduct: number;
    @Column({type: "int"})
    idUser: number;
}

