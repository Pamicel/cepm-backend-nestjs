import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrossingDateCreated1621522774414 implements MigrationInterface {
  name = 'CrossingDateCreated1621522774414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_crossing" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "duration" integer NOT NULL, "audienceSize" integer NOT NULL, "startDate" date NOT NULL, "dateCreated" date NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_crossing"("id", "duration", "audienceSize", "startDate", "dateCreated") SELECT "id", "duration", "audienceSize", "startDate", "${new Date().toISOString()}" FROM "crossing"`,
    );
    await queryRunner.query(`DROP TABLE "crossing"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_crossing" RENAME TO "crossing"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crossing" RENAME TO "temporary_crossing"`,
    );
    await queryRunner.query(
      `CREATE TABLE "crossing" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "duration" integer NOT NULL, "audienceSize" integer NOT NULL, "startDate" date NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "crossing"("id", "duration", "audienceSize", "startDate") SELECT "id", "duration", "audienceSize", "startDate" FROM "temporary_crossing"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_crossing"`);
  }
}
