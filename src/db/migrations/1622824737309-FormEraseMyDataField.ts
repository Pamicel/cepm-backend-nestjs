import { MigrationInterface, QueryRunner } from 'typeorm';

export class FormEraseMyDataField1622824737309 implements MigrationInterface {
  name = 'FormEraseMyDataField1622824737309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "death_form" ADD COLUMN "eraseMyData" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "death_form" DROP COLUMN "eraseMyData"`,
    );
  }
}
