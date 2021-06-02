import { MigrationInterface, QueryRunner } from 'typeorm';

export class HideQuestion1622641648876 implements MigrationInterface {
  name = 'HideQuestion1622641648876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "dateCreated" date NOT NULL, "hide" boolean NOT NULL DEFAULT (0))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_question"("id", "question", "dateCreated") SELECT "id", "question", "dateCreated" FROM "question"`,
    );
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_question" RENAME TO "question"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" RENAME TO "temporary_question"`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "dateCreated" date NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "question"("id", "question", "dateCreated") SELECT "id", "question", "dateCreated" FROM "temporary_question"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_question"`);
  }
}
