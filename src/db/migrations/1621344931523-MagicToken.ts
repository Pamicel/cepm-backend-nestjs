import { MigrationInterface, QueryRunner } from 'typeorm';

export class MagicToken1621344931523 implements MigrationInterface {
  name = 'MagicToken1621344931523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "permissionLevel" integer NOT NULL, "magicToken" varchar, "tokenIssued" date, "dateCreated" date NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "password", "permissionLevel", "dateCreated") SELECT "id", "email", "password", "permissionLevel", "${new Date().toISOString()}" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "permissionLevel" integer NOT NULL DEFAULT (1), "magicToken" varchar, "tokenIssued" date, "dateCreated" date NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "password", "permissionLevel", "magicToken", "tokenIssued", "dateCreated") SELECT "id", "email", "password", "permissionLevel", "magicToken", "tokenIssued", "dateCreated" FROM "user"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "permissionLevel" integer NOT NULL, "magicToken" varchar, "tokenIssued" date, "dateCreated" date NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "password", "permissionLevel", "magicToken", "tokenIssued", "dateCreated") SELECT "id", "email", "password", "permissionLevel", "magicToken", "tokenIssued", "dateCreated" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "permissionLevel" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "password", "permissionLevel") SELECT "id", "email", "password", "permissionLevel" FROM "temporary_user"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
