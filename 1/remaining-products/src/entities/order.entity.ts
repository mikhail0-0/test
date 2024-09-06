import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";
import { ShopEntity } from "./shop.entity";

@Entity("orders")
export class OrderEntity extends AbstractEntity {
  @ManyToOne(() => ShopEntity)
  shop?: ShopEntity;

  @Column({ type: "uuid" })
  shopId: string;
}
