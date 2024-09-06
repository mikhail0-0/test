import { Column, Entity, Index, ManyToOne } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";
import { ProductEntity } from "./product.entity";
import { ShelfEntity } from "./shelf.entity";
import { OrderEntity } from "./order.entity";

@Entity("remainings")
@Index(["shelfId", "orderId"])
export class RemainingEntity extends AbstractEntity {
  @ManyToOne(() => ProductEntity, { nullable: true })
  product?: ProductEntity;

  @ManyToOne(() => ShelfEntity, { nullable: true })
  shelf?: ShelfEntity;

  @ManyToOne(() => OrderEntity)
  order?: OrderEntity;

  @Column({ type: "uuid" })
  productId: string;

  @Column({ type: "uuid", nullable: true })
  shelfId: string;

  @Column({ type: "uuid", nullable: true })
  orderId: string;

  @Column({ type: "numeric" })
  quantity: number;
}
