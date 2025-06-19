import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1750355045904 implements MigrationInterface {
    name = 'Default1750355045904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Conservacao_Status" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar CHECK( "status" IN ('1','2','3','4','5') ) NOT NULL DEFAULT (5), "description_status" text NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Conservacao_Status"`);
    }

}
