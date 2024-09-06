"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1725216961834 = void 0;
class CreateUsersTable1725216961834 {
    constructor() {
        this.name = 'CreateUsersTable1725216961834';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" smallint NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "problems" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }
}
exports.CreateUsersTable1725216961834 = CreateUsersTable1725216961834;
//# sourceMappingURL=1725216961834-create-users-table.js.map