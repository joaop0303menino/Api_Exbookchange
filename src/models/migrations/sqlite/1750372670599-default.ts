import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1750372670599 implements MigrationInterface {
    name = 'Default1750372670599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "id_profile" integer)`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nickname" varchar NOT NULL, "description" text NOT NULL, "photo" blob NOT NULL, "id_user" integer, CONSTRAINT "REL_1efd30048abf90712f9bca4e7f" UNIQUE ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "user_setting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "receiveNotifications" boolean NOT NULL, "id_user" integer, CONSTRAINT "REL_14e57123ddd2565ad94a8ff402" UNIQUE ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "conservation_status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3','4','5') ) NOT NULL DEFAULT (5), "description_status" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "images_book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" blob NOT NULL, "isCover" boolean NOT NULL, "id_announce" integer)`);
        await queryRunner.query(`CREATE TABLE "exchange_donation_historic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_transaction" datetime NOT NULL, "id_exchange_donation" integer)`);
        await queryRunner.query(`CREATE TABLE "exchange_donation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone_user_receiver" varchar NOT NULL, "id_user" integer, "id_announce" integer)`);
        await queryRunner.query(`CREATE TABLE "announce" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "posted_at" datetime NOT NULL, "isDelete" boolean NOT NULL, "id_conservation_status" integer, "id_user" integer, "id_author" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "full_name" varchar NOT NULL, "date_birth" date NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "id_profile" integer, CONSTRAINT "FK_1929c0fb06841877fc6b363133e" FOREIGN KEY ("id_profile") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_review"("id", "rating", "id_profile") SELECT "id", "rating", "id_profile" FROM "review"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`ALTER TABLE "temporary_review" RENAME TO "review"`);
        await queryRunner.query(`CREATE TABLE "temporary_profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nickname" varchar NOT NULL, "description" text NOT NULL, "photo" blob NOT NULL, "id_user" integer, CONSTRAINT "REL_1efd30048abf90712f9bca4e7f" UNIQUE ("id_user"), CONSTRAINT "FK_1efd30048abf90712f9bca4e7f1" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_profile"("id", "nickname", "description", "photo", "id_user") SELECT "id", "nickname", "description", "photo", "id_user" FROM "profile"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`ALTER TABLE "temporary_profile" RENAME TO "profile"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_setting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "receiveNotifications" boolean NOT NULL, "id_user" integer, CONSTRAINT "REL_14e57123ddd2565ad94a8ff402" UNIQUE ("id_user"), CONSTRAINT "FK_14e57123ddd2565ad94a8ff4024" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_setting"("id", "receiveNotifications", "id_user") SELECT "id", "receiveNotifications", "id_user" FROM "user_setting"`);
        await queryRunner.query(`DROP TABLE "user_setting"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_setting" RENAME TO "user_setting"`);
        await queryRunner.query(`CREATE TABLE "temporary_images_book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" blob NOT NULL, "isCover" boolean NOT NULL, "id_announce" integer, CONSTRAINT "FK_6573b7917447d927dee6d2c34fb" FOREIGN KEY ("id_announce") REFERENCES "announce" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images_book"("id", "image", "isCover", "id_announce") SELECT "id", "image", "isCover", "id_announce" FROM "images_book"`);
        await queryRunner.query(`DROP TABLE "images_book"`);
        await queryRunner.query(`ALTER TABLE "temporary_images_book" RENAME TO "images_book"`);
        await queryRunner.query(`CREATE TABLE "temporary_exchange_donation_historic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_transaction" datetime NOT NULL, "id_exchange_donation" integer, CONSTRAINT "FK_1f66b90e975ed2cfd2b05cbe2ab" FOREIGN KEY ("id_exchange_donation") REFERENCES "exchange_donation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_exchange_donation_historic"("id", "date_transaction", "id_exchange_donation") SELECT "id", "date_transaction", "id_exchange_donation" FROM "exchange_donation_historic"`);
        await queryRunner.query(`DROP TABLE "exchange_donation_historic"`);
        await queryRunner.query(`ALTER TABLE "temporary_exchange_donation_historic" RENAME TO "exchange_donation_historic"`);
        await queryRunner.query(`CREATE TABLE "temporary_exchange_donation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone_user_receiver" varchar NOT NULL, "id_user" integer, "id_announce" integer, CONSTRAINT "FK_8b56ea2d5ccfe403908af7d1aec" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_38fd8ae22b19d6b2f13f78c10dc" FOREIGN KEY ("id_announce") REFERENCES "announce" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_exchange_donation"("id", "phone_user_receiver", "id_user", "id_announce") SELECT "id", "phone_user_receiver", "id_user", "id_announce" FROM "exchange_donation"`);
        await queryRunner.query(`DROP TABLE "exchange_donation"`);
        await queryRunner.query(`ALTER TABLE "temporary_exchange_donation" RENAME TO "exchange_donation"`);
        await queryRunner.query(`CREATE TABLE "temporary_announce" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "posted_at" datetime NOT NULL, "isDelete" boolean NOT NULL, "id_conservation_status" integer, "id_user" integer, "id_author" integer, CONSTRAINT "FK_a5432641421518122c4e5ca2920" FOREIGN KEY ("id_conservation_status") REFERENCES "conservation_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6a28f3e534871361266ef2499dd" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b9bdf582d5d3ee8bbed1ba5dcd1" FOREIGN KEY ("id_author") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_announce"("id", "title", "description", "posted_at", "isDelete", "id_conservation_status", "id_user", "id_author") SELECT "id", "title", "description", "posted_at", "isDelete", "id_conservation_status", "id_user", "id_author" FROM "announce"`);
        await queryRunner.query(`DROP TABLE "announce"`);
        await queryRunner.query(`ALTER TABLE "temporary_announce" RENAME TO "announce"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" RENAME TO "temporary_announce"`);
        await queryRunner.query(`CREATE TABLE "announce" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "posted_at" datetime NOT NULL, "isDelete" boolean NOT NULL, "id_conservation_status" integer, "id_user" integer, "id_author" integer)`);
        await queryRunner.query(`INSERT INTO "announce"("id", "title", "description", "posted_at", "isDelete", "id_conservation_status", "id_user", "id_author") SELECT "id", "title", "description", "posted_at", "isDelete", "id_conservation_status", "id_user", "id_author" FROM "temporary_announce"`);
        await queryRunner.query(`DROP TABLE "temporary_announce"`);
        await queryRunner.query(`ALTER TABLE "exchange_donation" RENAME TO "temporary_exchange_donation"`);
        await queryRunner.query(`CREATE TABLE "exchange_donation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone_user_receiver" varchar NOT NULL, "id_user" integer, "id_announce" integer)`);
        await queryRunner.query(`INSERT INTO "exchange_donation"("id", "phone_user_receiver", "id_user", "id_announce") SELECT "id", "phone_user_receiver", "id_user", "id_announce" FROM "temporary_exchange_donation"`);
        await queryRunner.query(`DROP TABLE "temporary_exchange_donation"`);
        await queryRunner.query(`ALTER TABLE "exchange_donation_historic" RENAME TO "temporary_exchange_donation_historic"`);
        await queryRunner.query(`CREATE TABLE "exchange_donation_historic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date_transaction" datetime NOT NULL, "id_exchange_donation" integer)`);
        await queryRunner.query(`INSERT INTO "exchange_donation_historic"("id", "date_transaction", "id_exchange_donation") SELECT "id", "date_transaction", "id_exchange_donation" FROM "temporary_exchange_donation_historic"`);
        await queryRunner.query(`DROP TABLE "temporary_exchange_donation_historic"`);
        await queryRunner.query(`ALTER TABLE "images_book" RENAME TO "temporary_images_book"`);
        await queryRunner.query(`CREATE TABLE "images_book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" blob NOT NULL, "isCover" boolean NOT NULL, "id_announce" integer)`);
        await queryRunner.query(`INSERT INTO "images_book"("id", "image", "isCover", "id_announce") SELECT "id", "image", "isCover", "id_announce" FROM "temporary_images_book"`);
        await queryRunner.query(`DROP TABLE "temporary_images_book"`);
        await queryRunner.query(`ALTER TABLE "user_setting" RENAME TO "temporary_user_setting"`);
        await queryRunner.query(`CREATE TABLE "user_setting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "receiveNotifications" boolean NOT NULL, "id_user" integer, CONSTRAINT "REL_14e57123ddd2565ad94a8ff402" UNIQUE ("id_user"))`);
        await queryRunner.query(`INSERT INTO "user_setting"("id", "receiveNotifications", "id_user") SELECT "id", "receiveNotifications", "id_user" FROM "temporary_user_setting"`);
        await queryRunner.query(`DROP TABLE "temporary_user_setting"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME TO "temporary_profile"`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nickname" varchar NOT NULL, "description" text NOT NULL, "photo" blob NOT NULL, "id_user" integer, CONSTRAINT "REL_1efd30048abf90712f9bca4e7f" UNIQUE ("id_user"))`);
        await queryRunner.query(`INSERT INTO "profile"("id", "nickname", "description", "photo", "id_user") SELECT "id", "nickname", "description", "photo", "id_user" FROM "temporary_profile"`);
        await queryRunner.query(`DROP TABLE "temporary_profile"`);
        await queryRunner.query(`ALTER TABLE "review" RENAME TO "temporary_review"`);
        await queryRunner.query(`CREATE TABLE "review" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rating" integer NOT NULL, "id_profile" integer)`);
        await queryRunner.query(`INSERT INTO "review"("id", "rating", "id_profile") SELECT "id", "rating", "id_profile" FROM "temporary_review"`);
        await queryRunner.query(`DROP TABLE "temporary_review"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "announce"`);
        await queryRunner.query(`DROP TABLE "exchange_donation"`);
        await queryRunner.query(`DROP TABLE "exchange_donation_historic"`);
        await queryRunner.query(`DROP TABLE "images_book"`);
        await queryRunner.query(`DROP TABLE "conservation_status"`);
        await queryRunner.query(`DROP TABLE "user_setting"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
