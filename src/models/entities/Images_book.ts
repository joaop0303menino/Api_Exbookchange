import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Images_book")
export class ImagesBook {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "blob"})
    image: Buffer;
    
    @Column({type: "boolean"})
    isCover: boolean;
};