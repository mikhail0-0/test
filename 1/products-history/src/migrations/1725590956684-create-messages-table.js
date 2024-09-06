export class CreateMessagesTable1725590956684 {
  name = "CreateMessagesTable1725590956684";

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TYPE "public"."messages_action_enum" AS ENUM('PRODUCT_CREATION', 'REMAINING_CREATION', 'REMAINING_QUANTITY_CHANGING')`
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "plu" character varying NOT NULL, "action" "public"."messages_action_enum" NOT NULL, "shop_id" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(`DROP TYPE "public"."messages_action_enum"`);
  }
}
