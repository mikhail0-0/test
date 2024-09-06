import { AbstractService } from "../common/abstract.service";
import { ProductEntity } from "../entities/product.entity";
export declare class ProductsService extends AbstractService<ProductEntity> {
    create(dto: Omit<ProductEntity, "id">): Promise<ProductEntity>;
    find(plu?: string, name?: string): Promise<ProductEntity[]>;
}
