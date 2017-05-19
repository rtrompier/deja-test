export interface IDejaGridColumn {
    label?: string;
    name: string;
    w?: number;
    width?: string;
    minWidth?: number;
    useCellTemplate?: boolean;
    draggable?: boolean;
    dragged?: boolean;
    sizeable?: boolean;
    sortable?: boolean;
    sorting?: boolean;
    responsive?: boolean | number;
    groupable?: boolean;
    groupByField?: ((model: any) => string) | string;
    groupTextField?: ((model: any) => string) | string;
    isCurrent?: boolean;
}
export interface IDejaGridColumnEvent {
    column: IDejaGridColumn;
    originalEvent: MouseEvent;
}
export interface IDejaGridColumnSizeEvent {
    column: IDejaGridColumn;
    offsetWidth: number;
    originalEvent: MouseEvent;
}
export interface IDejaGridColumnLayoutEvent extends IDejaGridColumnEvent {
    target: IDejaGridColumn;
}
