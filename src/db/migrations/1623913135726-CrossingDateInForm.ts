import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrossingDateInForm1623913135726 implements MigrationInterface {
  name = 'CrossingDateInForm1623913135726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "death_form" ADD COLUMN "crossingDate" date`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "death_form" DROP COLUMN "crossingDate"`,
    );
  }
}
