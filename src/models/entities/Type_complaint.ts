import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Complaint } from "./Complaint.ts";

@Entity("Type_complaint")
export class TypeComplaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne(() => Complaint, () => Complaint)
  Complaints: Complaint[];
}
