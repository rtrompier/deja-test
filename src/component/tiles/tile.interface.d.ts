import { Rect } from '../../common/core/graphics';
export interface IDejaTileEffect {
    selected: boolean;
    cutted: boolean;
    pending: boolean;
    fading: boolean;
}
export interface IDejaTile {
    id?: string;
    type?: string;
    bounds?: Rect;
    color?: string;
    templateModel?: any;
    effects?: IDejaTileEffect;
}
