import { Repository } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { SendService } from "../services/send.service";

export abstract class AbstractService<Entity extends AbstractEntity> {
  constructor(
    protected readonly repository: Repository<Entity>,
    protected readonly sendService: SendService
  ) {}
}
