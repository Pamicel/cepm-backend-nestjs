import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Answer } from '../questions-answers/entities/answer.entity';
import { PermissionLevel } from '../auth/permission-level.enum';
import { User } from '../users/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof User | typeof Answer> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can /*, cannot*/, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.permissionLevel === PermissionLevel.Admin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else if (user.permissionLevel >= PermissionLevel.Staff) {
      can(Action.Read, 'all'); // read-only access to everything
    }

    // Users can only fully manage users with lower permission level than themselves
    can(Action.Manage, User, {
      permissionLevel: { $gt: user.permissionLevel },
    });
    can(Action.Read, User, { id: user.id });
    can(Action.Update, User, ['email', 'password'], { id: user.id });
    can(Action.Delete, User, { id: user.id });

    can(Action.Manage, Answer, { userId: user.id });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
