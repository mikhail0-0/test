import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";

@Entity("shops")
export class ShopEntity extends AbstractEntity {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  address: string;
}
