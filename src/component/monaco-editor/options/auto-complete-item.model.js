var AutoCompleteItem = (function () {
    function AutoCompleteItem() {
    }
    AutoCompleteItem.prototype.setLabel = function (label) {
        this.label = label;
        return this;
    };
    AutoCompleteItem.prototype.setKind = function (kind) {
        this.kind = kind;
        return this;
    };
    AutoCompleteItem.prototype.setDocumentation = function (documentation) {
        this.documentation = documentation;
        return this;
    };
    AutoCompleteItem.prototype.setInsertText = function (insertText) {
        this.insertText = insertText;
        return this;
    };
    return AutoCompleteItem;
}());
export { AutoCompleteItem };
//# sourceMappingURL=auto-complete-item.model.js.map