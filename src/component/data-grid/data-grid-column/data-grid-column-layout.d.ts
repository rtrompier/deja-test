import { Subject } from 'rxjs/Subject';
import { IDejaGridColumn } from '../index';
export declare class IDejaGridColumnLayout {
    scrollLeft: number;
    vpBeforeWidth: number;
    vpAfterWidth: number;
    columns: IDejaGridColumn[];
    refresh$: Subject<void>;
}
