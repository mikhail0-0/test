import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1725217144863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const count = 1000000;
    await queryRunner.query(`
      INSERT INTO "users" ("name", "age", "gender", "problems")
      select 'testName' || n, ceil(random()*80),
      ('{MALE, FEMALE}'::users_gender_enum[])[ceil (random() * 2)],
      ('{0, 1}'::boolean[])[ceil (random() * 2)]
      from generate_Series(1,${count}) as n;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
