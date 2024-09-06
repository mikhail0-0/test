import { FindOptionsWhere, ILike } from "typeorm";
import { AbstractService } from "../common/abstract.service";
import { ProductEntity } from "../entities/product.entity";
import { EAction } from "./send.service";

export class ProductsService extends AbstractService<ProductEntity> {
  async create(dto: Omit<ProductEntity, "id">): Promise<ProductEntity> {
    const result = await this.repository.save(dto);
    await this.sendService.sendMessage({
      action: EAction.PRODUCT_CREATION,
      plu: result.plu,
      shopId: null,
    });
    return result;
  }

  async find(plu?: string, name?: string): Promise<ProductEntity[]> {
    const conditions: FindOptionsWhere<ProductEntity> = {};
    if (plu) {
      conditions.plu = ILike(`%${plu}%`);
    }
    if (name) {
      conditions.name = ILike(`%${name}%`);
    }

    return await this.repository.findBy(conditions);
  }
}
