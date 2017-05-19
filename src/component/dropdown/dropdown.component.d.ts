import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/takeUntil';
export declare class DejaDropDownComponent implements AfterViewInit {
    private elementRef;
    hide: EventEmitter<{}>;
    showed: EventEmitter<{}>;
    ownerElement: ElementRef | HTMLElement;
    ownerLeftMargin: number;
    ownerTopMargin: number;
    ownerRightMargin: number;
    ownerBottomMargin: number;
    containerElement: ElementRef | HTMLElement;
    avoidOnwerOverflow: boolean;
    closeOnEscape: true;
    private show$;
    private closeOnEscape$;
    private ownerAlignents;
    private dropdownAlignments;
    private resetAllParams;
    ownerAlignment: string;
    dropdownAlignment: string;
    readonly dropdownElement: HTMLElement;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    show(resetParams?: IDropDownResetParams): void;
}
export interface IDropDownResetParams {
    left?: boolean;
    top?: boolean;
    width?: boolean | number;
    height?: boolean | number;
    valign?: boolean;
    halign?: boolean;
}
