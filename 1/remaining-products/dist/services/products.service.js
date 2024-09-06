"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const typeorm_1 = require("typeorm");
const abstract_service_1 = require("../common/abstract.service");
const send_service_1 = require("./send.service");
class ProductsService extends abstract_service_1.AbstractService {
    async create(dto) {
        const result = await this.repository.save(dto);
        await this.sendService.sendMessage({
            action: send_service_1.EAction.PRODUCT_CREATION,
            plu: result.plu,
            shopId: null,
        });
        return result;
    }
    async find(plu, name) {
        const conditions = {};
        if (plu) {
            conditions.plu = (0, typeorm_1.ILike)(`%${plu}%`);
        }
        if (name) {
            conditions.name = (0, typeorm_1.ILike)(`%${name}%`);
        }
        return await this.repository.findBy(conditions);
    }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map