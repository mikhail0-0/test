"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendService = exports.EAction = void 0;
var EAction;
(function (EAction) {
    EAction["PRODUCT_CREATION"] = "PRODUCT_CREATION";
    EAction["REMAINING_CREATION"] = "REMAINING_CREATION";
    EAction["REMAINING_QUANTITY_CHANGING"] = "REMAINING_QUANTITY_CHANGING";
})(EAction || (exports.EAction = EAction = {}));
class SendService {
    constructor(address) {
        this.address = address;
    }
    sendMessage(message) {
        fetch(this.address, {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }
}
exports.SendService = SendService;
//# sourceMappingURL=send.service.js.map