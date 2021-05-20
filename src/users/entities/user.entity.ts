import { Exclude, Expose } from 'class-transformer';
import { PermissionLevel } from '../../auth/permission-level.enum';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { SerializeOptions } from '@nestjs/common';

@Entity()
@SerializeOptions({ strategy: 'excludeAll' })
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  password: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  magicToken: string;

  @Exclude()
  @Column({ type: 'date', nullable: true })
  tokenIssued: string;

  @Expose()
  @Column({ type: 'date' })
  dateCreated: string;

  @Expose()
  @Column({
    type: 'int',
    default: PermissionLevel.User,
  })
  permissionLevel: PermissionLevel;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
