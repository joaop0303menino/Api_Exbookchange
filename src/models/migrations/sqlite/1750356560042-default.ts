import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1750356560042 implements MigrationInterface {
    name = 'Default1750356560042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_Conservacao_Status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3','4','5') ) NOT NULL DEFAULT (5), "description_status" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_Conservacao_Status"("id", "status", "description_status") SELECT "id", "status", "description_status" FROM "Conservacao_Status"`);
        await queryRunner.query(`DROP TABLE "Conservacao_Status"`);
        await queryRunner.query(`ALTER TABLE "temporary_Conservacao_Status" RENAME TO "Conservacao_Status"`);
        await queryRunner.query(`CREATE TABLE "User_setting" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "receiveNotifications" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_Conservacao_Status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3','4','5') ) NOT NULL DEFAULT (5), "description_status" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_Conservacao_Status"("id", "status", "description_status") SELECT "id", "status", "description_status" FROM "Conservacao_Status"`);
        await queryRunner.query(`DROP TABLE "Conservacao_Status"`);
        await queryRunner.query(`ALTER TABLE "temporary_Conservacao_Status" RENAME TO "Conservacao_Status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Conservacao_Status" RENAME TO "temporary_Conservacao_Status"`);
        await queryRunner.query(`CREATE TABLE "Conservacao_Status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3','4','5') ) NOT NULL DEFAULT (5), "description_status" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "Conservacao_Status"("id", "status", "description_status") SELECT "id", "status", "description_status" FROM "temporary_Conservacao_Status"`);
        await queryRunner.query(`DROP TABLE "temporary_Conservacao_Status"`);
        await queryRunner.query(`DROP TABLE "User_setting"`);
        await queryRunner.query(`ALTER TABLE "Conservacao_Status" RENAME TO "temporary_Conservacao_Status"`);
        await queryRunner.query(`CREATE TABLE "Conservacao_Status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3','4','5') ) NOT NULL DEFAULT (5), "description_status" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "Conservacao_Status"("id", "status", "description_status") SELECT "id", "status", "description_status" FROM "temporary_Conservacao_Status"`);
        await queryRunner.query(`DROP TABLE "temporary_Conservacao_Status"`);
    }

}
