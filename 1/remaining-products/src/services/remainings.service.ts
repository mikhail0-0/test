import { RemainingEntity } from "../entities/remaining.entity";
import { AbstractService } from "../common/abstract.service";
import { ProductEntity } from "../entities/product.entity";
import { ShelfEntity } from "../entities/shelf.entity";
import { OrderEntity } from "../entities/order.entity";
import { EAction } from "./send.service";

const MAX_REM = 100;

export interface ChangeQuantityDTO extends Partial<RemainingEntity> {
  id: string;
  diff: string | number;
}

export class RemainingsService extends AbstractService<RemainingEntity> {
  async create(dto: Omit<RemainingEntity, "id">): Promise<RemainingEntity> {
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
      action: EAction.REMAINING_CREATION,
    });
    return remaining;
  }

  async changeQuantity(dto: ChangeQuantityDTO): Promise<void> {
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
      action: EAction.REMAINING_QUANTITY_CHANGING,
      shopId: rem.shelf ? rem.shelf.shopId : rem.order.shopId,
      plu: rem.product.plu,
    });
  }

  async find(
    plu?: string,
    shopId?: string,
    shelfRemBegin?: number,
    shelfRemEnd?: number,
    orderRemBegin?: number,
    orderRemEnd?: number
  ): Promise<unknown> {
    const qb = this.repository
      .createQueryBuilder("r")
      .select("r.*")
      .innerJoin(ProductEntity, "p", "r.product_id = p.id")
      .leftJoin(ShelfEntity, "s", "r.shelf_id = s.id")
      .leftJoin(OrderEntity, "o", "r.order_id = o.id")
      .where("true");

    if (plu !== undefined) {
      qb.andWhere("p.plu ILIKE :plu", { plu: `%${plu}%` });
    }
    if (shopId !== undefined) {
      qb.andWhere("(s.shop_id = :shopId OR o.shop_id = :shopId)", { shopId });
    }
    if (shelfRemBegin !== undefined || shelfRemEnd !== undefined) {
      qb.andWhere(
        "((select	count(*) from	remainings	where	shelf_id = r.shelf_id) between :shelfRemBegin AND :shelfRemEnd)",
        {
          shelfRemBegin: shelfRemBegin ?? 0,
          shelfRemEnd: shelfRemEnd ?? MAX_REM,
        }
      );
    }
    if (orderRemBegin !== undefined || orderRemEnd !== undefined) {
      qb.andWhere(
        "((select	count(*) from	remainings	where	order_id = r.order_id) between :orderRemBegin AND :orderRemEnd)",
        {
          orderRemBegin: orderRemBegin ?? 0,
          orderRemEnd: orderRemEnd ?? MAX_REM,
        }
      );
    }

    return await qb.getRawMany();
  }
}
