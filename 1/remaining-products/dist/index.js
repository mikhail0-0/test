"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const data_source_1 = require("./config/data-source");
const products_service_1 = require("./services/products.service");
const product_entity_1 = require("./entities/product.entity");
const remainings_service_1 = require("./services/remainings.service");
const remaining_entity_1 = require("./entities/remaining.entity");
const send_service_1 = require("./services/send.service");
(0, dotenv_1.config)();
const appPort = +process.env.APP_PORT;
let productsService;
let remainingsService;
async function init() {
    const sendService = new send_service_1.SendService("http://localhost:3001/message");
    const dataSource = new typeorm_1.DataSource(data_source_1.dataSourceOptions);
    dataSource.initialize();
    productsService = new products_service_1.ProductsService(dataSource.getRepository(product_entity_1.ProductEntity), sendService);
    remainingsService = new remainings_service_1.RemainingsService(dataSource.getRepository(remaining_entity_1.RemainingEntity), sendService);
}
init();
const server = (0, fastify_1.default)();
server.get("/products", async (request) => {
    const queryStr = request.query;
    return await productsService.find(queryStr["plu"], queryStr["name"]);
});
server.post("/products", async (request) => {
    return await productsService.create(request.body);
});
server.get("/remainings", async (request) => {
    const queryStr = request.query;
    return await remainingsService.find(queryStr["plu"], queryStr["shopId"], queryStr["shelfRemBegin"], queryStr["shelfRemEnd"], queryStr["orderRemBegin"], queryStr["orderRemEnd"]);
});
server.post("/remainings", async (request) => {
    return await remainingsService.create(request.body);
});
server.post("/remainings/increase", async (request) => {
    await remainingsService.changeQuantity(request.body);
});
server.post("/remainings/decrease", async (request) => {
    const dto = request.body;
    dto.diff = -dto.diff;
    await remainingsService.changeQuantity(dto);
});
server.listen({ port: appPort }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=index.js.map