"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemainingsService = void 0;
const abstract_service_1 = require("../common/abstract.service");
const product_entity_1 = require("../entities/product.entity");
const shelf_entity_1 = require("../entities/shelf.entity");
const order_entity_1 = require("../entities/order.entity");
const send_service_1 = require("./send.service");
const MAX_REM = 100;
class RemainingsService extends abstract_service_1.AbstractService {
    async create(dto) {
        if (!dto.shelfId === !dto.orderId) {
            throw new Error("remaining must have shelfId or orderId");
        }
        const remaining = await this.repository.save(dto);
        const rem = await this.repository.findOne({
            where: { id: remaining.id },
            relations: ["product", "shelf", "shelf.shop", "order", "order.shop"],
        });
        this.sendService.sendMessage({
            shopId: rem.shelf ? rem.shelf.shopId : rem.order.shopId,
            plu: rem.product.plu,
            action: send_service_1.EAction.REMAINING_CREATION,
        });
        return remaining;
    }
    async changeQuantity(dto) {
        const rem = await this.repository.findOne({
            where: { id: dto.id },
            relations: ["product", "shelf", "shelf.shop", "order", "order.shop"],
        });
        if (!rem) {
            throw Error("remaning not found");
        }
        const newQuantity = +rem.quantity + +dto.diff;
        if (newQuantity < 0) {
            throw Error("quantity cannot be lower then 0");
        }
        await this.repository.update(rem.id, { quantity: newQuantity });
        this.sendService.sendMessage({
            action: send_service_1.EAction.REMAINING_QUANTITY_CHANGING,
            shopId: rem.shelf ? rem.shelf.shopId : rem.order.shopId,
            plu: rem.product.plu,
        });
    }
    async find(plu, shopId, shelfRemBegin, shelfRemEnd, orderRemBegin, orderRemEnd) {
        const qb = this.repository
            .createQueryBuilder("r")
            .select("r.*")
            .innerJoin(product_entity_1.ProductEntity, "p", "r.product_id = p.id")
            .leftJoin(shelf_entity_1.ShelfEntity, "s", "r.shelf_id = s.id")
            .leftJoin(order_entity_1.OrderEntity, "o", "r.order_id = o.id")
            .where("true");
        if (plu !== undefined) {
            qb.andWhere("p.plu ILIKE :plu", { plu: `%${plu}%` });
        }
        if (shopId !== undefined) {
            qb.andWhere("(s.shop_id = :shopId OR o.shop_id = :shopId)", { shopId });
        }
        if (shelfRemBegin !== undefined || shelfRemEnd !== undefined) {
            qb.andWhere("((select	count(*) from	remainings	where	shelf_id = r.shelf_id) between :shelfRemBegin AND :shelfRemEnd)", {
                shelfRemBegin: shelfRemBegin ?? 0,
                shelfRemEnd: shelfRemEnd ?? MAX_REM,
            });
        }
        if (orderRemBegin !== undefined || orderRemEnd !== undefined) {
            qb.andWhere("((select	count(*) from	remainings	where	order_id = r.order_id) between :orderRemBegin AND :orderRemEnd)", {
                orderRemBegin: orderRemBegin ?? 0,
                orderRemEnd: orderRemEnd ?? MAX_REM,
            });
        }
        return await qb.getRawMany();
    }
}
exports.RemainingsService = RemainingsService;
//# sourceMappingURL=remainings.service.js.map