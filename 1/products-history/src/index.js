import Fastify from "fastify";
import { config } from "dotenv";
import { Between, DataSource, ILike } from "typeorm";
import { dataSourceOptions } from "./config/data-source.js";
import { MessageEntity } from "./entities/message.entity.js";
config();

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

const messageRepository = dataSource.getRepository(MessageEntity);

const fastify = Fastify({
  logger: true,
});

fastify.post("/message", async (request) => {
  await messageRepository.save(request.body);
});

fastify.get("/history", async (request, reply) => {
  const queryStr = request.query;
  const conditions = {};
  if (queryStr["shopId"]) {
    conditions.shopId = queryStr["shopId"];
  }
  if (queryStr["plu"]) {
    conditions.plu = ILike(`%${queryStr["plu"]}%`);
  }
  if (queryStr["timestampBegin"] && queryStr["timestampEnd"]) {
    conditions.date = Between(
      new Date(+queryStr["timestampBegin"]).toISOString(),
      new Date(+queryStr["timestampEnd"]).toISOString()
    );
  }
  if (queryStr["action"]) {
    conditions.action = queryStr["action"];
  }
  const messages = await messageRepository.find({
    where: conditions,
    take: +queryStr["take"],
    skip: +queryStr["skip"],
  });
  reply.send(messages);
});

fastify.listen({ port: +process.env.APP_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
