import { SplitAreaDirective } from './split-area.directive';
export interface IAreaData {
    component: SplitAreaDirective;
    sizeUser: number | null;
    size: number;
    orderUser: number | null;
    order: number;
    minPixel: number;
}
