import { ISubArea } from 'app/shared/model/sub-area.model';

export interface IArea {
    id?: number;
    descripcion?: string;
    subAreas?: ISubArea[];
}

export class Area implements IArea {
    constructor(public id?: number, public descripcion?: string, public subAreas?: ISubArea[]) {}
}
