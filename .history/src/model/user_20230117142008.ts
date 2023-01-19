import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column({type: "varchar", length: 255})
    username: string;
    @Column({type: "varchar", length: 255})
    password: string;
    @Column()
    role: string;
}