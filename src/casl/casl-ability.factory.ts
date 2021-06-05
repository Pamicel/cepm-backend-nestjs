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
import { Death } from 'src/death/entities/death.entity';
import { Crossing } from 'src/crossings/entities/crossing.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<typeof User | typeof Death | typeof Answer | typeof Crossing>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
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

    can(Action.Read, Death, { userId: user.id });
    can(Action.Create, Death, { userId: user.id });
    can(Action.Update, Death, { userId: user.id });

    cannot(Action.Read, Crossing, { archived: true });

    // Answers
    type FlatAnswer = Answer & {
      'death.userId': Answer['death']['userId'];
    };
    can<FlatAnswer>(Action.Read, Answer, {
      'death.userId': { $eq: user.id },
    });
    can<FlatAnswer>(Action.Create, Answer, {
      'death.userId': { $eq: user.id },
    });
    can<FlatAnswer>(Action.Update, Answer, {
      'death.userId': { $eq: user.id },
    });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
