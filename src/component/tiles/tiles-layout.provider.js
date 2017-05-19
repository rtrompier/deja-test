var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { EventEmitter, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { KeyCodes } from '../../common/core/';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { Directions } from '../../common/core/graphics/directions';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { Size } from '../../common/core/graphics/size';
import { DejaTile } from './index';
var DejaTilesLayoutProvider = (function () {
    function DejaTilesLayoutProvider(clipboardService) {
        var _this = this;
        this.clipboardService = clipboardService;
        this.refreshTiles$ = new Subject();
        this.ensureVisible$ = new Subject();
        this.ensureBounds$ = new Subject();
        this.dragging$ = new BehaviorSubject(false);
        this.dragSelection$ = new Subject();
        this.dragDropInfos$ = new Subject();
        this.selectionRect$ = new Subject();
        this.dragover$ = new Subject();
        this.dragleave$ = new Subject();
        this.deleteTiles$ = new Subject();
        this.designMode = false;
        this.layoutChanged = new EventEmitter();
        this.modelChanged = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        this.contentAdding = new EventEmitter();
        this.contentRemoving = new EventEmitter();
        this.tileMinWidth = 10;
        this.tileMinWidthUnit = '%';
        this.tileMaxWidth = 100;
        this.tileMaxWidthUnit = '%';
        this.tileMinHeight = 10;
        this.tileMinHeightUnit = '%';
        this.tileMaxHeight = 100;
        this.tileMaxHeightUnit = '%';
        this.maxWidth = 100;
        this.maxWidthUnit = '%';
        this.tilesDic = {};
        this._targetBounds = {};
        this.destination = {};
        this.dragPageOffset = {};
        this.dragOriginalPosition = {};
        this.selectedIds = [];
        Observable.from(this.refreshTiles$)
            .debounceTime(30)
            .do(function () {
            _this.container.style.width = '';
            _this.container.style.height = '';
        })
            .delay(10)
            .subscribe(function (params) {
            var placeAtTheEnd = [];
            var containerBounds = _this.container.getBoundingClientRect();
            if ((params && params.resetWidth) || !_this.hundredPercentWith) {
                _this.hundredPercentWith = containerBounds.width;
            }
            var height = containerBounds.height - 20;
            var width = containerBounds.width - 20;
            var tiles = _this.tiles || [];
            var selectedTileIds = [];
            tiles.forEach(function (tile) {
                if (tile.percentBounds && !tile.percentBounds.isEmpty()) {
                    var bounds = _this.getPixelBounds(tile.percentBounds);
                    if (bounds.bottom > height) {
                        height = bounds.bottom;
                    }
                    if (bounds.right > width) {
                        width = bounds.right;
                    }
                    if (!tile.isDragging) {
                        tile.pixelBounds = bounds;
                    }
                }
                else {
                    placeAtTheEnd.push(tile);
                }
                if (tile.isSelected && !tile.isHidden) {
                    selectedTileIds.push(tile.id);
                }
            });
            var top = height;
            var left = 0;
            placeAtTheEnd.forEach(function (tile) {
                tile.percentBounds = tile.percentBounds || new Rect(left, _this.getPercentSize(top), 3 * _this.getTileMinPercentWidth(), _this.getTileMinPercentHeight());
                var pixelBounds = _this.getPixelBounds(tile.percentBounds);
                if (pixelBounds.right > width) {
                    top += pixelBounds.top;
                    tile.percentBounds.left = 0;
                    tile.percentBounds.top = _this.getPercentSize(pixelBounds.top);
                }
                if (pixelBounds.bottom > height) {
                    height = pixelBounds.bottom;
                }
                tile.pixelBounds = _this.getPixelBounds(tile.percentBounds);
                left += pixelBounds.left;
            });
            if (_this.dragTarget) {
                var dragBounds = _this.getPixelBounds(_this.dragTarget);
                if (height <= dragBounds.bottom) {
                    height = dragBounds.bottom + dragBounds.height;
                }
                if (width <= dragBounds.right) {
                    width = dragBounds.right + dragBounds.width;
                }
            }
            var minHeight = _this.getPixelSize(2 * _this.tileMinHeight, _this.tileMinHeightUnit);
            if (height < minHeight) {
                height = minHeight;
            }
            _this.container.style.width = width + "px";
            _this.container.style.height = height + "px";
            if (params) {
                if (params.ensureVisible) {
                    _this.ensureVisible$.next(params.ensureVisible);
                }
                if (params.ensureBounds) {
                    _this.ensureBounds$.next(params.ensureBounds);
                }
            }
            _this.selectedTiles = selectedTileIds;
        });
        var ensureTile$ = Observable.from(this.ensureVisible$)
            .delay(1)
            .map(function (id) { return _this.tilesDic[id]; })
            .filter(function (tile) { return !!tile; })
            .map(function (tile) { return tile.percentBounds; });
        Observable.merge(this.ensureBounds$, ensureTile$)
            .subscribe(function (percentBounds) {
            var _a = _this.getPixelBounds(percentBounds), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
            var findScrollContainer = function (container) {
                while (container && container.scrollHeight === container.clientHeight) {
                    container = container.parentElement;
                }
                return container;
            };
            var scrollContainer = findScrollContainer(_this.container);
            if (!scrollContainer) {
                return;
            }
            var containerBounds = _this.container.getBoundingClientRect();
            var scrollBounds = scrollContainer.getBoundingClientRect();
            if (left + containerBounds.left < scrollBounds.bottom) {
                scrollContainer.scrollLeft += left + containerBounds.left - scrollBounds.bottom;
            }
            else if (right + containerBounds.left > scrollBounds.right) {
                scrollContainer.scrollLeft += right + containerBounds.left - scrollBounds.right;
            }
            if (top + containerBounds.top < scrollBounds.top) {
                scrollContainer.scrollTop += top + containerBounds.top - scrollBounds.top;
            }
            else if (bottom + containerBounds.top > scrollBounds.bottom) {
                scrollContainer.scrollTop += bottom + containerBounds.top - scrollBounds.bottom;
            }
        });
        Observable.from(this.dragSelection$)
            .subscribe(function (dragSelection) {
            var mouseUp$ = Observable
                .fromEvent(_this._container.ownerDocument, 'mouseup')
                .do(function () { return _this.selectionRect$.next(null); });
            Observable
                .fromEvent(_this._container, 'mousemove')
                .takeUntil(mouseUp$)
                .filter(function (event) { return event.buttons === 1; })
                .subscribe(function (event) {
                var containerBounds = _this._container.getBoundingClientRect();
                dragSelection.selectedRect = Rect.fromPoints(dragSelection.startPosition, new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top));
                _this.selectionRect$.next(dragSelection.selectedRect);
                var selection = _this.HitTest(dragSelection.selectedRect);
                _this.selectedTiles = selection.map(function (tile) { return tile.id; });
            });
        });
        var leave$ = Observable.from(this.dragleave$);
        Observable.from(this.dragDropInfos$)
            .subscribe(function (dragDropInfos) {
            if (!dragDropInfos || !dragDropInfos.tiles || !dragDropInfos.tiles.length) {
                return;
            }
            var mousemove$ = Observable.fromEvent(_this._container, 'mousemove');
            var mouseUp$ = Observable.fromEvent(_this._container.ownerDocument, 'mouseup');
            var keyUp$ = Observable.fromEvent(_this._container.ownerDocument, 'keyup');
            var escape$ = keyUp$.filter(function (event) { return event.keyCode === KeyCodes.Escape; });
            var cancel$ = Observable.merge(leave$, mousemove$.filter(function (event) { return event.buttons !== 1; }), escape$);
            var kill$ = Observable.merge(mouseUp$, cancel$);
            var mouseUp$sub;
            var cancel$sub = cancel$
                .take(1)
                .do(function () { return mouseUp$sub.unsubscribe(); })
                .subscribe(function () {
                _this.removeTemporaryTile();
                _this.cancelDrag(dragDropInfos.tiles);
            });
            mouseUp$sub = mouseUp$
                .take(1)
                .do(function () { return cancel$sub.unsubscribe(); })
                .subscribe(function () { return _this.drop(dragDropInfos.tiles); });
            var dragover$ = Observable.from(_this.dragover$)
                .map(function (cursor) { return cursor.originalEvent; });
            Observable.merge(mousemove$, dragover$)
                .takeUntil(kill$)
                .subscribe(function (event) {
                var containerBounds = _this._container.getBoundingClientRect();
                var x = event.pageX - containerBounds.left;
                var y = event.pageY - containerBounds.top;
                if (!dragDropInfos.enabled) {
                    if (Math.abs(dragDropInfos.startX - x) > 10 || Math.abs(dragDropInfos.startY - y) > 10) {
                        if (dragDropInfos.tiles.length === 1 && !_this.tiles.find(function (t) { return t === dragDropInfos.tiles[0]; })) {
                            var tempTile = dragDropInfos.tiles[0];
                            _this.selectedTiles = [tempTile.id];
                            var bounds = tempTile.percentBounds;
                            if (!bounds || bounds.isEmpty()) {
                                bounds = new Rect(0, 0, 15, 15);
                            }
                            var idealBounds = _this.getFreePlace(new Rect(_this.getPercentSize(x) - bounds.width / 2, _this.getPercentSize(y) - bounds.height / 2, bounds.width, bounds.height));
                            dragDropInfos.startX = idealBounds.left - bounds.width / 2;
                            dragDropInfos.startY = idealBounds.top - bounds.height / 2;
                            tempTile.percentBounds = idealBounds;
                            tempTile.dragging$.next(true);
                            _this._cursor = 'move';
                            _this.tiles.push(tempTile);
                            _this.tilesDic[tempTile.id] = tempTile;
                            _this.dragging$.next(true);
                            dragDropInfos.enabled = true;
                            _this.startDrag(dragDropInfos.tiles, _this.getPixelSize(idealBounds.left + idealBounds.width / 2), _this.getPixelSize(idealBounds.top + idealBounds.height / 2));
                        }
                        else {
                            _this.dragging$.next(true);
                            dragDropInfos.enabled = true;
                            _this.startDrag(dragDropInfos.tiles, x, y);
                        }
                    }
                }
                else {
                    _this.drag(dragDropInfos.tiles, x, y);
                }
            });
        });
        Observable.from(this.deleteTiles$).subscribe(function (tilesToDelete) { return _this.deleteTiles(tilesToDelete); });
    }
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "container", {
        get: function () {
            return this._container;
        },
        set: function (container) {
            var _this = this;
            this._container = container;
            var leave$ = Observable.fromEvent(container, 'mouseleave');
            var mouseUp$ = Observable.fromEvent(container.ownerDocument, 'mouseup');
            Observable.fromEvent(container, 'mouseenter')
                .subscribe(function () {
                if (_this.designMode) {
                    Observable.fromEvent(container, 'mousemove')
                        .debounceTime(10)
                        .takeUntil(leave$)
                        .filter(function (event) { return event.buttons === 0; })
                        .subscribe(function (event) {
                        _this._cursor = _this.getCursorFromHTMLElement(event.pageX, event.pageY, event.target);
                        _this.container.style.cursor = _this._cursor;
                    });
                }
                else {
                    _this.container.style.cursor = '';
                }
                var mouseDown$ = Observable
                    .fromEvent(container, 'mousedown')
                    .filter(function (event) { return event.buttons === 1; })
                    .map(function (event) { return ({ event: event, target: event.target, clickedTile: _this.getTileComponentFromHTMLElement(event.target) }); });
                mouseDown$.takeUntil(leave$)
                    .subscribe(function (_a) {
                    var event = _a.event, target = _a.target, clickedTile = _a.clickedTile;
                    if (_this.currentTile) {
                        _this.currentTile.isPressed = false;
                    }
                    _this.currentTile = clickedTile;
                    if (_this.currentTile) {
                        _this.currentTile.isPressed = true;
                        if (event.ctrlKey) {
                        }
                        else {
                            if (!_this.currentTile.isSelected || _this._cursor !== 'move') {
                                _this.selectedTiles = [_this.currentTile.id];
                            }
                            if (_this.designMode) {
                                var containerBounds = _this._container.getBoundingClientRect();
                                var x = event.pageX - containerBounds.left;
                                var y = event.pageY - containerBounds.top;
                                _this.dragDropInfos$.next({
                                    enabled: false,
                                    startX: x,
                                    startY: y,
                                    tiles: _this.tiles.filter(function (tile) { return tile.isSelected; }),
                                });
                            }
                        }
                        Observable.merge(mouseUp$, leave$)
                            .first()
                            .filter(function () { return !!_this.currentTile; })
                            .subscribe(function (e) {
                            if (_this.currentTile.isPressed) {
                                _this.currentTile.isPressed = false;
                                if (e.ctrlKey) {
                                    _this.currentTile.isSelected = !_this.currentTile.isSelected;
                                    _this.selectedTiles = _this.tiles
                                        .filter(function (tile) { return tile.isSelected; })
                                        .map(function (tile) { return tile.id; });
                                }
                            }
                            _this.currentTile = undefined;
                        });
                    }
                    else {
                        if (target === _this.container || target.parentElement === _this.container) {
                            if (event.buttons === 1) {
                                var containerBounds = _this._container.getBoundingClientRect();
                                _this.dragSelection$.next({ startPosition: new Position(event.pageX - containerBounds.left, event.pageY - containerBounds.top), selectedRect: new Rect(), });
                            }
                            if (_this.currentTile) {
                                _this.currentTile.isPressed = false;
                            }
                            _this.selectedTiles = [];
                        }
                    }
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tiles", {
        get: function () {
            return this._tiles;
        },
        set: function (tiles) {
            var _this = this;
            this._tiles = tiles;
            this.tilesDic = {};
            tiles.forEach(function (t) { return _this.tilesDic[t.id] = t; });
            this.refreshTiles$.next({ resetWidth: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "selectedTiles", {
        set: function (selectedIds) {
            var selectedTiles = [];
            var raiseEvent = false;
            var idsDic = {};
            selectedIds.forEach(function (id) { return idsDic[id] = true; });
            var previousIdsDic = {};
            this.selectedIds.forEach(function (id) { return previousIdsDic[id] = true; });
            this.tiles.forEach(function (tile) {
                if (idsDic[tile.id] !== previousIdsDic[tile.id]) {
                    raiseEvent = true;
                }
                tile.isSelected = idsDic[tile.id];
                if (tile.isSelected) {
                    selectedTiles.push(tile);
                }
            });
            this.selectedIds = selectedIds;
            if (raiseEvent) {
                var event_1 = new CustomEvent('DejaTilesAddEvent', { cancelable: false });
                event_1.tiles = selectedTiles;
                this.selectionChanged.emit(event_1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tileminwidth", {
        set: function (value) {
            this.extractValueAndUnit('tileMinWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tilemaxwidth", {
        set: function (value) {
            this.extractValueAndUnit('tileMaxWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tileminheight", {
        set: function (value) {
            this.extractValueAndUnit('tileMinHeight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tilemaxheight", {
        set: function (value) {
            this.extractValueAndUnit('tileMaxHeight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "maxwidth", {
        set: function (value) {
            this.extractValueAndUnit('maxWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "targetBounds", {
        get: function () {
            return this._targetBounds;
        },
        set: function (targetBounds) {
            this._targetBounds = targetBounds;
            if (targetBounds) {
                this.selectionRect$.next(new Rect({
                    height: this.getPixelSize(targetBounds.height || 0),
                    left: this.getPixelSize(targetBounds.left || 0),
                    top: this.getPixelSize(targetBounds.top || 0),
                    width: this.getPixelSize(targetBounds.width || 0),
                }));
            }
            else {
                this.selectionRect$.next(undefined);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaTilesLayoutProvider.prototype.copySelection = function () {
        var selectedTiles = this.tiles.filter(function (tile) { return tile.isSelected; });
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, false);
        }
        return selectedTiles;
    };
    DejaTilesLayoutProvider.prototype.cutSelection = function () {
        var selectedTiles = this.tiles.filter(function (tile) { return tile.isSelected; });
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, true);
        }
        return selectedTiles;
    };
    DejaTilesLayoutProvider.prototype.deleteSelection = function () {
        var selectedTiles = this.tiles.filter(function (tile) { return tile.isSelected; });
        if (selectedTiles.length) {
            this.removeTiles(selectedTiles.map(function (tile) { return tile.id; }));
        }
        return selectedTiles;
    };
    DejaTilesLayoutProvider.prototype.paste = function () {
        var _this = this;
        if (!this.clipboardService || !this.clipboardService.isAvailable('tiles')) {
            return [];
        }
        var sourceTiles = this.clipboardService.get('tiles');
        this.tiles.forEach(function (tile) { return tile.isSelected = false; });
        var bounds;
        sourceTiles.forEach(function (tile) {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });
        var targetBounds = this.getFreePlace(new Rect(0, 0, bounds.width, bounds.height));
        var newTiles = sourceTiles.map(function (tile) {
            var newTile = _this.createTile({
                type: tile.type,
                bounds: new Rect(targetBounds.left + tile.percentBounds.left - bounds.left, targetBounds.top + tile.percentBounds.top - bounds.top, tile.percentBounds.width, tile.percentBounds.height),
                templateModel: tile.templateModel,
                color: tile.color,
            });
            newTile.isSelected = true;
            return newTile;
        });
        this.addTiles(newTiles);
        return newTiles;
    };
    DejaTilesLayoutProvider.prototype.getTileElementFromHTMLElement = function (element) {
        var tileElement = element;
        while (tileElement && tileElement.tagName !== 'DEJA-TILE') {
            tileElement = tileElement.parentElement;
            if (tileElement === this.container) {
                return undefined;
            }
        }
        return tileElement;
    };
    DejaTilesLayoutProvider.prototype.getTileComponentFromHTMLElement = function (element) {
        var tileElement = this.getTileElementFromHTMLElement(element);
        return tileElement && this.tilesDic[tileElement.id];
    };
    DejaTilesLayoutProvider.prototype.deleteTiles = function (tilesToDelete) {
        var _this = this;
        if (!tilesToDelete || tilesToDelete.length === 0) {
            return;
        }
        var event = new CustomEvent('DejaTilesModelEvent', { cancelable: false });
        event.removed = tilesToDelete.map(function (tile) { return tile.toTileModel(); });
        tilesToDelete.forEach(function (tile) {
            delete _this.tilesDic[tile.id];
            tile.delete();
        });
        var index = this._tiles.length;
        while (--index >= 0) {
            var tile = this._tiles[index];
            if (!this.tilesDic[tile.id]) {
                this._tiles.splice(index, 1);
            }
        }
        this.refreshTiles$.next({ resetWidth: true });
        event.tiles = this._tiles.map(function (tile) { return tile.toTileModel(); });
        this.modelChanged.emit(event);
    };
    DejaTilesLayoutProvider.prototype.removeTiles = function (tileIdsToRemove) {
        var _this = this;
        if (!tileIdsToRemove || tileIdsToRemove.length === 0) {
            return;
        }
        var tilesToRemove = tileIdsToRemove.map(function (id) { return _this.tilesDic[id]; });
        tilesToRemove.forEach(function (tile) {
            tile.isHidden = true;
        });
        var event = new CustomEvent('DejaTilesRemoveEvent', { cancelable: true });
        event.tiles = this.tiles.map(function (tile) { return tile.toTileModel(); });
        event.removed = tilesToRemove.map(function (tile) { return tile.toTileModel(); });
        event.cancel$ = new Subject();
        var cancelSubscription = event.cancel$
            .first()
            .subscribe(function (value) {
            if (value) {
                tilesToRemove.forEach(function (tile) { return tile.isHidden = false; });
            }
            else {
                _this.deleteTiles(tilesToRemove);
            }
        });
        Observable.timer(1000)
            .first()
            .filter(function () { return !event.defaultPrevented; })
            .subscribe(function () {
            cancelSubscription.unsubscribe();
            _this.deleteTiles(tilesToRemove);
        });
        this.contentRemoving.next(event);
    };
    DejaTilesLayoutProvider.prototype.createTiles = function (tiles) {
        var _this = this;
        if (!tiles || tiles.length === 0) {
            return;
        }
        this.addTiles(tiles.map(function (tile) { return _this.createTile(tile); }));
    };
    DejaTilesLayoutProvider.prototype.getFreePlace = function (idealBounds) {
        var containerBounds = this.container.getBoundingClientRect();
        var percentHeight = this.getPercentSize(containerBounds.height);
        var freePlaces = [];
        for (var x = 0; x <= this.maxWidth - idealBounds.width; x += this.tileMinWidth) {
            var _loop_1 = function (y) {
                var currentBounds = new Rect(x, y, idealBounds.width, idealBounds.height);
                if (this_1.tiles.filter(function (t) { return t.percentBounds.intersectWith(currentBounds); }).length === 0) {
                    freePlaces.push(currentBounds);
                }
            };
            var this_1 = this;
            for (var y = 0; y <= percentHeight - idealBounds.height; y += this.tileMinHeight) {
                _loop_1(y);
            }
        }
        if (freePlaces.length > 0) {
            freePlaces.sort(function (bounds1, bounds2) {
                var calcDistance = function (bounds) { return Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right - idealBounds.right)) + 2 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom - idealBounds.bottom)); };
                return calcDistance(bounds1) - calcDistance(bounds2);
            });
            return freePlaces[0];
        }
        var maxHeight = 0;
        this.tiles.forEach(function (t) {
            if (t.percentBounds.bottom > maxHeight) {
                maxHeight = t.percentBounds.bottom;
            }
        });
        return new Rect(0, maxHeight, idealBounds.width, idealBounds.height);
    };
    DejaTilesLayoutProvider.prototype.moveTile = function (id, bounds) {
        var tile = this.tiles.find(function (t) { return t.id === id; });
        if (tile) {
            tile.percentBounds = bounds;
            this.refreshTiles$.next();
        }
    };
    DejaTilesLayoutProvider.prototype.HitTest = function (pixelBounds) {
        var percentBounds = new Rect(this.getPercentSize(pixelBounds.left), this.getPercentSize(pixelBounds.top), this.getPercentSize(pixelBounds.width), this.getPercentSize(pixelBounds.height));
        return this.tiles.filter(function (t) { return t.percentBounds.intersectWith(percentBounds); });
    };
    DejaTilesLayoutProvider.prototype.getPercentSize = function (value) {
        return Math.round(value * 100 / this.hundredPercentWith);
    };
    DejaTilesLayoutProvider.prototype.dragEnter = function (dragContext, dragCursor) {
        if (!this.designMode) {
            return false;
        }
        var tile = dragContext['IDejaTile'];
        if (!tile) {
            return false;
        }
        var containerBounds = this._container.getBoundingClientRect();
        var _a = dragCursor.originalEvent, pageX = _a.pageX, pageY = _a.pageY;
        var x = pageX - containerBounds.left;
        var y = pageY - containerBounds.top;
        tile.id = '#temp';
        var tempTile = new DejaTile(tile);
        tempTile.isTemporary = true;
        this.dragDropInfos$.next({
            enabled: false,
            startX: x,
            startY: y,
            tiles: [tempTile],
        });
        return true;
    };
    DejaTilesLayoutProvider.prototype.startDrag = function (tiles, pageX, pageY) {
        var _this = this;
        var savedLayout = this.saveLayout();
        var targetBounds;
        tiles.forEach(function (tile) {
            targetBounds = targetBounds ? Rect.union(targetBounds, tile.percentBounds) : tile.percentBounds;
            tile.isDragging = true;
        });
        this.dragRelativePosition = {};
        tiles.forEach(function (tile) { _this.dragRelativePosition[tile.id] = new Position(tile.percentBounds.left - targetBounds.left, tile.percentBounds.top - targetBounds.top); });
        this.dragPageOffset = new Position(pageX, pageY);
        this.dragOriginalPosition = new Position(targetBounds.left, targetBounds.top);
        this.targetBounds = savedLayout.targetBounds = savedLayout.validBounds = targetBounds;
        this.originalLayout = savedLayout;
        this.validLayout = undefined;
    };
    DejaTilesLayoutProvider.prototype.expandTile = function (tile, pixelheight) {
        var t = tile.id ? this.tilesDic[tile.id] : this.tiles.find(function (tt) { return tt.equalsTo(tile); });
        if (this.beforeSizeLayout) {
            this.restoreLayout(this.beforeSizeLayout);
        }
        else {
            this.beforeSizeLayout = this.saveLayout();
        }
        this.expandedTile = t;
        t.isExpanded = true;
        var percentHeight = Math.ceil(pixelheight * 100 / this.hundredPercentWith);
        var bottom = t.percentBounds.top + percentHeight;
        this.size(t, new Position(0, this.getPixelSize(bottom)), Directions.bottom);
    };
    DejaTilesLayoutProvider.prototype.cancelExpand = function () {
        if (this.beforeSizeLayout) {
            this.expandedTile.isExpanded = false;
            this.restoreLayout(this.beforeSizeLayout);
            this.refreshTiles$.next();
            this.beforeSizeLayout = undefined;
        }
    };
    DejaTilesLayoutProvider.prototype.cancelDrag = function (tiles) {
        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }
        Observable.from(tiles)
            .filter(function (tile) { return !!tile; })
            .do(function (tile) {
            tile.isDragging = false;
            tile.isDropping = true;
        })
            .delay(1000)
            .subscribe(function (tile) { tile.isDropping = false; });
        if (this.originalLayout) {
            this.restoreLayout(this.originalLayout);
        }
        this.endDrag();
    };
    DejaTilesLayoutProvider.prototype.drop = function (tiles) {
        var _this = this;
        var changed;
        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }
        if (this.validLayout) {
            this.restoreLayout(this.validLayout);
            if (this._cursor !== 'move') {
                var tile = tiles[0];
                tile.percentBounds = new Rect(this.validLayout.validBounds);
                tile.isDragging = false;
            }
            else {
                Observable.from(tiles)
                    .filter(function (tile) { return !!tile; })
                    .do(function (tile) {
                    var left = _this.validLayout.validBounds.left + _this.dragRelativePosition[tile.id].left;
                    var top = _this.validLayout.validBounds.top + _this.dragRelativePosition[tile.id].top;
                    tile.percentBounds = new Rect(left, top, tile.percentBounds.width, tile.percentBounds.height);
                    tile.isDragging = false;
                    tile.isDropping = true;
                    if (tile.id === '#temp') {
                        tile.makeId();
                        _this.tilesDic[tile.id] = tile;
                        delete _this.tilesDic['#temp'];
                        _this.addTiles([tile]);
                    }
                })
                    .delay(1000)
                    .subscribe(function (tile) { tile.isDropping = false; });
            }
            changed = this.tiles.filter(function (t) { return !Rect.equals(t.percentBounds, _this.originalLayout[t.id] && _this.originalLayout[t.id].bounds); });
            this.endDrag();
        }
        else {
            this.removeTemporaryTile();
            this.cancelDrag(tiles);
        }
        if (changed) {
            var event_2 = new CustomEvent('DejaTilesEvent', { cancelable: true });
            event_2.tiles = this.tiles.map(function (tile) { return tile.toTileModel(); });
            this.layoutChanged.emit(event_2);
        }
        return changed;
    };
    DejaTilesLayoutProvider.prototype.endDrag = function () {
        this.originalLayout = undefined;
        this.validLayout = undefined;
        this.targetBounds = undefined;
        this.dragging$.next(false);
        this.dragDropInfos$.next(null);
        this.dragTarget = undefined;
        this.copyTiles(null);
        this.refreshTiles$.next();
    };
    DejaTilesLayoutProvider.prototype.drag = function (tiles, pageX, pageY) {
        var _this = this;
        var offset = new Position(pageX - this.dragPageOffset.left, pageY - this.dragPageOffset.top);
        var offsetLeft = offset.left + this.getPixelSize(this.dragOriginalPosition.left);
        var offsetTop = offset.top + this.getPixelSize(this.dragOriginalPosition.top);
        var sizemin = this.getTileMinPixelSize();
        var sizemax = this.getTileMaxPixelSize();
        if (this._cursor !== 'move') {
            var tile = tiles[0];
            var bounds = this.getPixelBounds(tile.percentBounds);
            var offsetRight = offsetLeft + bounds.width;
            var offsetBottom = offsetTop + bounds.height;
            var right = bounds.right;
            var bottom = bounds.bottom;
            switch (this._cursor) {
                case 'nw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.right = right;
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(offsetLeft, offsetTop), Directions.left + Directions.top);
                    break;
                case 'sw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.right = right;
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(offsetLeft, offsetBottom), Directions.left + Directions.bottom);
                    break;
                case 'w-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizemin.width), bounds.right - sizemax.width);
                    bounds.right = right;
                    this.size(tile, new Position(offsetLeft, 0), Directions.left);
                    break;
                case 'ne-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(offsetRight, offsetTop), Directions.right + Directions.top);
                    break;
                case 'se-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(offsetRight, offsetBottom), Directions.right + Directions.bottom);
                    break;
                case 'e-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizemax.width), bounds.left + sizemin.width);
                    this.size(tile, new Position(offsetRight, 0), Directions.right);
                    break;
                case 'n-resize':
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizemin.height), bounds.bottom - sizemax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new Position(0, offsetTop), Directions.top);
                    break;
                case 's-resize':
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizemax.height), bounds.top + sizemin.height);
                    this.size(tile, new Position(0, offsetBottom), Directions.bottom);
                    break;
                default:
                    throw new Error('Invalid direction');
            }
            tile.pixelBounds = bounds;
        }
        else {
            tiles.forEach(function (tile) { tile.pixelBounds = new Rect(offsetLeft + _this.getPixelSize(_this.dragRelativePosition[tile.id].left), offsetTop + _this.getPixelSize(_this.dragRelativePosition[tile.id].top), _this.getPixelSize(tile.percentBounds.width), _this.getPixelSize(tile.percentBounds.height)); });
            this.dragTarget = new Rect(this.getPercentSize(offsetLeft), this.getPercentSize(offsetTop), this.targetBounds.width, this.targetBounds.height);
            this.move();
        }
    };
    DejaTilesLayoutProvider.prototype.addTiles = function (newTiles) {
        var _this = this;
        if (!newTiles || newTiles.length === 0) {
            return;
        }
        newTiles.forEach(function (newTile) {
            if (!_this.tiles.find(function (t) { return t.id === newTile.id; })) {
                newTile.percentBounds = _this.getFreePlace(newTile.percentBounds);
                _this._tiles.push(newTile);
            }
        });
        var event = new CustomEvent('DejaTilesAddEvent', { cancelable: true });
        event.tiles = this.tiles.map(function (tile) { return tile.toTileModel(); });
        event.added = newTiles.map(function (tile) { return tile.toTileModel(); });
        event.cancel$ = new Subject();
        var deleteSourceProvider$ = this.clipboardService && this.clipboardService.get('tiles-provider');
        var sourceTiles;
        if (deleteSourceProvider$) {
            sourceTiles = this.clipboardService.get('tiles');
            sourceTiles.forEach(function (tile) {
                tile.isHidden = true;
            });
        }
        var deleteSourceTiles = function () {
            if (sourceTiles) {
                deleteSourceProvider$.next(sourceTiles);
                _this.clipboardService.clear();
            }
        };
        newTiles.forEach(function (tile) {
            tile.isPending = true;
        });
        var validateNewTiles = function (tiles) {
            tiles.forEach(function (tile) {
                tile.isPending = false;
            });
            deleteSourceTiles();
            var e = new CustomEvent('DejaTilesModelEvent', { cancelable: false });
            e.tiles = _this._tiles.map(function (tile) { return tile.toTileModel(); });
            e.added = tiles.map(function (tile) { return tile.toTileModel(); });
            _this.modelChanged.emit(e);
        };
        var cancelSubscription = event.cancel$
            .first()
            .subscribe(function (value) {
            if (value) {
                Observable.from(newTiles)
                    .do(function (tile) { return tile.isHidden = true; })
                    .delay(1000)
                    .reduce(function (acc, curr) {
                    acc.push(curr);
                    return acc;
                }, [])
                    .first()
                    .subscribe(function (tiles) { return _this.deleteTiles(tiles); });
                if (sourceTiles) {
                    sourceTiles.forEach(function (tile) {
                        tile.isHidden = false;
                        tile.isCutted = true;
                    });
                }
            }
            else {
                validateNewTiles(newTiles);
            }
        });
        Observable.timer(1000)
            .first()
            .filter(function () { return !event.defaultPrevented; })
            .subscribe(function () {
            cancelSubscription.unsubscribe();
            validateNewTiles(newTiles);
        });
        var bounds;
        newTiles.forEach(function (tile) {
            bounds = bounds ? Rect.union(bounds, tile.percentBounds) : new Rect(tile.percentBounds);
        });
        this.refreshTiles$.next({ ensureBounds: bounds });
        this.contentAdding.emit(event);
    };
    DejaTilesLayoutProvider.prototype.size = function (tile, pixelpos, directions) {
        var percentPos = new Position(this.getPercentSize(pixelpos.left), this.getPercentSize(pixelpos.top));
        var dragBounds = tile.percentBounds.clone();
        var newTargetBounds = tile.percentBounds.clone();
        var minWidth;
        var minHeight;
        var maxWidth;
        var maxHeight;
        if (directions & Directions.left) {
            minWidth = this.getTileMinPercentWidth();
            maxWidth = this.getTileMaxPercentWidth();
            var dleft = percentPos.left;
            var tleft = dragBounds.left < dleft ? minWidth * Math.ceil(dleft / minWidth) : minWidth * Math.floor(dleft / minWidth);
            var twidth = Math.min(maxWidth, Math.max(minWidth, newTargetBounds.right - tleft));
            dragBounds.width = dragBounds.right - dleft;
            dragBounds.left = dleft;
            newTargetBounds.left = newTargetBounds.right - twidth;
            newTargetBounds.width = twidth;
        }
        if (directions & Directions.right) {
            minWidth = minWidth || this.getTileMinPercentWidth();
            maxWidth = maxWidth || this.getTileMaxPercentWidth();
            var dright = percentPos.left;
            var tright = dragBounds.right < dright ? minWidth * Math.ceil(dright / minWidth) : minWidth * Math.floor(dright / minWidth);
            dragBounds.width = dright - dragBounds.left;
            newTargetBounds.width = Math.min(maxWidth, Math.max(minWidth, tright - newTargetBounds.left));
        }
        if (directions & Directions.top) {
            minHeight = this.getTileMinPercentHeight();
            maxHeight = this.getTileMaxPercentHeight();
            var dtop = percentPos.top;
            var ttop = dragBounds.top < dtop ? minHeight * Math.ceil(dtop / minHeight) : minHeight * Math.floor(dtop / minHeight);
            var theight = Math.min(maxHeight, Math.max(minHeight, newTargetBounds.bottom - ttop));
            dragBounds.height = dragBounds.bottom - dtop;
            dragBounds.top = dtop;
            newTargetBounds.top = newTargetBounds.bottom - theight;
            newTargetBounds.height = theight;
        }
        if (directions & Directions.bottom) {
            minHeight = minHeight || this.getTileMinPercentHeight();
            maxHeight = maxHeight || this.getTileMaxPercentHeight();
            var dbottom = percentPos.top;
            var tbottom = dragBounds.bottom < dbottom ? minHeight * Math.ceil(dbottom / minHeight) : minHeight * Math.floor(dbottom / minHeight);
            dragBounds.height = dbottom - dragBounds.top;
            newTargetBounds.height = Math.min(maxHeight, Math.max(minHeight, tbottom - newTargetBounds.top));
        }
        if (Rect.equals(newTargetBounds, this.destination)) {
            return;
        }
        if (tile.isExpanded) {
            var ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
            tile.percentBounds = ensureBounds;
            this.refreshTiles$.next();
        }
        else {
            this.restoreLayout(this.originalLayout);
            this.destination = newTargetBounds.clone();
            var result = this.tiles.find(function (t) { return !t.isDragging && t.percentBounds.intersectWith(newTargetBounds); });
            if (!result) {
                this.targetBounds = newTargetBounds;
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
                this.refreshTiles$.next();
            }
            else {
                if (newTargetBounds) {
                    var ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
                    if (ensureBounds) {
                        this.targetBounds = ensureBounds;
                        this.validLayout = this.saveLayout();
                        this.validLayout.targetBounds = newTargetBounds;
                        this.validLayout.validBounds = ensureBounds;
                        this.refreshTiles$.next();
                    }
                }
            }
        }
    };
    DejaTilesLayoutProvider.prototype.move = function () {
        var _this = this;
        var minWidth = this.getTileMinPercentWidth();
        var minHeight = this.getTileMinPercentHeight();
        var newTargetBounds = this.ensureContainer(new Rect(minWidth * Math.round(this.dragTarget.left / minWidth), minHeight * Math.round(this.dragTarget.top / minHeight), this.dragTarget.width, this.dragTarget.height));
        if (this.lastTargetBounds && Math.abs(newTargetBounds.left - this.lastTargetBounds.left) < 3 && Math.abs(newTargetBounds.top - this.lastTargetBounds.top) < 3) {
            return;
        }
        this.lastTargetBounds = newTargetBounds;
        if (this.moveTimout) {
            this.moveTimout.unsubscribe();
            this.moveTimout = undefined;
        }
        this.restoreLayout(this.originalLayout);
        var result = this.tiles.find(function (tile) { return !tile.isDragging && tile.percentBounds.intersectWith(newTargetBounds); });
        if (!result) {
            this.targetBounds = newTargetBounds.clone();
            this.destination = newTargetBounds.clone();
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles$.next();
        }
        else {
            this.moveTimout = Observable.timer(500)
                .first()
                .subscribe(function () {
                _this.moveTimout = undefined;
                _this.destination = newTargetBounds.clone();
                if (newTargetBounds) {
                    var ensureBounds = _this.ensureTarget(newTargetBounds, _this.dragTarget, Directions.all);
                    if (ensureBounds) {
                        _this.targetBounds = ensureBounds;
                        _this.validLayout = _this.saveLayout();
                        _this.validLayout.targetBounds = newTargetBounds;
                        _this.validLayout.validBounds = ensureBounds;
                        _this.refreshTiles$.next();
                    }
                }
            });
        }
    };
    DejaTilesLayoutProvider.prototype.ensureContainer = function (percentBounds) {
        if (percentBounds.left < 0) {
            percentBounds = percentBounds.offset(-percentBounds.left, 0);
        }
        if (percentBounds.top < 0) {
            percentBounds = percentBounds.offset(0, -percentBounds.top);
        }
        var maxPercentWidth = this.getMaxPercentWidth();
        if (maxPercentWidth && percentBounds.right > maxPercentWidth) {
            percentBounds = percentBounds.offset(maxPercentWidth - percentBounds.right, 0);
        }
        var maxPercentHeight = this.getMaxPercentHeight();
        if (maxPercentHeight && percentBounds.bottom > maxPercentHeight) {
            percentBounds = percentBounds.offset(0, maxPercentHeight - percentBounds.bottom);
        }
        return percentBounds;
    };
    DejaTilesLayoutProvider.prototype.ensureTarget = function (bounds, effectiveBounds, directions, originalBounds) {
        if (!effectiveBounds) {
            effectiveBounds = bounds;
        }
        if (!originalBounds) {
            originalBounds = bounds.clone();
        }
        if (!directions) {
            directions = Directions.all;
        }
        else {
            directions |= Directions.bottom;
        }
        var tilesToPush = {};
        tilesToPush[Directions.left] = [];
        tilesToPush[Directions.right] = [];
        tilesToPush[Directions.top] = [];
        tilesToPush[Directions.bottom] = [];
        for (var id in this.tilesDic) {
            if (this.tilesDic[id]) {
                var tile = this.tilesDic[id];
                if (!tile.isDragging && !tile.isExpanded) {
                    if (tile.percentBounds.intersectWith(bounds)) {
                        var swapTargetRect = new Rect(this.dragOriginalPosition.left, this.dragOriginalPosition.top, bounds.width, bounds.height);
                        if (tile.percentBounds.left === effectiveBounds.left && tile.percentBounds.top === effectiveBounds.top && tile.percentBounds.width === effectiveBounds.width && tile.percentBounds.height === effectiveBounds.height && effectiveBounds.adjacent(swapTargetRect)) {
                            tile.percentBounds = swapTargetRect;
                            return bounds;
                        }
                        else {
                            var hol = tile.percentBounds.left - effectiveBounds.left;
                            var hor = effectiveBounds.right - tile.percentBounds.right;
                            var vot = tile.percentBounds.top - effectiveBounds.top;
                            var vob = effectiveBounds.bottom - tile.percentBounds.bottom;
                            var hoe = Math.max(0, Math.min(tile.percentBounds.right, effectiveBounds.right) - Math.max(tile.percentBounds.left, effectiveBounds.left)) / Math.min(tile.percentBounds.width, effectiveBounds.width);
                            var voe = Math.max(0, Math.min(tile.percentBounds.bottom, effectiveBounds.bottom) - Math.max(tile.percentBounds.top, effectiveBounds.top)) / Math.min(tile.percentBounds.height, effectiveBounds.height);
                            var preferedDirection = void 0;
                            if (voe >= hoe && directions & Directions.horizontal) {
                                preferedDirection = hor >= hol && directions & Directions.left ? Directions.left : Directions.right;
                            }
                            else {
                                preferedDirection = vob >= vot && directions & Directions.top ? Directions.top : Directions.bottom;
                            }
                            tilesToPush[preferedDirection].push(tile);
                        }
                    }
                }
            }
        }
        var remain = 0;
        if (tilesToPush[Directions.left].length) {
            remain = this.pushHorizontal(bounds, -1, tilesToPush[Directions.left]);
            if (remain) {
                bounds = this.ensureContainer(bounds.offset(remain, 0));
                return this.ensureTarget(bounds, effectiveBounds, directions & ~Directions.left, originalBounds);
            }
        }
        if (tilesToPush[Directions.right].length) {
            remain = this.pushHorizontal(bounds, 1, tilesToPush[Directions.right]);
        }
        if (remain > 0) {
            this.restoreLayout(this.originalLayout);
            return this.ensureTarget(originalBounds, effectiveBounds, directions & Directions.vertical);
        }
        else {
            if (tilesToPush[Directions.top].length) {
                remain = this.pushVertical(bounds, -1, tilesToPush[Directions.top]);
                if (remain) {
                    bounds = this.ensureContainer(bounds.offset(0, remain));
                    return this.ensureTarget(bounds, effectiveBounds, Directions.bottom);
                }
            }
            remain = this.pushVertical(bounds, 1, tilesToPush[Directions.bottom]);
            if (remain) {
                return null;
            }
        }
        return bounds;
    };
    DejaTilesLayoutProvider.prototype.saveLayout = function () {
        var _this = this;
        var layout = {};
        layout.height = this.getTileMinPercentHeight();
        this.tiles.forEach(function (tile) {
            var y = _this.getPixelSize(tile.percentBounds.top || 0);
            var h = _this.getPixelSize(tile.percentBounds.height || _this.tileMinHeight);
            if (y + h > layout.height) {
                layout.height = y + h;
            }
            layout[tile.id] = {
                bounds: tile.percentBounds.clone(),
                id: tile.id,
            };
        });
        return layout;
    };
    DejaTilesLayoutProvider.prototype.getPixelBounds = function (rect) { return Rect.fromLTRB(Math.round(rect.left * this.hundredPercentWith / 100), Math.round(rect.top * this.hundredPercentWith / 100), Math.round(rect.right * this.hundredPercentWith / 100), Math.round(rect.bottom * this.hundredPercentWith / 100)); };
    DejaTilesLayoutProvider.prototype.getPixelSize = function (value, unit) {
        if (!unit || unit === '%') {
            return Math.round(value * this.hundredPercentWith / 100);
        }
        else {
            return value;
        }
    };
    DejaTilesLayoutProvider.prototype.getSizePercentLimit = function (prop) {
        var unit = this[prop + 'Unit'];
        if (!unit || unit === 'px') {
            return this.getPercentSize(this[prop]);
        }
        else {
            return this[prop];
        }
    };
    DejaTilesLayoutProvider.prototype.getSizePixelLimit = function (prop) {
        var unit = this[prop + 'Unit'];
        if (!unit || unit === 'px') {
            return this[prop];
        }
        else {
            return this.getPixelSize(this[prop]);
        }
    };
    DejaTilesLayoutProvider.prototype.getTileMinPixelSize = function () { return new Size(this.getSizePixelLimit('tileMinWidth'), this.getSizePixelLimit('tileMinHeight')); };
    DejaTilesLayoutProvider.prototype.getTileMaxPixelSize = function () { return new Size(this.getSizePixelLimit('tileMaxWidth'), this.getSizePixelLimit('tileMaxHeight')); };
    DejaTilesLayoutProvider.prototype.getTileMinPercentWidth = function () { return this.getSizePercentLimit('tileMinWidth'); };
    DejaTilesLayoutProvider.prototype.getTileMaxPercentWidth = function () { return this.getSizePercentLimit('tileMaxWidth'); };
    DejaTilesLayoutProvider.prototype.getTileMinPercentHeight = function () { return this.getSizePercentLimit('tileMinHeight'); };
    DejaTilesLayoutProvider.prototype.getTileMaxPercentHeight = function () { return this.getSizePercentLimit('tileMaxHeight'); };
    DejaTilesLayoutProvider.prototype.getMaxPercentWidth = function () { return this.getSizePercentLimit('maxWidth'); };
    DejaTilesLayoutProvider.prototype.getMaxPercentHeight = function () { return this.getSizePercentLimit('maxHeight'); };
    DejaTilesLayoutProvider.prototype.getCursorFromHTMLElement = function (x, y, element) {
        var tileElement = this.getTileElementFromHTMLElement(element);
        if (!tileElement) {
            return null;
        }
        var bounds = tileElement.getBoundingClientRect();
        if (x < bounds.left + 10) {
            if (y < bounds.top + 10) {
                return 'nw-resize';
            }
            else if (y > bounds.bottom - 10) {
                return 'sw-resize';
            }
            else {
                return 'w-resize';
            }
        }
        else if (x > bounds.right - 10) {
            if (y < bounds.top + 10) {
                return 'ne-resize';
            }
            else if (y > bounds.bottom - 10) {
                return 'se-resize';
            }
            else {
                return 'e-resize';
            }
        }
        else {
            if (y < bounds.top + 10) {
                return 'n-resize';
            }
            else if (y > bounds.bottom - 10) {
                return 's-resize';
            }
            else {
                return 'move';
            }
        }
    };
    DejaTilesLayoutProvider.prototype.extractValueAndUnit = function (prop, value) {
        var regexp = /(\d+)(.*)/i;
        var matches = regexp.exec(value);
        if (matches && matches.length >= 1) {
            this[prop] = parseInt(matches[1], 10);
            if (matches.length >= 2) {
                this[prop + 'Unit'] = matches[2];
            }
            else {
                this[prop + 'Unit'] = 'px';
            }
        }
    };
    ;
    DejaTilesLayoutProvider.prototype.restoreLayout = function (layout) {
        this.tiles.forEach(function (tile) {
            var config = layout[tile.id];
            tile.percentBounds = config.bounds.clone();
        });
    };
    DejaTilesLayoutProvider.prototype.calcHorizontalOverflow = function (direction, tiles, offset, blackList) {
        var _this = this;
        var overflow = 0;
        blackList = blackList || {};
        tiles.forEach(function (t) {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;
                var tryBounds_1 = t.percentBounds.offset(direction * offset, 0);
                var roffset = 0;
                var maxWidth = _this.getMaxPercentWidth();
                if (tryBounds_1.left < 0) {
                    roffset = -tryBounds_1.left;
                }
                else if (maxWidth && tryBounds_1.right > maxWidth) {
                    roffset = tryBounds_1.right - maxWidth;
                }
                var adjacentTiles = _this.tiles.filter(function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds_1); });
                if (adjacentTiles.length) {
                    roffset += _this.calcHorizontalOverflow(direction, adjacentTiles, offset, blackList);
                }
                if (roffset > overflow) {
                    overflow = roffset;
                }
            }
        });
        return overflow;
    };
    DejaTilesLayoutProvider.prototype.moveHorizontal = function (direction, tiles, offset, targetBounds) {
        var _this = this;
        tiles.forEach(function (t) {
            if (!targetBounds[t.id]) {
                var newBounds_1 = targetBounds[t.id] = t.percentBounds.offset(direction * offset, 0);
                var adjacentTiles = _this.tiles.filter(function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds_1); });
                if (adjacentTiles.length) {
                    _this.moveHorizontal(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    };
    DejaTilesLayoutProvider.prototype.pushHorizontal = function (bounds, direction, tiles, offset) {
        var overflow = 0;
        var targetBounds = {};
        if (!offset) {
            offset = 0;
            tiles.forEach(function (t) {
                var ho = direction > 0 ? Math.max(0, bounds.right - t.percentBounds.left) : Math.max(0, t.percentBounds.right - bounds.left);
                if (ho > offset) {
                    offset = ho;
                }
            });
        }
        if (offset > 0) {
            overflow = this.calcHorizontalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveHorizontal(direction, tiles, offset, targetBounds);
                this.tiles.forEach(function (t) {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                });
            }
        }
        return overflow;
    };
    DejaTilesLayoutProvider.prototype.calcVerticalOverflow = function (direction, tiles, offset, blackList) {
        var _this = this;
        var overflow = 0;
        blackList = blackList || {};
        tiles.forEach(function (t) {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;
                var tryBounds_2 = t.percentBounds.offset(0, direction * offset);
                var roffset = 0;
                var maxHeight = _this.getMaxPercentHeight();
                if (tryBounds_2.top < 0) {
                    roffset = -tryBounds_2.top;
                }
                else if (maxHeight && tryBounds_2.bottom > maxHeight) {
                    roffset = tryBounds_2.bottom - maxHeight;
                }
                var adjacentTiles = _this.tiles.filter(function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds_2); });
                if (adjacentTiles.length) {
                    roffset += _this.calcVerticalOverflow(direction, adjacentTiles, offset, blackList);
                }
                if (roffset > overflow) {
                    overflow = roffset;
                }
            }
        });
        return overflow;
    };
    DejaTilesLayoutProvider.prototype.moveVertical = function (direction, tiles, offset, targetBounds) {
        var _this = this;
        tiles.forEach(function (t) {
            if (!targetBounds[t.id]) {
                var newBounds_2 = targetBounds[t.id] = t.percentBounds.offset(0, direction * offset);
                var adjacentTiles = _this.tiles.filter(function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds_2); });
                if (adjacentTiles.length) {
                    _this.moveVertical(direction, adjacentTiles, offset, targetBounds);
                }
            }
        });
    };
    DejaTilesLayoutProvider.prototype.pushVertical = function (bounds, direction, tiles, offset) {
        var overflow = 0;
        var targetBounds = {};
        if (!offset) {
            offset = 0;
            tiles.forEach(function (t) {
                var vo = direction > 0 ? Math.max(0, bounds.bottom - t.percentBounds.top) : Math.max(0, t.percentBounds.bottom - bounds.top);
                if (vo > offset) {
                    offset = vo;
                }
            });
        }
        if (offset > 0) {
            overflow = this.calcVerticalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveVertical(direction, tiles, offset, targetBounds);
                this._tiles.forEach(function (t) {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                });
            }
        }
        return overflow;
    };
    DejaTilesLayoutProvider.prototype.createTile = function (tile) {
        var newTile = new DejaTile(tile);
        this.tiles.push(newTile);
        this.tilesDic[newTile.id] = newTile;
        return newTile;
    };
    DejaTilesLayoutProvider.prototype.copyTiles = function (tiles, isCut) {
        if (!this.clipboardService) {
            if (!tiles) {
                return;
            }
            throw new Error('DejaClipboardService must be imported by your application to use the copyTiles methode of DejaTilesComponent.');
        }
        var tt = this.clipboardService.get('tiles');
        if (tt) {
            tt.forEach(function (tile) { return tile.isCutted = false; });
        }
        this.clipboardService.set('tiles', tiles);
        if (isCut) {
            tiles.forEach(function (tile) { return tile.isCutted = true; });
            this.clipboardService.set('tiles-provider', this.deleteTiles$);
        }
        else {
            this.clipboardService.set('tiles-provider', undefined);
        }
    };
    DejaTilesLayoutProvider.prototype.removeTemporaryTile = function () {
        var index = this.tiles.length;
        while (--index >= 0) {
            var tile = this.tiles[index];
            if (tile.id === '#temp') {
                this.tiles.splice(index, 1);
            }
        }
        delete this.tilesDic['#temp'];
    };
    return DejaTilesLayoutProvider;
}());
DejaTilesLayoutProvider = __decorate([
    Injectable(),
    __param(0, Optional()),
    __metadata("design:paramtypes", [DejaClipboardService])
], DejaTilesLayoutProvider);
export { DejaTilesLayoutProvider };
//# sourceMappingURL=tiles-layout.provider.js.map