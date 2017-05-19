var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
var DejaSnackbarComponent = DejaSnackbarComponent_1 = (function () {
    function DejaSnackbarComponent(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.delay = 0;
        this.duration = 0;
        this.onAnimationDone = new EventEmitter();
        this.marginTop = 6;
        this.timestamp = +new Date();
        this.enterAnimationDuration = 350;
        this.leaveAnimationDuration = 175;
        this.adaptAnimationDuration = 225;
        this.animate$ = new Subject();
        if (!DejaSnackbarComponent_1.instances) {
            DejaSnackbarComponent_1.instances = [];
        }
        DejaSnackbarComponent_1.instances.push(this);
        var applyParams = function (styles) {
            Object.keys(styles)
                .forEach(function (key) {
                _this.host.style[key] = styles[key];
            });
        };
        Observable.from(this.animate$)
            .do(function (animation) { return applyParams(animation.before); })
            .delay(1)
            .do(function (animation) {
            _this.host.style.transitionDuration = animation.duration + "ms";
            _this.host.style.transitionTimingFunction = animation.easing;
            _this.host.style.transitionProperty = Object.keys(animation.before).join(',');
        })
            .debounce(function (animation) { return Observable.timer(animation.delay || 1); })
            .do(function (animation) { return applyParams(animation.after); })
            .debounce(function (animation) { return Observable.timer(animation.duration); })
            .subscribe(function () {
            _this.host.style.transitionDuration = '';
            _this.host.style.transitionTimingFunction = '';
            _this.host.style.transitionProperty = '';
        });
    }
    Object.defineProperty(DejaSnackbarComponent.prototype, "alignment", {
        set: function (value) {
            var _this = this;
            this.alignents = {
                bottom: false,
                left: false,
                right: false,
                top: false,
            };
            if (value) {
                value
                    .split(/\s+/g)
                    .map(function (align) { return _this.alignents[align] = true; });
            }
            this.alignents.bottom = this.alignents.top && this.alignents.bottom ? false : this.alignents.bottom;
            this.alignents.left = this.alignents.right && this.alignents.left ? false : this.alignents.left;
        },
        enumerable: true,
        configurable: true
    });
    DejaSnackbarComponent.prototype.onResize = function () {
        this.setNewWidth();
    };
    DejaSnackbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        var anchors = [];
        Object.keys(this.alignents).forEach(function (key) {
            if (_this.alignents[key]) {
                anchors.push(key);
            }
        });
        anchors.sort(function (x, y) { return x > y ? 1 : -1; });
        var anchor = anchors.reduce(function (acc, curr) {
            if (acc === '') {
                acc += curr;
            }
            else {
                acc += "-" + curr;
            }
            return acc;
        }, '');
        this.anchor = anchor;
    };
    DejaSnackbarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.host = this.elementRef.nativeElement;
        if (!this.outerContainerElement) {
            this.outerContainerElement = this.host.ownerDocument.body;
        }
        else {
            this.host.classList.add('absolute');
        }
        this.height = this.host.getBoundingClientRect().height;
        this.setPosition();
        this.launchEnterAnimation();
        Observable.timer(this.duration + this.delay)
            .first()
            .do(function () {
            if (!!_this.duration) {
                _this.launchLeaveAnimation();
            }
        })
            .delay(this.leaveAnimationDuration)
            .subscribe(function () { return _this.onAnimationDone.emit(); });
    };
    DejaSnackbarComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (!!DejaSnackbarComponent_1.instances.length) {
            DejaSnackbarComponent_1.instances
                .filter(function (instance) { return _this.outerContainerElement === instance.outerContainerElement; })
                .filter(function (instance) { return _this.anchor === instance.anchor; })
                .forEach(function (instance) {
                if (instance.timestamp > _this.timestamp) {
                    instance.launchAdaptAnimation(_this.height);
                }
            });
        }
        DejaSnackbarComponent_1.instances = DejaSnackbarComponent_1.instances
            .filter(function (instance) { return _this !== instance; });
    };
    DejaSnackbarComponent.prototype.animationDone = function (event) {
        this.onAnimationDone.emit(event);
    };
    DejaSnackbarComponent.prototype.increaseElevation = function () {
        var zIndex = window.getComputedStyle(this.host).zIndex;
        this.host.style.zIndex = (+zIndex + 1).toString();
    };
    DejaSnackbarComponent.prototype.decreaseElevation = function () {
        var zIndex = window.getComputedStyle(this.host).zIndex;
        this.host.style.zIndex = (+zIndex - 1).toString();
    };
    DejaSnackbarComponent.prototype.computePosition = function () {
        var _this = this;
        var innerContainerElementBounds = this.host.getBoundingClientRect();
        var innerContainerWidth = innerContainerElementBounds.width;
        var innerContainerHeight = innerContainerElementBounds.height;
        var instancesInSameZone = DejaSnackbarComponent_1.instances
            .filter(function (instance) { return _this.outerContainerElement === instance.outerContainerElement; })
            .filter(function (instance) { return _this.anchor === instance.anchor; })
            .filter(function (instance) { return _this !== instance; });
        var precedentInstanceHeight = 0;
        if (!!instancesInSameZone) {
            var precedentInstance = instancesInSameZone[instancesInSameZone.length - 1];
            if (!!precedentInstance) {
                var innerContainerElement = precedentInstance.elementRef.nativeElement;
                precedentInstanceHeight = innerContainerElement.getBoundingClientRect().height;
            }
        }
        var computedHeight = instancesInSameZone
            .map(function (instance) {
            var innerContainerElement = instance.elementRef.nativeElement;
            return innerContainerElement.getBoundingClientRect().height;
        })
            .reduce(function (acc, curr) {
            acc += curr + _this.marginTop;
            return acc;
        }, 0);
        return {
            innerContainerWidth: innerContainerWidth,
            innerContainerHeight: innerContainerHeight,
            precedentInstanceHeight: precedentInstanceHeight,
            computedHeight: computedHeight,
        };
    };
    DejaSnackbarComponent.prototype.setPosition = function () {
        var _a = this.computePosition(), innerContainerWidth = _a.innerContainerWidth, innerContainerHeight = _a.innerContainerHeight, computedHeight = _a.computedHeight;
        if (this.anchor === 'left') {
            this.host.style.left = 2 + "%";
            this.host.style.bottom = "calc(" + 33 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'right') {
            this.host.style.left = "calc(" + 98 + "% - " + innerContainerWidth + "px)";
            this.host.style.bottom = "calc(" + 33 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'top') {
            this.host.style.left = "calc(" + 50 + "% - " + innerContainerWidth / 2 + "px )";
            this.host.style.bottom = "calc(" + 92 + "% - " + innerContainerHeight + "px)";
        }
        if (this.anchor === 'bottom') {
            this.host.style.left = "calc(" + 50 + "% - " + innerContainerWidth / 2 + "px )";
            this.host.style.bottom = "calc(" + 2 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'bottom-left') {
            this.host.style.left = 2 + "%";
            this.host.style.bottom = "calc(" + 2 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'bottom-right') {
            this.host.style.left = "calc(" + 98 + "% - " + innerContainerWidth + "px)";
            this.host.style.bottom = "calc(" + 2 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'left-top') {
            this.host.style.left = 2 + "%";
            this.host.style.bottom = "calc(" + 92 + "% - " + innerContainerHeight + "px - " + computedHeight + "px)";
        }
        if (this.anchor === 'right-top') {
            this.host.style.left = "calc(" + 98 + "% - " + innerContainerWidth + "px)";
            this.host.style.bottom = "calc(" + 92 + "% - " + innerContainerHeight + "px - " + computedHeight + "px)";
        }
    };
    DejaSnackbarComponent.prototype.setNewWidth = function () {
        var innerContainerWidth = this.computePosition().innerContainerWidth;
        if (this.anchor === 'top' || this.anchor === 'bottom') {
            this.elementRef.nativeElement.style.left = "calc(" + 50 + "% - " + innerContainerWidth / 2 + "px )";
        }
    };
    DejaSnackbarComponent.prototype.launchAdaptAnimation = function (height) {
        var direction = 1;
        if (this.alignents.top) {
            direction = -1;
        }
        var transform = window.getComputedStyle(this.host).transform;
        var sixth = parseFloat(transform
            .split(',')
            .slice(-1)
            .pop());
        this.animate$.next({
            before: {
                transform: "" + transform,
            },
            after: {
                transform: "matrix(1,0,0,1,0," + (sixth + ((height + this.marginTop) * direction)) + ")",
            },
            duration: this.adaptAnimationDuration,
            easing: 'ease',
        });
    };
    DejaSnackbarComponent.prototype.launchEnterAnimation = function () {
        var direction = -1;
        if (this.alignents.top) {
            direction = 1;
        }
        this.animate$.next({
            before: {
                opacity: '0',
                transform: "translateY(" + direction * 200 + "%)",
            },
            after: {
                opacity: '1',
                transform: "translateY(0)",
            },
            delay: this.delay,
            duration: this.enterAnimationDuration,
            easing: 'ease',
        });
    };
    DejaSnackbarComponent.prototype.launchLeaveAnimation = function () {
        this.animate$.next({
            before: {
                opacity: '1',
            },
            after: {
                opacity: '0',
            },
            duration: this.leaveAnimationDuration,
            easing: 'ease',
        });
    };
    return DejaSnackbarComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaSnackbarComponent.prototype, "delay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaSnackbarComponent.prototype, "duration", void 0);
__decorate([
    Input(),
    __metadata("design:type", HTMLElement)
], DejaSnackbarComponent.prototype, "outerContainerElement", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DejaSnackbarComponent.prototype, "onAnimationDone", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaSnackbarComponent.prototype, "alignment", null);
__decorate([
    HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DejaSnackbarComponent.prototype, "onResize", null);
DejaSnackbarComponent = DejaSnackbarComponent_1 = __decorate([
    Component({
        selector: 'deja-snackbar',
        styleUrls: ['./snackbar.component.scss'],
        template: "<ng-content></ng-content>",
    }),
    __metadata("design:paramtypes", [ElementRef])
], DejaSnackbarComponent);
export { DejaSnackbarComponent };
var DejaSnackbarComponent_1;
//# sourceMappingURL=snackbar.component.js.map