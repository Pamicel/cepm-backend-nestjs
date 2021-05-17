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
  @Column()
  password: string;

  @Exclude()
  @Column('int')
  permissionLevel: PermissionLevel;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
