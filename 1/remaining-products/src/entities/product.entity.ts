import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../common/abstract.entity";

@Entity("products")
export class ProductEntity extends AbstractEntity {
  @Column({ type: "varchar", unique: true })
  plu: string;

  @Column({ type: "varchar" })
  name: string;
}
