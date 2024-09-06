"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1725447848325 = void 0;
class CreateTables1725447848325 {
    constructor() {
        this.name = "CreateTables1725447848325";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "shops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shelfs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shop_id" uuid NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_e1cac34106c17471773ae78553a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plu" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_9d33dff2ca20f4fd2d4f26f8607" UNIQUE ("plu"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shop_id" uuid NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "remainings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "shelf_id" uuid, "order_id" uuid, "quantity" numeric NOT NULL, CONSTRAINT "PK_f066bd5b2a21e2a5584a8e7e524" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98141f6508e52ec2e2dce339a7" ON "remainings" ("shelf_id", "order_id") `);
        await queryRunner.query(`ALTER TABLE "shelfs" ADD CONSTRAINT "FK_8cdc79a00b4f29eb13375928737" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_33f20db82908f7685a5c0c58ac6" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "remainings" ADD CONSTRAINT "FK_6ca4e1c7e9ab45a78223010e7c2" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "remainings" ADD CONSTRAINT "FK_c333a6e87e2e5a9d6bfc989d7ac" FOREIGN KEY ("shelf_id") REFERENCES "shelfs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "remainings" ADD CONSTRAINT "FK_7d2681e894c1f2fc494c06dc532" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "remainings" DROP CONSTRAINT "FK_7d2681e894c1f2fc494c06dc532"`);
        await queryRunner.query(`ALTER TABLE "remainings" DROP CONSTRAINT "FK_c333a6e87e2e5a9d6bfc989d7ac"`);
        await queryRunner.query(`ALTER TABLE "remainings" DROP CONSTRAINT "FK_6ca4e1c7e9ab45a78223010e7c2"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_33f20db82908f7685a5c0c58ac6"`);
        await queryRunner.query(`ALTER TABLE "shelfs" DROP CONSTRAINT "FK_8cdc79a00b4f29eb13375928737"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98141f6508e52ec2e2dce339a7"`);
        await queryRunner.query(`DROP TABLE "remainings"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "shelfs"`);
        await queryRunner.query(`DROP TABLE "shops"`);
    }
}
exports.CreateTables1725447848325 = CreateTables1725447848325;
//# sourceMappingURL=1725447848325-create-tables.js.map