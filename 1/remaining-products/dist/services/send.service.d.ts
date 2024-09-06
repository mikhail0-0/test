export declare enum EAction {
    PRODUCT_CREATION = "PRODUCT_CREATION",
    REMAINING_CREATION = "REMAINING_CREATION",
    REMAINING_QUANTITY_CHANGING = "REMAINING_QUANTITY_CHANGING"
}
type Message = {
    action: EAction;
    plu: string;
    shopId: string | null;
};
export declare class SendService {
    protected readonly address: string;
    constructor(address: string);
    sendMessage(message: Message): void;
}
export {};
