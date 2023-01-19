import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "int"})
    price: number;
    @Column({type: "text"})
    image: string;
    @Column()
    category: number;
}