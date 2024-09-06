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
exports.ShelfEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../common/abstract.entity");
const shop_entity_1 = require("./shop.entity");
let ShelfEntity = class ShelfEntity extends abstract_entity_1.AbstractEntity {
};
exports.ShelfEntity = ShelfEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => shop_entity_1.ShopEntity),
    __metadata("design:type", shop_entity_1.ShopEntity)
], ShelfEntity.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], ShelfEntity.prototype, "shopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], ShelfEntity.prototype, "code", void 0);
exports.ShelfEntity = ShelfEntity = __decorate([
    (0, typeorm_1.Entity)("shelfs")
], ShelfEntity);
//# sourceMappingURL=shelf.entity.js.map