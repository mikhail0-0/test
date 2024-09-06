import { EntitySchema } from "typeorm";

export const MessageEntity = new EntitySchema({
  name: "messages",
  columns: {
    id: { type: "uuid", generated: "uuid", primary: true },
    date: { type: "timestamp", createDate: true},
    plu: { type: "varchar" },
    action: {
      type: "enum",
      enum: [
        "PRODUCT_CREATION",
        "REMAINING_CREATION",
        "REMAINING_QUANTITY_CHANGING",
      ],
    },
    shopId: { type: "uuid", nullable: true },
  },
});
