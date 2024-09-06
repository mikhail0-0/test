import { RemainingEntity } from "../entities/remaining.entity";
import { AbstractService } from "../common/abstract.service";
export interface ChangeQuantityDTO extends Partial<RemainingEntity> {
    id: string;
    diff: string | number;
}
export declare class RemainingsService extends AbstractService<RemainingEntity> {
    create(dto: Omit<RemainingEntity, "id">): Promise<RemainingEntity>;
    changeQuantity(dto: ChangeQuantityDTO): Promise<void>;
    find(plu?: string, shopId?: string, shelfRemBegin?: number, shelfRemEnd?: number, orderRemBegin?: number, orderRemEnd?: number): Promise<unknown>;
}
