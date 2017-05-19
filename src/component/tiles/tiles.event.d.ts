import { DejaCancelableEvent } from '../../common/core/events/cancelable-event';
import { IDejaTile } from './index';
export interface IDejaTilesEvent extends CustomEvent {
    tiles: IDejaTile[];
}
export interface IDejaTilesCancelableEvent extends DejaCancelableEvent {
    tiles: IDejaTile[];
}
export interface IDejaTilesRemoveEvent extends IDejaTilesCancelableEvent {
    removed: IDejaTile[];
}
export interface IDejaTilesAddEvent extends IDejaTilesCancelableEvent {
    added: IDejaTile[];
}
export interface IDejaTilesModelEvent extends IDejaTilesEvent {
    removed?: IDejaTile[];
    added?: IDejaTile[];
}
