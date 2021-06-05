import { MigrationInterface, QueryRunner } from 'typeorm';

export class CanArchiveCrossing1622908754686 implements MigrationInterface {
  name = 'CanArchiveCrossing1622908754686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crossing" ADD COLUMN "archived" boolean NOT NULL DEFAULT (0)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "crossing" DROP COLUMN "archived"`);
  }
}
