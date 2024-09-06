import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";
import { ShopEntity } from "./shop.entity";

@Entity("shelfs")
export class ShelfEntity extends AbstractEntity {
  @ManyToOne(() => ShopEntity)
  shop?: ShopEntity;

  @Column({ type: "uuid" })
  shopId: string;

  @Column({ type: "varchar" })
  code: string;
}
