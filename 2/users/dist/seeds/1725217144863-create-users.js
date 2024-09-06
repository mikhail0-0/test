"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1725217144863 = void 0;
class CreateUsers1725217144863 {
    async up(queryRunner) {
        const count = 1000000;
        await queryRunner.query(`
      INSERT INTO "users" ("name", "age", "gender", "problems")
      select 'testName' || n, ceil(random()*80),
      ('{MALE, FEMALE}'::users_gender_enum[])[ceil (random() * 2)],
      ('{0, 1}'::boolean[])[ceil (random() * 2)]
      from generate_Series(1,${count}) as n;
    `);
    }
    async down(queryRunner) { }
}
exports.CreateUsers1725217144863 = CreateUsers1725217144863;
//# sourceMappingURL=1725217144863-create-users.js.map