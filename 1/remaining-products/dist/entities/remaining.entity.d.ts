import { AbstractEntity } from "../common/abstract.entity";
import { ProductEntity } from "./product.entity";
import { ShelfEntity } from "./shelf.entity";
import { OrderEntity } from "./order.entity";
export declare class RemainingEntity extends AbstractEntity {
    product?: ProductEntity;
    shelf?: ShelfEntity;
    order?: OrderEntity;
    productId: string;
    shelfId: string;
    orderId: string;
    quantity: number;
}
