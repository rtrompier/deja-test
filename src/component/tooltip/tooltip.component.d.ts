import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DejaDropDownComponent } from '../dropdown/index';
import { ITooltipParams } from './index';
import { DejaTooltipService } from './tooltip.service';
export declare class DejaTooltipComponent implements OnInit {
    private tooltipService;
    containerElement: ElementRef | HTMLElement;
    name: string;
    hide: EventEmitter<{}>;
    dropdown: DejaDropDownComponent;
    tooltipTemplate: any;
    params: ITooltipParams;
    private model;
    constructor(elementRef: ElementRef, tooltipService: DejaTooltipService);
    ngOnInit(): void;
}
