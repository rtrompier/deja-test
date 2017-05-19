import { ElementRef, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import { DejaTooltipService } from '.';
export declare class DejaTooltipDirective {
    model: any;
    name: string;
    ownerAlignment: 'center top';
    dropdownAlignment: 'center bottom';
    show: EventEmitter<{}>;
    constructor(elementRef: ElementRef, tooltipService: DejaTooltipService);
}
