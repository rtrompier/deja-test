var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var MonacoEditorService = (function () {
    function MonacoEditorService() {
    }
    MonacoEditorService.prototype.initMonacoLib = function (monacoLibPath) {
        if (!this._loading) {
            this.init(monacoLibPath);
        }
        return this._loader;
    };
    MonacoEditorService.prototype.init = function (monacoLibPath) {
        var _this = this;
        this._loader = new Promise(function (resolve) {
            _this._loading = true;
            if (monacoLibPath.substring(monacoLibPath.length - 1, monacoLibPath.length) === '/') {
                monacoLibPath = monacoLibPath.substring(0, monacoLibPath.length - 1);
            }
            var onGotAmdLoader = function () {
                window.require([monacoLibPath + '/editor/editor.main'], function () {
                    resolve();
                });
            };
            if (!window.require && !window.monaco) {
                var loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = monacoLibPath + '/loader.js';
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            }
            else {
                onGotAmdLoader();
            }
        });
    };
    return MonacoEditorService;
}());
MonacoEditorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MonacoEditorService);
export { MonacoEditorService };
//# sourceMappingURL=monaco-editor.service.js.map