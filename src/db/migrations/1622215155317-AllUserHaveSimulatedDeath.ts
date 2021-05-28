import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllUserHaveSimulatedDeath1622215155317
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersWithoutSimulatedDeath = await queryRunner.query(`
      SELECT  *
      FROM    user
      WHERE   id NOT IN
              (
              SELECT  userId
              FROM    death
              )
      `);
    const userIds = usersWithoutSimulatedDeath.map((u) => u.id);

    for (const userId of userIds) {
      await queryRunner.query(`
        INSERT INTO death (dateCreated, userId, isSimulation)
        VALUES
          ('${new Date().toISOString()}', ${userId}, true);
      `);
    }
  }

  public async down(): Promise<void> {
    return;
  }
}
