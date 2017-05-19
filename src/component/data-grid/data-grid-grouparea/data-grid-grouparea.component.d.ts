import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { DejaClipboardService } from '../../../common/core/clipboard/clipboard.service';
import { IDejaDragEvent, IDejaDropEvent } from '../../index';
import { IDejaGridColumn, IDejaGridGroupsEvent } from '../index';
export declare class DejaGridGroupAreaComponent {
    private changeDetectorRef;
    private clipboardService;
    groupsChanged: EventEmitter<IDejaGridGroupsEvent>;
    groupRemoved: EventEmitter<IDejaGridGroupsEvent>;
    private _groups;
    private columnGroupKey;
    private groupGroupKey;
    groups: IDejaGridColumn[];
    constructor(changeDetectorRef: ChangeDetectorRef, clipboardService: DejaClipboardService);
    protected getDragContext(group: IDejaGridColumn): {
        dragendcallback: (event: IDejaDragEvent) => void;
        dragstartcallback: (event: IDejaDragEvent) => void;
    };
    protected getDropContext(): {
        dragovercallback: (event: IDejaDropEvent) => void;
        dropcallback: (event: IDejaDropEvent) => void;
    };
    protected removeGroup(event: Event, index: number): boolean;
    protected getGroupColumnFromHTMLElement(element: HTMLElement): IDejaGridColumn;
    private getGroupElementFromHTMLElement(element);
}
