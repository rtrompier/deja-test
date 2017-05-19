import { EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
export declare class DejaChipsComponent implements ControlValueAccessor {
    _control: NgControl;
    _items: any[];
    textField: string;
    itemTemplateExternal: any;
    readonly: boolean;
    close: EventEmitter<any>;
    protected onTouchedCallback: () => void;
    protected onChangeCallback: (_: any) => void;
    private _disabled;
    private itemTemplateInternal;
    constructor(_control: NgControl);
    disabled: boolean | string;
    items: any[];
    value: any[];
    writeValue(value: any[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    protected readonly itemTemplate: any;
    protected getTextValue(value: any): any;
    protected onClose(item: any, index: number): void;
}
