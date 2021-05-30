import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeathIdc1622387580625 implements MigrationInterface {
  name = 'DeathIdc1622387580625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, "deathFormId" integer, "groupId" integer, "isSimulation" boolean NOT NULL DEFAULT (0), "idc" integer, CONSTRAINT "UQ_cd1cadf78c17dce1ea04b91e6bc" UNIQUE ("deathFormId"), CONSTRAINT "FK_27fa961b5149682d3efb67dd86c" FOREIGN KEY ("groupId") REFERENCES "death_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cd1cadf78c17dce1ea04b91e6bc" FOREIGN KEY ("deathFormId") REFERENCES "death_form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_death"("id", "dateCreated", "userId", "crossingId", "deathFormId", "groupId", "isSimulation") SELECT "id", "dateCreated", "userId", "crossingId", "deathFormId", "groupId", "isSimulation" FROM "death"`,
    );
    await queryRunner.query(`DROP TABLE "death"`);
    await queryRunner.query(`ALTER TABLE "temporary_death" RENAME TO "death"`);
    await queryRunner.query(`
      UPDATE
        death AS d
      SET
        idc = ( SELECT count(id) + 1 FROM death WHERE id < d.id AND crossingId = d.crossingId )
      WHERE isSimulation = FALSE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "death" RENAME TO "temporary_death"`);
    await queryRunner.query(
      `CREATE TABLE "death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, "deathFormId" integer, "groupId" integer, "isSimulation" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_cd1cadf78c17dce1ea04b91e6bc" UNIQUE ("deathFormId"), CONSTRAINT "FK_27fa961b5149682d3efb67dd86c" FOREIGN KEY ("groupId") REFERENCES "death_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cd1cadf78c17dce1ea04b91e6bc" FOREIGN KEY ("deathFormId") REFERENCES "death_form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "death"("id", "dateCreated", "userId", "crossingId", "deathFormId", "groupId", "isSimulation") SELECT "id", "dateCreated", "userId", "crossingId", "deathFormId", "groupId", "isSimulation" FROM "temporary_death"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_death"`);
  }
}
