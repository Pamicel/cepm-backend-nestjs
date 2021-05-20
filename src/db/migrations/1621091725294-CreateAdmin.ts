import { PermissionLevel } from '../../auth/permission-level.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdmin1621091725294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // $2a$09$rlcItvQo9/hzSYjP64d0GuROqzJRm76S.05Bz7Vs5SeNI7yf.c6TS is hash for 00000000
    await queryRunner.query(
      `INSERT INTO user (email, password, permissionLevel)
      VALUES ("paulamicel@gmail.com", "$2a$09$rlcItvQo9/hzSYjP64d0GuROqzJRm76S.05Bz7Vs5SeNI7yf.c6TS", ${PermissionLevel.Admin})
      ON CONFLICT(email) DO UPDATE SET permissionLevel=${PermissionLevel.Admin}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE user SET permissionLevel=${PermissionLevel.User} WHERE email=paulamicel@gmail.com"`,
    );
  }
}
