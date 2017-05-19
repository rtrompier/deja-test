import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Color } from '../../common/core/graphics/index';
import { MaterialColor } from '../../common/core/style';
export declare class DejaColorPickerComponent implements ControlValueAccessor {
    private elementRef;
    _control: NgControl;
    colors: MaterialColor[];
    dropdownContainerId: string;
    dropdownAlignment: string;
    isOpen: boolean;
    colorhover: EventEmitter<{}>;
    protected onTouchedCallback: () => void;
    protected onChangeCallback: (_: any) => void;
    private _small;
    private _disabled;
    private _value;
    readonly containerElement: any;
    constructor(elementRef: ElementRef, _control: NgControl);
    small: boolean | string;
    disabled: boolean | string;
    value: Color;
    writeValue(value: Color): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    protected onClick(event: Event): boolean;
    protected onColorChange(color: Color): void;
}
