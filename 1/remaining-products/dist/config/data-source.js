"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
dotenv.config();
exports.dataSourceOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js", "dist/seeds/*.js"],
    migrationsRun: true,
    synchronize: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map