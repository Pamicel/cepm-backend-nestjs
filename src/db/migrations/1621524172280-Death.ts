import { MigrationInterface, QueryRunner } from 'typeorm';

export class Death1621524172280 implements MigrationInterface {
  name = 'Death1621524172280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_death"("id", "dateCreated", "userId", "crossingId") SELECT "id", "dateCreated", "userId", "crossingId" FROM "death"`,
    );
    await queryRunner.query(`DROP TABLE "death"`);
    await queryRunner.query(`ALTER TABLE "temporary_death" RENAME TO "death"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "death" RENAME TO "temporary_death"`);
    await queryRunner.query(
      `CREATE TABLE "death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "death"("id", "dateCreated", "userId", "crossingId") SELECT "id", "dateCreated", "userId", "crossingId" FROM "temporary_death"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_death"`);
    await queryRunner.query(`DROP TABLE "death"`);
  }
}
