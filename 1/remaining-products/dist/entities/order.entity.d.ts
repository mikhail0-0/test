import { AbstractEntity } from "../common/abstract.entity";
import { ShopEntity } from "./shop.entity";
export declare class OrderEntity extends AbstractEntity {
    shop?: ShopEntity;
    shopId: string;
}
