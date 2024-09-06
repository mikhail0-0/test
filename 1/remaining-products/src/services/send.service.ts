export enum EAction {
  PRODUCT_CREATION = "PRODUCT_CREATION",
  REMAINING_CREATION = "REMAINING_CREATION",
  REMAINING_QUANTITY_CHANGING = "REMAINING_QUANTITY_CHANGING",
}

type Message = {
  action: EAction;
  plu: string;
  shopId: string | null;
};

export class SendService {
  constructor(protected readonly address: string) {}

  sendMessage(message: Message): void {
    fetch(this.address, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
}
