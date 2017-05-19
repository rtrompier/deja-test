import { EventEmitter } from '@angular/core';
import { IDejaTile } from './';
export declare class DejaTileGroupComponent {
    static defaultColor: string;
    model: IDejaTile;
    close: EventEmitter<void>;
    titleChanged: EventEmitter<string>;
    protected backgroundColor: string;
    protected foregroundColor: any;
    private edit$;
    private title;
    private _designMode;
    constructor();
    color: string;
    designMode: boolean | string;
}
