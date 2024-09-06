import fastify from "fastify";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { dataSourceOptions } from "./config/data-source";
import { ProductsService } from "./services/products.service";
import { ProductEntity } from "./entities/product.entity";
import {
  ChangeQuantityDTO,
  RemainingsService,
} from "./services/remainings.service";
import { RemainingEntity } from "./entities/remaining.entity";
import { SendService } from "./services/send.service";

config();

const appPort = +process.env.APP_PORT;

let productsService: ProductsService;
let remainingsService: RemainingsService;

async function init(): Promise<void> {
  const sendService = new SendService(
    `http://${process.env.HISTORY_SERVICE_HOST}:${process.env.HISTORY_SERVICE_PORT}/message`
  );

  const dataSource = new DataSource(dataSourceOptions);
  dataSource.initialize();

  productsService = new ProductsService(
    dataSource.getRepository(ProductEntity),
    sendService
  );
  remainingsService = new RemainingsService(
    dataSource.getRepository(RemainingEntity),
    sendService
  );
}

init();
const server = fastify();

server.get("/products", async (request) => {
  const queryStr = request.query;
  return await productsService.find(queryStr["plu"], queryStr["name"]);
});

server.post("/products", async (request) => {
  return await productsService.create(
    request.body as Omit<ProductEntity, "id">
  );
});

server.get("/remainings", async (request) => {
  const queryStr = request.query;
  return await remainingsService.find(
    queryStr["plu"],
    queryStr["shopId"],
    queryStr["shelfRemBegin"],
    queryStr["shelfRemEnd"],
    queryStr["orderRemBegin"],
    queryStr["orderRemEnd"]
  );
});

server.post("/remainings", async (request) => {
  return await remainingsService.create(
    request.body as Omit<RemainingEntity, "id">
  );
});

server.post("/remainings/increase", async (request) => {
  await remainingsService.changeQuantity(request.body as ChangeQuantityDTO);
});
server.post("/remainings/decrease", async (request) => {
  const dto = request.body as ChangeQuantityDTO;
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
