import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import type { Author } from "./Author";
import {Author as AuthorEntity} from "./Author"
import type { User } from "./User";
import {User as UserEntity} from "./User"

@Entity("User_preference")
export class UserPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne( () => UserEntity)
  @JoinColumn({ name: "id_user"})
  user: User;

  @ManyToOne( () => AuthorEntity)
  @JoinColumn({ name: "id_author"})
  author: Author;

  @Column({ type: "varchar"})
  title_book: string;

  @Column({ type: "blob" })
  image_book: Buffer;
};