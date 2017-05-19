var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { DejaTreeListItemsEvent } from '../../tree-list';
var DejaGridRowsEvent = (function (_super) {
    __extends(DejaGridRowsEvent, _super);
    function DejaGridRowsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DejaGridRowsEvent;
}(DejaTreeListItemsEvent));
export { DejaGridRowsEvent };
//# sourceMappingURL=data-grid-rows-event.js.map