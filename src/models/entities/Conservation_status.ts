import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ConservacaoStatusEnum {
  PESSIMO = 1,
  RUIM = 2,
  REGULAR = 3,
  BOM = 4,
  OTIMO = 5
}

@Entity("Conservacao_Status")
export class ConservacaoStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
        enum: ConservacaoStatusEnum,
        default: ConservacaoStatusEnum.OTIMO
    })
    status: ConservacaoStatusEnum;

    @Column({type: "text"})
    description_status: string;
}