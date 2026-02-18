import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("discount")
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dicountcode: string;

    @Column("int")
    count: number;

    @Column("int")
    discount: number;

    @Column("int")
    status: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}