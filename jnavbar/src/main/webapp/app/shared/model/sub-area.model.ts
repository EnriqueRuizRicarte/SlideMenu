export interface ISubArea {
    id?: number;
    descripcion?: string;
    areaDescripcion?: string;
    areaId?: number;
}

export class SubArea implements ISubArea {
    constructor(public id?: number, public descripcion?: string, public areaDescripcion?: string, public areaId?: number) {}
}
