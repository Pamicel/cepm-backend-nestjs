import { MigrationInterface, QueryRunner } from 'typeorm';

export class StaffVoteProfiles1622711945507 implements MigrationInterface {
  name = 'StaffVoteProfiles1622711945507';

  public staff = [
    {
      name: 'PATRICIA',
      dateOfBirth: new Date(1943, 4, 3),
      dateOfDeath: new Date(1973, 5, 26),
      phrase: 'Rien ne sert de courir, il faut partir à point',
    },
    {
      name: 'MIMOUNA',
      dateOfBirth: new Date(1950, 2, 11),
      dateOfDeath: new Date(1980, 0, 15),
      phrase:
        'La vie c’est comme la rosée du matin, elle enchante l’aube de notre existence.',
    },
    {
      name: 'SISSI',
      dateOfBirth: new Date(1924, 0, 16),
      dateOfDeath: new Date(1954, 6, 10),
      careerDetails: ' dans de nombreux établissements',
      phrase:
        'La vie c’est comme le surf, on met du temps à pagayer, pagayer, et quand on arrive à prendre la vague, c’est cool.',
    },
    {
      name: 'JORIS',
      yearOfBirth: 1923,
      dateOfDeath: new Date(1961, 7, 3),
      phrase:
        'La vie c’est un peu comme dans un match de foot, on se souvient souvent des réussites, de quand on a gagné alors qu’on oublie aussi qu’il y a eu de belles occasions et qu’elles ont aussi fait la réussite du match ou de l’équipe.',
      careerDetails:
        ' dans plusieurs établissements (CEPM n°2, CEPM n°5, CEPM n°3, CEPM n°7)',
    },
    {
      name: 'JULES',
      dateOfBirth: new Date(1960, 10, 21),
      dateOfDeath: new Date(1990, 5, 4),
      phrase:
        'Parce qu’à la fin, tu te rappelleras pas du temps que t’as passé au boulot ou à tondre la pelouse, grimpe cette foutue montagne.',
    },
    {
      name: 'FRED',
      dateOfBirth: new Date(1913, 10, 3),
      dateOfDeath: new Date(1943, 3, 29),
      phrase:
        'La vie est un pendule qui oscille entre le désespoir et l’ennui.',
      careerDetails: ', 50 ans en référant de médiation, doyen du CEPM n°7',
    },
    {
      name: 'IRIS',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staff_vote_profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "dateOfBirth" date, "yearOfBirth" integer, "dateOfDeath" date, "phrase" varchar, "careerDetails" varchar)`,
    );

    for (const member of this.staff) {
      await queryRunner.query(
        `
          INSERT INTO "staff_vote_profile" (
            "name",
            "dateOfBirth",
            "yearOfBirth",
            "dateOfDeath",
            "phrase",
            "careerDetails"
          ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          member.name,
          member.dateOfBirth && member.dateOfBirth.toISOString(),
          member.yearOfBirth,
          member.dateOfDeath && member.dateOfDeath.toISOString(),
          member.phrase,
          member.careerDetails,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staff_vote_profile"`);
  }
}
