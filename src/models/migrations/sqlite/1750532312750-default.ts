import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1750532312750 implements MigrationInterface {
    name = 'Default1750532312750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "full_name" varchar NOT NULL, "date_birth" date NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "phone" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "full_name", "date_birth", "email", "password", "created_at", "updated_at") SELECT "id", "full_name", "date_birth", "email", "password", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "full_name" varchar NOT NULL, "date_birth" date NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "phone" varchar, CONSTRAINT "UQ_75180bd8e62d624af9fa502f352" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "full_name", "date_birth", "email", "password", "created_at", "updated_at", "phone") SELECT "id", "full_name", "date_birth", "email", "password", "created_at", "updated_at", "phone" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "full_name" varchar NOT NULL, "date_birth" date NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "phone" varchar)`);
        await queryRunner.query(`INSERT INTO "users"("id", "full_name", "date_birth", "email", "password", "created_at", "updated_at", "phone") SELECT "id", "full_name", "date_birth", "email", "password", "created_at", "updated_at", "phone" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "full_name" varchar NOT NULL, "date_birth" date NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "full_name", "date_birth", "email", "password", "created_at", "updated_at") SELECT "id", "full_name", "date_birth", "email", "password", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
