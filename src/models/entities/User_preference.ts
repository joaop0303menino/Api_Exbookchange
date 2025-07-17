import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import type { Author } from "./Author.ts";
import {Author as AuthorEntity} from "./Author.ts"
import type { User } from "./User.ts";
import {User as UserEntity} from "./User.ts"

@Entity("User_preference")
export class UserPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne( () => UserEntity)
  @JoinColumn({ name: "id_user"})
  user: User;

  @ManyToOne( () => UserEntity)
  @JoinColumn({ name: "id_author"})
  author: Author;

  @Column({ type: "varchar"})
  title_book: string;

  @Column({ type: "blob" })
  image_book: Buffer;
}