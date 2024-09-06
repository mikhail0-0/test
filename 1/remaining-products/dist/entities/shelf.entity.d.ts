import { AbstractEntity } from "../common/abstract.entity";
import { ShopEntity } from "./shop.entity";
export declare class ShelfEntity extends AbstractEntity {
    shop?: ShopEntity;
    shopId: string;
    code: string;
}
