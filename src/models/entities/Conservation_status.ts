import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Announce } from "./Announce.ts";

export enum ConservacaoStatusEnum {
  PESSIMO = 1,
  RUIM = 2,
  REGULAR = 3,
  BOM = 4,
  OTIMO = 5
}

@Entity("conservation_status")
export class ConservationStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    enum: ConservacaoStatusEnum,
    default: ConservacaoStatusEnum.OTIMO
  })
  status: number;

  @Column({ type: "text" })
  description_status: string;

  @OneToMany(() => Announce, announce => announce.conservationStatus)
  announces: Announce[];
}