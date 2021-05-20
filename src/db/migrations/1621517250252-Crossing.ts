import { MigrationInterface, QueryRunner } from 'typeorm';

export class Crossing1621517250252 implements MigrationInterface {
  name = 'Crossing1621517250252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "crossing" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "duration" integer NOT NULL, "audienceSize" integer NOT NULL, "startDate" date NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "crossing"`);
  }
}
