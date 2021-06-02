import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionsAnswers1622565360881 implements MigrationInterface {
  name = 'QuestionsAnswers1622565360881';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "dateCreated" date NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "answer" varchar NOT NULL, "dateCreated" date NOT NULL, "questionId" integer, "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_answer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "answer" varchar NOT NULL, "dateCreated" date NOT NULL, "questionId" integer, "userId" integer, CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5a26907efcd78a856c8af5829e6" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_answer"("id", "answer", "dateCreated", "questionId", "userId") SELECT "id", "answer", "dateCreated", "questionId", "userId" FROM "answer"`,
    );
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_answer" RENAME TO "answer"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer" RENAME TO "temporary_answer"`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "answer" varchar NOT NULL, "dateCreated" date NOT NULL, "questionId" integer, "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "answer"("id", "answer", "dateCreated", "questionId", "userId") SELECT "id", "answer", "dateCreated", "questionId", "userId" FROM "temporary_answer"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_answer"`);
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(`DROP TABLE "question"`);
  }
}
