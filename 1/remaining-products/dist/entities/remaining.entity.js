"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemainingEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../common/abstract.entity");
const product_entity_1 = require("./product.entity");
const shelf_entity_1 = require("./shelf.entity");
const order_entity_1 = require("./order.entity");
let RemainingEntity = class RemainingEntity extends abstract_entity_1.AbstractEntity {
};
exports.RemainingEntity = RemainingEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, { nullable: true }),
    __metadata("design:type", product_entity_1.ProductEntity)
], RemainingEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shelf_entity_1.ShelfEntity, { nullable: true }),
    __metadata("design:type", shelf_entity_1.ShelfEntity)
], RemainingEntity.prototype, "shelf", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity),
    __metadata("design:type", order_entity_1.OrderEntity)
], RemainingEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], RemainingEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], RemainingEntity.prototype, "shelfId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], RemainingEntity.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], RemainingEntity.prototype, "quantity", void 0);
exports.RemainingEntity = RemainingEntity = __decorate([
    (0, typeorm_1.Entity)("remainings"),
    (0, typeorm_1.Index)(["shelfId", "orderId"])
], RemainingEntity);
//# sourceMappingURL=remaining.entity.js.map