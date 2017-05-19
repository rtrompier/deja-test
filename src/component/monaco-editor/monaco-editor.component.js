var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { isUndefined } from 'util';
import { MonacoEditorService } from './monaco-editor.service';
import { IEditorLanguage } from './options/editor-language.model';
import { IEditorOptions } from './options/editor-options.model';
import { IEditorTheme } from './options/editor-theme.component';
var DejaMonacoEditorComponent = (function () {
    function DejaMonacoEditorComponent(monacoEditorService) {
        this.monacoEditorService = monacoEditorService;
        this.monacoLibPath = 'vs';
        this.valueChange = new EventEmitter();
        this.valueToCompareChange = new EventEmitter();
        this._value = '';
        this._valueToCompare = '';
    }
    Object.defineProperty(DejaMonacoEditorComponent.prototype, "valueToCompare", {
        set: function (v) {
            if (v !== this._valueToCompare) {
                this._valueToCompare = v;
                if (isUndefined(this._valueToCompare) || !this._editor) {
                    return;
                }
                if (this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
                    this.getModifiedModel().setValue(this._valueToCompare);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMonacoEditorComponent.prototype, "value", {
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                if (!this._editor) {
                    return;
                }
                if (isUndefined(this._value)) {
                    this._value = '';
                }
                this.getOriginalModel().setValue(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaMonacoEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.monacoEditorService.initMonacoLib(this.monacoLibPath).then(function () {
            _this.initMonaco();
        });
    };
    DejaMonacoEditorComponent.prototype.ngOnDestroy = function () {
        this.dispose();
    };
    DejaMonacoEditorComponent.prototype.ngOnChanges = function () {
        if (this._editor) {
            this._editor.updateOptions(this.getOptions());
        }
    };
    DejaMonacoEditorComponent.prototype.dispose = function () {
        var myDiv = this.editorContent.nativeElement;
        if (this._editor) {
            this._editor.dispose();
            while (myDiv.hasChildNodes()) {
                myDiv.removeChild(myDiv.firstChild);
            }
            this._editor = null;
        }
    };
    DejaMonacoEditorComponent.prototype.onResize = function () {
        var myDiv = this.editorContent.nativeElement;
        myDiv.setAttribute('style', "height: " + myDiv.parentElement.offsetHeight + "px; width:100%;");
    };
    DejaMonacoEditorComponent.prototype.initMonaco = function () {
        this.initEditor();
    };
    DejaMonacoEditorComponent.prototype.initEditor = function () {
        var _this = this;
        var myDiv = this.editorContent.nativeElement;
        var options = this.getOptions();
        this.dispose();
        if (!this.isDiffEditor) {
            this._editor = this.initSimpleEditor(myDiv, options);
        }
        else {
            this._editor = this.initDiffEditor(myDiv, options);
        }
        myDiv.setAttribute('style', "height: " + myDiv.parentElement.offsetHeight + "px; width:100%;");
        this.getOriginalModel().onDidChangeContent(function () {
            var newVal = _this.getOriginalModel().getValue();
            if (_this._value !== newVal) {
                _this.updateValue(newVal);
            }
        });
        if (this.getModifiedModel()) {
            this.getModifiedModel().onDidChangeContent(function () {
                var newVal = _this.getModifiedModel().getValue();
                if (_this._valueToCompare !== newVal) {
                    _this.updateValueToCompare(newVal);
                }
            });
        }
    };
    DejaMonacoEditorComponent.prototype.initSimpleEditor = function (div, options) {
        return monaco.editor.create(div, options);
    };
    DejaMonacoEditorComponent.prototype.initDiffEditor = function (div, options) {
        var originalModel = monaco.editor.createModel(this._value, this.language);
        var modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
        var diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });
        return diffEditor;
    };
    DejaMonacoEditorComponent.prototype.getOptions = function () {
        var options = new IEditorOptions();
        options.experimentalScreenReader = this.experimentalScreenReader;
        options.ariaLabel = this.ariaLabel;
        options.rulers = this.rulers;
        options.wordSeparators = this.wordSeparators;
        options.selectionClipboard = this.selectionClipboard;
        options.lineNumbers = this.lineNumbers;
        options.selectOnLineNumbers = this.selectOnLineNumbers;
        options.lineNumbersMinChars = this.lineNumbersMinChars;
        options.glyphMargin = this.glyphMargin;
        options.lineDecorationsWidth = this.lineDecorationsWidth;
        options.revealHorizontalRightPadding = this.revealHorizontalRightPadding;
        options.roundedSelection = this.roundedSelection;
        options.theme = this.theme;
        options.readOnly = this.readOnly;
        options.scrollbar = this.scrollbar;
        options.overviewRulerLanes = this.overviewRulerLanes;
        options.cursorBlinking = this.cursorBlinking;
        options.mouseWheelZoom = this.mouseWheelZoom;
        options.cursorStyle = this.cursorStyle;
        options.mouseWheelZoom = this.mouseWheelZoom;
        options.fontLigatures = this.fontLigatures;
        options.disableTranslate3d = this.disableTranslate3d;
        options.hideCursorInOverviewRuler = this.hideCursorInOverviewRuler;
        options.scrollBeyondLastLine = this.scrollBeyondLastLine;
        options.automaticLayout = this.automaticLayout;
        options.wrappingColumn = this.wrappingColumn;
        options.wordWrap = this.wordWrap;
        options.wrappingIndent = this.wrappingIndent;
        options.wordWrapBreakBeforeCharacters = this.wordWrapBreakBeforeCharacters;
        options.wordWrapBreakAfterCharacters = this.wordWrapBreakAfterCharacters;
        options.wordWrapBreakObtrusiveCharacters = this.wordWrapBreakObtrusiveCharacters;
        options.stopRenderingLineAfter = this.stopRenderingLineAfter;
        options.hover = this.hover;
        options.contextmenu = this.contextmenu;
        options.mouseWheelScrollSensitivity = this.mouseWheelScrollSensitivity;
        options.quickSuggestions = this.quickSuggestions;
        options.quickSuggestionsDelay = this.quickSuggestionsDelay;
        options.parameterHints = this.parameterHints;
        options.iconsInSuggestions = this.iconsInSuggestions;
        options.autoClosingBrackets = this.autoClosingBrackets;
        options.formatOnType = this.formatOnType;
        options.suggestOnTriggerCharacters = this.suggestOnTriggerCharacters;
        options.acceptSuggestionOnEnter = this.acceptSuggestionOnEnter;
        options.snippetSuggestions = this.snippetSuggestions;
        options.tabCompletion = this.tabCompletion;
        options.wordBasedSuggestions = this.wordBasedSuggestions;
        options.selectionHighlight = this.selectionHighlight;
        options.codeLens = this.codeLens;
        options.folding = this.folding;
        options.renderWhitespace = this.renderWhitespace;
        options.renderControlCharacters = this.renderControlCharacters;
        options.renderIndentGuides = this.renderIndentGuides;
        options.renderLineHighlight = this.renderLineHighlight;
        options.useTabStops = this.useTabStops;
        options.fontFamily = this.fontFamily;
        options.fontWeight = this.fontWeight;
        options.fontSize = this.fontSize;
        options.lineHeight = this.lineHeight;
        options.formatOnPaste = this.formatOnPaste;
        options.value = this._value;
        options.language = this.language;
        Object.keys(options).forEach(function (key) { return options[key] === undefined && delete options[key]; });
        return options;
    };
    DejaMonacoEditorComponent.prototype.updateValue = function (value) {
        this._value = value;
        this.valueChange.emit(value);
    };
    DejaMonacoEditorComponent.prototype.updateValueToCompare = function (value) {
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    };
    DejaMonacoEditorComponent.prototype.getOriginalModel = function () {
        if (this._editor) {
            var model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    };
    DejaMonacoEditorComponent.prototype.getModifiedModel = function () {
        if (this._editor) {
            var model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    };
    return DejaMonacoEditorComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "experimentalScreenReader", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "ariaLabel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DejaMonacoEditorComponent.prototype, "rulers", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "wordSeparators", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "selectionClipboard", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "lineNumbers", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "selectOnLineNumbers", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "lineNumbersMinChars", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "glyphMargin", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "lineDecorationsWidth", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "revealHorizontalRightPadding", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "roundedSelection", void 0);
__decorate([
    Input(),
    __metadata("design:type", IEditorTheme)
], DejaMonacoEditorComponent.prototype, "theme", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "readOnly", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaMonacoEditorComponent.prototype, "scrollbar", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "overviewRulerLanes", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "cursorBlinking", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "mouseWheelZoom", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "cursorStyle", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "fontLigatures", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "disableTranslate3d", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "hideCursorInOverviewRuler", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "scrollBeyondLastLine", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "automaticLayout", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "wrappingColumn", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "wordWrap", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "wrappingIndent", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "wordWrapBreakBeforeCharacters", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "wordWrapBreakAfterCharacters", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "wordWrapBreakObtrusiveCharacters", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "stopRenderingLineAfter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "hover", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "contextmenu", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "mouseWheelScrollSensitivity", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "quickSuggestions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "quickSuggestionsDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "parameterHints", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "iconsInSuggestions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "autoClosingBrackets", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "formatOnType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "suggestOnTriggerCharacters", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "acceptSuggestionOnEnter", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "snippetSuggestions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "tabCompletion", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "wordBasedSuggestions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "selectionHighlight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "codeLens", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "folding", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "renderWhitespace", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "renderControlCharacters", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "renderIndentGuides", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "renderLineHighlight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "useTabStops", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "fontFamily", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DejaMonacoEditorComponent.prototype, "fontWeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "fontSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], DejaMonacoEditorComponent.prototype, "lineHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "formatOnPaste", void 0);
__decorate([
    Input(),
    __metadata("design:type", IEditorLanguage)
], DejaMonacoEditorComponent.prototype, "language", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DejaMonacoEditorComponent.prototype, "isDiffEditor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DejaMonacoEditorComponent.prototype, "monacoLibPath", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaMonacoEditorComponent.prototype, "valueToCompare", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DejaMonacoEditorComponent.prototype, "value", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaMonacoEditorComponent.prototype, "valueChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DejaMonacoEditorComponent.prototype, "valueToCompareChange", void 0);
__decorate([
    ViewChild('editor'),
    __metadata("design:type", ElementRef)
], DejaMonacoEditorComponent.prototype, "editorContent", void 0);
__decorate([
    HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DejaMonacoEditorComponent.prototype, "onResize", null);
DejaMonacoEditorComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'deja-monaco-editor',
        styleUrls: [
            './monaco-editor.scss',
        ],
        template: "<div #editor class='monaco-editor'></div>",
    }),
    __metadata("design:paramtypes", [MonacoEditorService])
], DejaMonacoEditorComponent);
export { DejaMonacoEditorComponent };
//# sourceMappingURL=monaco-editor.component.js.map