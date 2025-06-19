import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User_setting")
export class UserSetting {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({type: "boolean"})
    receiveNotifications: boolean;
}