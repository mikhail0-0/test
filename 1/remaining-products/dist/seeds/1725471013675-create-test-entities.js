"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTestEntities1725471013675 = void 0;
class CreateTestEntities1725471013675 {
    async up(queryRunner) {
        const product_ids = await queryRunner.query(`
        INSERT INTO "products" ("plu", "name") VALUES
        ('000001', 'testProduct1'),
        ('000002', 'testProduct2'),
        ('000003', 'testProduct3')
        RETURNING "id";
    `);
        const shop_ids = await queryRunner.query(`
        INSERT INTO "shops" ("name", "address") VALUES
        ('testShop1', 'testAddress1'),
        ('testShop2', 'testAddress2')
        RETURNING "id";
    `);
        const shelf_ids = await queryRunner.query(`
        INSERT INTO "shelfs" ("code", "shop_id") VALUES
        ('testShelf11', '${shop_ids[0].id}'), ('testShelf12', '${shop_ids[0].id}'),
        ('testShelf21', '${shop_ids[1].id}'), ('testShelf22', '${shop_ids[1].id}')
        RETURNING "id";
    `);
        const order_ids = await queryRunner.query(`
        INSERT INTO "orders" ("shop_id") VALUES
        ('${shop_ids[0].id}'), ('${shop_ids[0].id}'),
        ('${shop_ids[1].id}'), ('${shop_ids[1].id}')
        RETURNING "id";
    `);
        const getRand = () => Math.ceil(Math.random() * 10);
        await queryRunner.query(` 
        INSERT INTO "remainings" ("quantity", "product_id", "shelf_id", "order_id") VALUES
        (${getRand()}, '${product_ids[0].id}', '${shelf_ids[0].id}', null),
        (${getRand()}, '${product_ids[0].id}', '${shelf_ids[1].id}', null),
        (${getRand()}, '${product_ids[1].id}', '${shelf_ids[1].id}', null),
        (${getRand()}, '${product_ids[0].id}', '${shelf_ids[2].id}', null),
        (${getRand()}, '${product_ids[1].id}', '${shelf_ids[2].id}', null),
        (${getRand()}, '${product_ids[2].id}', '${shelf_ids[2].id}', null),

        (${getRand()}, '${product_ids[0].id}', null, '${order_ids[0].id}'),
        (${getRand()}, '${product_ids[0].id}', null, '${order_ids[1].id}'),
        (${getRand()}, '${product_ids[1].id}', null, '${order_ids[1].id}'),
        (${getRand()}, '${product_ids[0].id}', null, '${order_ids[2].id}'),
        (${getRand()}, '${product_ids[1].id}', null, '${order_ids[2].id}'),
        (${getRand()}, '${product_ids[2].id}', null, '${order_ids[2].id}')
    `);
    }
    async down(queryRunner) { }
}
exports.CreateTestEntities1725471013675 = CreateTestEntities1725471013675;
//# sourceMappingURL=1725471013675-create-test-entities.js.map