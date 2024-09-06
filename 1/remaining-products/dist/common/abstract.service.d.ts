import { Repository } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { SendService } from "../services/send.service";
export declare abstract class AbstractService<Entity extends AbstractEntity> {
    protected readonly repository: Repository<Entity>;
    protected readonly sendService: SendService;
    constructor(repository: Repository<Entity>, sendService: SendService);
}
