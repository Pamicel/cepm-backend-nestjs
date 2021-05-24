import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeathForm1621868967470 implements MigrationInterface {
  name = 'DeathForm1621868967470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "death_form" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar, "lastname" varchar, "gender" varchar, "birthDate" date, "birthPlace" varchar, "afterLife" varchar, "afterLifeMore" varchar, "grievances" boolean, "grievancesDetails" varchar, "job" varchar, "pet" boolean, "petDetails" varchar, "importantPeopleRoles" text, "importantPeopleNames" text, "crossingType" varchar, "intimate" varchar, "public" varchar, "captcha" varchar, "song" varchar, "dream" boolean, "dreamDetails" varchar, "enemy" boolean, "enemyDetails" varchar, "remorse" boolean, "remorseDetails" varchar, "imageRights" boolean, "iVoteFor" varchar, "dateCreated" date, "dateModified" date, "filled" boolean NOT NULL DEFAULT (0))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, "deathFormId" integer, CONSTRAINT "UQ_c48335c78a47a3c2b839c29f093" UNIQUE ("deathFormId"), CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_death"("id", "dateCreated", "userId", "crossingId") SELECT "id", "dateCreated", "userId", "crossingId" FROM "death"`,
    );
    await queryRunner.query(`DROP TABLE "death"`);
    await queryRunner.query(`ALTER TABLE "temporary_death" RENAME TO "death"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, "deathFormId" integer, CONSTRAINT "UQ_c48335c78a47a3c2b839c29f093" UNIQUE ("deathFormId"), CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cd1cadf78c17dce1ea04b91e6bc" FOREIGN KEY ("deathFormId") REFERENCES "death_form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_death"("id", "dateCreated", "userId", "crossingId", "deathFormId") SELECT "id", "dateCreated", "userId", "crossingId", "deathFormId" FROM "death"`,
    );
    await queryRunner.query(`DROP TABLE "death"`);
    await queryRunner.query(`ALTER TABLE "temporary_death" RENAME TO "death"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "death" RENAME TO "temporary_death"`);
    await queryRunner.query(
      `CREATE TABLE "death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, "deathFormId" integer, CONSTRAINT "UQ_c48335c78a47a3c2b839c29f093" UNIQUE ("deathFormId"), CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "death"("id", "dateCreated", "userId", "crossingId", "deathFormId") SELECT "id", "dateCreated", "userId", "crossingId", "deathFormId" FROM "temporary_death"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_death"`);
    await queryRunner.query(`ALTER TABLE "death" RENAME TO "temporary_death"`);
    await queryRunner.query(
      `CREATE TABLE "death" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateCreated" date NOT NULL, "userId" integer, "crossingId" integer, CONSTRAINT "FK_659196eb6c87e8028f47fff218c" FOREIGN KEY ("crossingId") REFERENCES "crossing" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3314101d05fb309bb1810a3ae83" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "death"("id", "dateCreated", "userId", "crossingId") SELECT "id", "dateCreated", "userId", "crossingId" FROM "temporary_death"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_death"`);
    await queryRunner.query(`DROP TABLE "death_form"`);
  }
}
