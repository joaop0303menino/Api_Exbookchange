import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1752789764010 implements MigrationInterface {
    name = 'Default1752789764010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`id_profile\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Type_notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`id_profile\` int NULL, \`id_user\` int NULL, \`id_typeNotification\` int NULL, UNIQUE INDEX \`REL_eec8d1a5108f7b4f16aa7e90d8\` (\`id_typeNotification\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Type_complaint\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`id_complaint\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Complaint\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` text NOT NULL, \`date_complaint\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_profile\` int NULL, \`id_user\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`photo\` blob NOT NULL, \`id_user\` int NULL, UNIQUE INDEX \`REL_1efd30048abf90712f9bca4e7f\` (\`id_user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_setting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`receiveNotifications\` tinyint NOT NULL DEFAULT '0', \`id_user\` int NULL, UNIQUE INDEX \`REL_14e57123ddd2565ad94a8ff402\` (\`id_user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User_preference\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title_book\` varchar(255) NOT NULL, \`image_book\` blob NOT NULL, \`id_user\` int NULL, \`id_author\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conservation_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int ('1', '2', '3', '4', '5') NOT NULL DEFAULT '5', \`description_status\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images_book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` blob NOT NULL, \`isCover\` tinyint NOT NULL DEFAULT '0', \`id_announce\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exchange_donation_historic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date_transaction\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_exchange_donation\` int NULL, UNIQUE INDEX \`REL_1f66b90e975ed2cfd2b05cbe2a\` (\`id_exchange_donation\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`exchange_donation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_receiver\` varchar(255) NOT NULL, \`id_user\` int NULL, \`id_announce\` int NULL, UNIQUE INDEX \`REL_38fd8ae22b19d6b2f13f78c10d\` (\`id_announce\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`announce\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`is_exchange_donation\` text ('Exchange', 'Donation') NOT NULL DEFAULT 'Exchange', \`archived\` tinyint NOT NULL DEFAULT '0', \`posted_at\` datetime NOT NULL, \`id_conservation_status\` int NULL, \`id_user\` int NULL, \`id_author\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(255) NOT NULL, \`date_birth\` date NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`trust_seal\` tinyint NOT NULL DEFAULT '0', \`blocked_user\` tinyint NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1929c0fb06841877fc6b363133e\` FOREIGN KEY (\`id_profile\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_65da8b2f403c516426d7a741bfe\` FOREIGN KEY (\`id_profile\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_c0c6c2285c363f9665eda077386\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_eec8d1a5108f7b4f16aa7e90d8c\` FOREIGN KEY (\`id_typeNotification\`) REFERENCES \`Type_notification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Type_complaint\` ADD CONSTRAINT \`FK_7ac9ace4cd4641683cb126bdd87\` FOREIGN KEY (\`id_complaint\`) REFERENCES \`Complaint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Complaint\` ADD CONSTRAINT \`FK_7754f6d87a89df023d1f6db90e8\` FOREIGN KEY (\`id_profile\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Complaint\` ADD CONSTRAINT \`FK_7e61de139f5b1a635d5ac458c23\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD CONSTRAINT \`FK_1efd30048abf90712f9bca4e7f1\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_setting\` ADD CONSTRAINT \`FK_14e57123ddd2565ad94a8ff4024\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`User_preference\` ADD CONSTRAINT \`FK_703b37585d6de4173ea57bb0d05\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`User_preference\` ADD CONSTRAINT \`FK_a71976e07a9f64c27104a19c089\` FOREIGN KEY (\`id_author\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images_book\` ADD CONSTRAINT \`FK_6573b7917447d927dee6d2c34fb\` FOREIGN KEY (\`id_announce\`) REFERENCES \`announce\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exchange_donation_historic\` ADD CONSTRAINT \`FK_1f66b90e975ed2cfd2b05cbe2ab\` FOREIGN KEY (\`id_exchange_donation\`) REFERENCES \`exchange_donation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exchange_donation\` ADD CONSTRAINT \`FK_8b56ea2d5ccfe403908af7d1aec\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exchange_donation\` ADD CONSTRAINT \`FK_38fd8ae22b19d6b2f13f78c10dc\` FOREIGN KEY (\`id_announce\`) REFERENCES \`announce\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announce\` ADD CONSTRAINT \`FK_a5432641421518122c4e5ca2920\` FOREIGN KEY (\`id_conservation_status\`) REFERENCES \`conservation_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announce\` ADD CONSTRAINT \`FK_6a28f3e534871361266ef2499dd\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announce\` ADD CONSTRAINT \`FK_b9bdf582d5d3ee8bbed1ba5dcd1\` FOREIGN KEY (\`id_author\`) REFERENCES \`author\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`announce\` DROP FOREIGN KEY \`FK_b9bdf582d5d3ee8bbed1ba5dcd1\``);
        await queryRunner.query(`ALTER TABLE \`announce\` DROP FOREIGN KEY \`FK_6a28f3e534871361266ef2499dd\``);
        await queryRunner.query(`ALTER TABLE \`announce\` DROP FOREIGN KEY \`FK_a5432641421518122c4e5ca2920\``);
        await queryRunner.query(`ALTER TABLE \`exchange_donation\` DROP FOREIGN KEY \`FK_38fd8ae22b19d6b2f13f78c10dc\``);
        await queryRunner.query(`ALTER TABLE \`exchange_donation\` DROP FOREIGN KEY \`FK_8b56ea2d5ccfe403908af7d1aec\``);
        await queryRunner.query(`ALTER TABLE \`exchange_donation_historic\` DROP FOREIGN KEY \`FK_1f66b90e975ed2cfd2b05cbe2ab\``);
        await queryRunner.query(`ALTER TABLE \`images_book\` DROP FOREIGN KEY \`FK_6573b7917447d927dee6d2c34fb\``);
        await queryRunner.query(`ALTER TABLE \`User_preference\` DROP FOREIGN KEY \`FK_a71976e07a9f64c27104a19c089\``);
        await queryRunner.query(`ALTER TABLE \`User_preference\` DROP FOREIGN KEY \`FK_703b37585d6de4173ea57bb0d05\``);
        await queryRunner.query(`ALTER TABLE \`user_setting\` DROP FOREIGN KEY \`FK_14e57123ddd2565ad94a8ff4024\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP FOREIGN KEY \`FK_1efd30048abf90712f9bca4e7f1\``);
        await queryRunner.query(`ALTER TABLE \`Complaint\` DROP FOREIGN KEY \`FK_7e61de139f5b1a635d5ac458c23\``);
        await queryRunner.query(`ALTER TABLE \`Complaint\` DROP FOREIGN KEY \`FK_7754f6d87a89df023d1f6db90e8\``);
        await queryRunner.query(`ALTER TABLE \`Type_complaint\` DROP FOREIGN KEY \`FK_7ac9ace4cd4641683cb126bdd87\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_eec8d1a5108f7b4f16aa7e90d8c\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_c0c6c2285c363f9665eda077386\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_65da8b2f403c516426d7a741bfe\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1929c0fb06841877fc6b363133e\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`announce\``);
        await queryRunner.query(`DROP INDEX \`REL_38fd8ae22b19d6b2f13f78c10d\` ON \`exchange_donation\``);
        await queryRunner.query(`DROP TABLE \`exchange_donation\``);
        await queryRunner.query(`DROP INDEX \`REL_1f66b90e975ed2cfd2b05cbe2a\` ON \`exchange_donation_historic\``);
        await queryRunner.query(`DROP TABLE \`exchange_donation_historic\``);
        await queryRunner.query(`DROP TABLE \`images_book\``);
        await queryRunner.query(`DROP TABLE \`conservation_status\``);
        await queryRunner.query(`DROP TABLE \`author\``);
        await queryRunner.query(`DROP TABLE \`User_preference\``);
        await queryRunner.query(`DROP INDEX \`REL_14e57123ddd2565ad94a8ff402\` ON \`user_setting\``);
        await queryRunner.query(`DROP TABLE \`user_setting\``);
        await queryRunner.query(`DROP INDEX \`REL_1efd30048abf90712f9bca4e7f\` ON \`profile\``);
        await queryRunner.query(`DROP TABLE \`profile\``);
        await queryRunner.query(`DROP TABLE \`Complaint\``);
        await queryRunner.query(`DROP TABLE \`Type_complaint\``);
        await queryRunner.query(`DROP INDEX \`REL_eec8d1a5108f7b4f16aa7e90d8\` ON \`Notification\``);
        await queryRunner.query(`DROP TABLE \`Notification\``);
        await queryRunner.query(`DROP TABLE \`Type_notification\``);
        await queryRunner.query(`DROP TABLE \`review\``);
    }

}
