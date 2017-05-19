var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { KeyCodes } from '../../common/core';
import { Rect } from '../../common/core/graphics';
import { DejaTile, DejaTileGroupComponent } from './index';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';
var DejaTilesComponent = (function () {
    function DejaTilesComponent(el, layoutProvider) {
        var _this = this;
        this.layoutProvider = layoutProvider;
        this.selectionChanged = new EventEmitter();
        this.layoutChanged = new EventEmitter();
        this.contentAdding = new EventEmitter();
        this.contentRemoving = new EventEmitter();
        this.modelChanged = new EventEmitter();
        this.contentCopied = new EventEmitter();
        this._models = [];
        this.tiles$ = new BehaviorSubject([]);
        var element = el.nativeElement;
        this.selectionChanged = this.layoutProvider.selectionChanged;
        this.layoutChanged = this.layoutProvider.layoutChanged;
        this.contentAdding = this.layoutProvider.contentAdding;
        this.contentRemoving = this.layoutProvider.contentRemoving;
        this.layoutProvider.modelChanged.subscribe(function (event) {
            _this.modelChanged.emit(event);
        });
        this.keyup$ = Observable.fromEvent(element.ownerDocument, 'keyup');
        this.resize$sub = Observable.fromEvent(window, 'resize')
            .debounceTime(5)
            .subscribe(function () { return _this.refresh({ resetWidth: true }); });
    }
    Object.defineProperty(DejaTilesComponent.prototype, "tileminwidth", {
        set: function (value) {
            this.layoutProvider.tileminwidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tilemaxwidth", {
        set: function (value) {
            this.layoutProvider.tilemaxwidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tileminheight", {
        set: function (value) {
            this.layoutProvider.tileminheight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tilemaxheight", {
        set: function (value) {
            this.layoutProvider.tilemaxheight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "maxwidth", {
        set: function (value) {
            this.layoutProvider.maxwidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "designMode", {
        get: function () {
            return this.layoutProvider.designMode;
        },
        set: function (value) {
            this.layoutProvider.designMode = value != null && "" + value !== 'false';
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(DejaTilesComponent.prototype, "models", {
        set: function (models) {
            this._models = models || [];
            this.tiles$.next(this.layoutProvider.tiles = (this._models.map(function (tile) { return new DejaTile(tile); })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canDelete", {
        set: function (value) {
            var _this = this;
            if (value != null && "" + value !== 'false' && !this.delete$sub) {
                this.delete$sub = this.keyup$
                    .filter(function () { return _this.layoutProvider.designMode; })
                    .filter(function (event) { return event.keyCode === KeyCodes.Delete; })
                    .subscribe(function () { return _this.layoutProvider.deleteSelection(); });
            }
            else if (this.delete$sub) {
                this.delete$sub.unsubscribe();
                this.delete$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canCopy", {
        set: function (value) {
            var _this = this;
            if (value != null && "" + value !== 'false' && !this.copy$sub) {
                this.copy$sub = this.keyup$
                    .filter(function (event) { return event.keyCode === KeyCodes.KeyC && event.ctrlKey; })
                    .subscribe(function () {
                    _this.copySelection();
                });
            }
            else if (this.copy$sub) {
                this.copy$sub.unsubscribe();
                this.copy$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canCut", {
        set: function (value) {
            var _this = this;
            if (value != null && "" + value !== 'false' && !this.cut$sub) {
                this.cut$sub = this.keyup$
                    .filter(function () { return _this.layoutProvider.designMode; })
                    .filter(function (event) { return event.keyCode === KeyCodes.KeyX && event.ctrlKey; })
                    .subscribe(function () {
                    _this.cutSelection();
                });
            }
            else if (this.cut$sub) {
                this.cut$sub.unsubscribe();
                this.cut$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canPaste", {
        set: function (value) {
            var _this = this;
            if (value != null && "" + value !== 'false' && !this.paste$sub) {
                this.paste$sub = this.keyup$
                    .filter(function () { return _this.layoutProvider.designMode; })
                    .filter(function (event) { return event.keyCode === KeyCodes.KeyV && event.ctrlKey; })
                    .subscribe(function () { return _this.layoutProvider.paste(); });
            }
            else if (this.paste$sub) {
                this.paste$sub.unsubscribe();
                this.paste$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "selectedTiles", {
        set: function (selectedIds) {
            this.layoutProvider.selectedTiles = selectedIds;
        },
        enumerable: true,
        configurable: true
    });
    DejaTilesComponent.prototype.ngAfterViewInit = function () {
        this.layoutProvider.container = this.tilesContainer.nativeElement;
        this.refresh({ resetWidth: true });
    };
    DejaTilesComponent.prototype.ngOnDestroy = function () {
        this.canCopy = false;
        this.canCut = false;
        this.canDelete = false;
        this.canPaste = false;
        this.resize$sub.unsubscribe();
    };
    DejaTilesComponent.prototype.copySelection = function () {
        var tiles = this.layoutProvider.copySelection();
        if (tiles && tiles.length) {
            var event_1 = new CustomEvent('DejaTilesCopied', { cancelable: true });
            event_1.tiles = tiles.map(function (tile) { return tile.toTileModel(); });
            this.contentCopied.emit(event_1);
        }
    };
    DejaTilesComponent.prototype.cutSelection = function () {
        var tiles = this.layoutProvider.cutSelection();
        if (tiles && tiles.length) {
            var event_2 = new CustomEvent('DejaTilesCutted', { cancelable: true });
            event_2.tiles = tiles.map(function (tile) { return tile.toTileModel(); });
            this.contentCopied.emit(event_2);
        }
    };
    DejaTilesComponent.prototype.deleteSelection = function () {
        return this.layoutProvider.deleteSelection();
    };
    DejaTilesComponent.prototype.paste = function () {
        return this.layoutProvider.paste();
    };
    DejaTilesComponent.prototype.ensureVisible = function (id) {
        this.layoutProvider.ensureVisible$.next(id);
    };
    DejaTilesComponent.prototype.expandTile = function (tile, pixelheight) {
        this.layoutProvider.expandTile(tile, pixelheight);
    };
    DejaTilesComponent.prototype.cancelExpand = function () {
        this.layoutProvider.cancelExpand();
    };
    DejaTilesComponent.prototype.refresh = function (params) {
        this.layoutProvider.refreshTiles$.next(params);
    };
    DejaTilesComponent.prototype.addTiles = function (tiles) {
        this.layoutProvider.addTiles(tiles.map(function (tile) { return new DejaTile(tile); }));
    };
    DejaTilesComponent.prototype.removeTiles = function (tileIds) {
        this.layoutProvider.removeTiles(tileIds);
    };
    DejaTilesComponent.prototype.addGroup = function (title, bounds) {
        var tile = {
            type: 'group',
            bounds: bounds || this.getFreePlace(0, 0, 15, 5),
            color: DejaTileGroupComponent.defaultColor,
            templateModel: {
                title: title || 'New Group',
            },
        };
        this.layoutProvider.createTiles([tile]);
        return tile;
    };
    DejaTilesComponent.prototype.getFreePlace = function (pageX, pageY, width, height) {
        if (!this._models || this._models.length === 0) {
            return new Rect(0, 0, width, height);
        }
        var containerElement = this.tilesContainer.nativeElement;
        var containerBounds = containerElement.getBoundingClientRect();
        var x = pageX ? (pageX - containerBounds.left) : 0;
        var y = pageY ? (pageY - containerBounds.top) : 0;
        var percentBounds = new Rect(this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height);
        return this.layoutProvider.getFreePlace(percentBounds);
    };
    DejaTilesComponent.prototype.moveTile = function (id, bounds) {
        this.layoutProvider.moveTile(id, bounds);
    };
    DejaTilesComponent.prototype.getDropContext = function (_dropArea) {
        var _this = this;
        return {
            dragEnter: function (dragContext, dragCursor) {
                return _this.layoutProvider.dragEnter(dragContext, dragCursor) && {
                    className: 'hidden',
                };
            },
            dragOver: function (_dragContext, dragCursor) {
                _this.layoutProvider.dragover$.next(dragCursor);
            },
            dragLeave: function (_dragContext, _dragCursor) {
                _this.layoutProvider.dragleave$.next();
            },
        };
    };
    DejaTilesComponent.prototype.onTileClosed = function (tile) {
        this.layoutProvider.removeTiles([tile.id]);
    };
    DejaTilesComponent.prototype.onTileModelChanged = function (tile) {
        var event = {};
        event.tiles = [tile];
        this.modelChanged.emit(event);
    };
    DejaTilesComponent.prototype.onMouseDown = function (e) {
        e.preventDefault();
        return false;
    };
    return DejaTilesComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "selectionChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "layoutChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "contentAdding", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "contentRemoving", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "modelChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "contentCopied", void 0);
__decorate([
    ContentChild('tileTemplate'),
    __metadata("design:type", Object)
], DejaTilesComponent.prototype, "tileTemplate", void 0);
__decorate([
    ViewChild('tilesContainer'),
    __metadata("design:type", ElementRef)
], DejaTilesComponent.prototype, "tilesContainer", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaTilesComponent.prototype, "tileminwidth", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaTilesComponent.prototype, "tilemaxwidth", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaTilesComponent.prototype, "tileminheight", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaTilesComponent.prototype, "tilemaxheight", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaTilesComponent.prototype, "maxwidth", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DejaTilesComponent.prototype, "designMode", null);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaTilesComponent.prototype, "models", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DejaTilesComponent.prototype, "canDelete", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DejaTilesComponent.prototype, "canCopy", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DejaTilesComponent.prototype, "canCut", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], DejaTilesComponent.prototype, "canPaste", null);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DejaTilesComponent.prototype, "selectedTiles", null);
__decorate([
    HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DragEvent]),
    __metadata("design:returntype", void 0)
], DejaTilesComponent.prototype, "onMouseDown", null);
DejaTilesComponent = __decorate([
    Component({
        providers: [DejaTilesLayoutProvider],
        selector: 'deja-tiles',
        styleUrls: [
            './tiles.component.scss',
        ],
        templateUrl: './tiles.component.html',
    }),
    __metadata("design:paramtypes", [ElementRef, DejaTilesLayoutProvider])
], DejaTilesComponent);
export { DejaTilesComponent };
//# sourceMappingURL=tiles.component.js.map