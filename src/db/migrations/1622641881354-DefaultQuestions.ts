import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultQuestions1622641881354 implements MigrationInterface {
  private questions: string[] = [
    'Quel plaisir vous procurait la certitude de manger quelque chose que vous aimiez ?',
    'Que pensiez-vous du mariage chocolat-menthe ?',
    'Que pensiez-vous du mariage pastèque-feta ?',
    'Quelle satisfaction vous a apporté le caramel au beurre salé ?',
    'Exploser du papier bulle, était-ce pour vous une source de plaisir ?',
    'La pression des bulles dans le jacuzzi était-elle suffisante ?',
    'Déchirer du papier cadeau, était-ce pour vous une source de plaisir ?',
    'Appréciiez-vous la chair de poule ?',
    'Appréciiez-vous les frissons ?',
    'Savoir que le territoire marin est plus grand que le territoire terrestre, vous a-t-il apporté de la joie ?',
    'Vous étiez-vous déjà fait un cadeau à vous-même pour vous féliciter ?',
    'Cela vous a-t-il plu de découvrir que vous aviez une passion ?',
    'Trouviez-vous une utilité dans l’usage du porte-couteau ?  ',
    'La musique a-t-elle représenté un plus dans votre existence ? Si oui lesquelles ?',
    'S’il fallait garder une couleur, laquelle ?',
    'Aviez-vous un mot à garder ou à bannir ?',
    'Maintenant que c’est fini, entre joie et colère, quelle émotion est dominante ?',
    'Si c’était à refaire, désireriez-vous la vie avec ou sans feux d’artifices ?',
    'Qu’est-ce qui vous importait le plus : le voyage, ou la destination ?',
    'Que pensiez-vous des différentes couleurs de yeux, et des intensités variables des regards ?',
    'Aviez-vous déjà eu, en présence d’un être aimé ou juste désiré, des papillons dans le ventre ? Si oui, pensez-vous que cette sensation devrait être plus fréquente ?',
    'Existe-t-il une espèce animale particulièrement réussie selon vous ?',
    'Un vol d’oiseau dans le ciel vous a-t-il déjà procuré de la joie ?',
    'Regarder une ou des fleurs vous a-t-il déjà réconforté ? Lesquelles ?',
    'Recommanderiez-vous la sieste sous un arbre ?',
    'La seule vision d’un arbre a-t-elle pu vous rendre heureux ?',
    'Les sensations fortes vous ont-elles plu ? Manège ? Montagne ? Océan ?',
    'Quelle note donneriez-vous à la Terre ?',
    'Pensiez-vous, objectivement, avoir contribué au bien-être d’autrui ?',
    'La destruction des écosystèmes, la disparition des espèces et le saccage de la planète vous laissaient-t-ils de marbre ?',
    'L’ivresse a-t-elle joué un rôle dans votre appréciation de l’existence ? Si oui, pourquoi ?',
    'Aviez-vous déjà pris en considération la complexité des facteurs réunis pour produire du pain ? Cela vous procure-t-il de la joie ?',
    'Vivre dans un monde où il existait des éléphants et des baleines, même sans en avoir jamais vu, représentait-t-il pour vous une source d’émerveillement ou d’indifférence ?',
    'Quelle satisfaction vous a apporté l’été ?',
    'Aviez-vous été heureux en mangeant des framboises ?',
    'Comment définiriez-vous votre premier amour en un mot ? ',
    'Considériez-vous que la pizza fut une belle invention ? Si oui, laquelle ?',
    'Les ricochets vous ont-ils inspiré ?',
    'Les batailles de boules de neige vous ont-elles plu ?',
    'Aimiez-vous le mariage du printemps avec les cerisiers ?',
    'Considériez-vous importante la vie, avec l’huile d’olives ?',
    'La sensation de tremper ses pieds dans une rivière d’eau fraîche quand il fait très chaud, était-ce important pour vous ? Développez. ',
    'La coupe du monde de football, cela a-t-il changé quelque chose pour vous ?',
    'Les massages du cuir chevelu étaient-ils bienfaisant ?',
    'Quel bilan pouvez-vous tirer du toucher et de la peau en général ?',
    'Rimbaud a écrit dans le Bateau Ivre : « les aubes sont navrantes », et vous ?',
    'Quel degré d’importance attachiez-vous aux bonbons ?',
    'Étiez-vous satisfait par le nombre d’étoiles dans le ciel la nuit ?',
    'Aviez-vous aimé la Lune ?',
    'Aviez-vous aimé voir la Lune en plein jour ?',
    '60 secondes dans une minute, considérez-vous que cela est trop ou pas assez ?',
    'Vous êtiez-vous déjà arrêté pour regarder marcher des fourmis ?',
    'Aviez-vous déjà pleuré devant un paysage ?',
    'Boris Vian disait : “La vie c’est comme une dent. D’abord on y a pas pensé. On s’est contenté de mâcher. Et puis ça se gâte soudain. Ça vous fait mal et on y tient. Et on la soigne et les soucis. Et pour qu’on soit vraiment guéri, Il faut vous l’arracher la vie”. Et vous ?',
    'Aimiez-vous toucher un arbre ?',
    'La semaine de 7 jours, vous convenait-elle ?',
    'Aviez-vous déjà été ému(e) par une œuvre d’art ?',
    'Le fantasme, était-ce important pour vous ?',
    'Arroser une plante, était-ce source de plaisir ?',
    'Etiez-vous plutôt tigre blanc ou tigre roux ?',
    'Cela vous touchait-il que les gens puissent vivre dans des igloos ?',
    'Les noyaux dans les olives, était-ce une bonne ou mauvaise idée ?',
    'Quel sentiment vous évoque un parasol en plein soleil ?',
    'Le fait de savoir que la Terre est ronde, cela vous apportait-il quelque chose ?',
    'Est-ce que vous considérez le Soleil comme réussi ?',
    'Pour ou contre la crème chantilly ?',
    'S’il n’y avait qu’un parfum de glace pour lutter contre le blues du dimanche soir ?',
    'Que pensiez-vous de l’hésitation, de l’incertitude juste avant le premier baiser ?',
    'Garderiez-vous les grasses matinées où vous êtes réveillé(e) par les rayons du soleil ?',
    'Vous préférez le mal de mer ou être malade en voiture ?',
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const q of this.questions) {
      await queryRunner.query(
        `INSERT INTO "question"("question", "dateCreated") VALUES (?, ?)`,
        [q, new Date().toISOString()],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const q of this.questions) {
      await queryRunner.query(`DELETE FROM "question" WHERE question=?`, [q]);
    }
  }
}
