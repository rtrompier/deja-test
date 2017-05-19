import { UnitValue } from '../../../common/core/graphics';
var DejaGridColumnsLayoutInfos = (function () {
    function DejaGridColumnsLayoutInfos(columns) {
        var _this = this;
        this.columnsWidth = {};
        this.percentColumns = [];
        this.fixedColumns = [];
        this.responsiveColumns = [];
        this.totalFixedWidth = 0;
        this.totalPercentWidth = 0;
        columns.forEach(function (column) {
            var width = new UnitValue(column.width);
            if (width.value === undefined) {
                width = new UnitValue(10, '%');
            }
            if (width.isInvalid()) {
                throw new Error('Invalid column width unit can be for example: 11px or 23%');
            }
            if (width.unit && width.unit !== 'px' && width.unit !== '%') {
                throw new Error('Column width unit can be only px or %');
            }
            if (width.unit === '%') {
                _this.percentColumns.push(column);
                _this.totalPercentWidth += width.value;
            }
            else {
                _this.fixedColumns.push(column);
                _this.totalFixedWidth += width.value;
            }
            if (typeof column.responsive === 'number' || column.responsive === true) {
                _this.responsiveColumns.push(column);
            }
            _this.columnsWidth[column.name] = width;
        });
        this.responsiveColumns.sort(function (c1, c2) {
            if (c1.responsive === true) {
                return 1;
            }
            else if (c2.responsive === true) {
                return -1;
            }
            else {
                return +c1.responsive - +c2.responsive;
            }
        });
    }
    return DejaGridColumnsLayoutInfos;
}());
export { DejaGridColumnsLayoutInfos };
//# sourceMappingURL=data-grid-column-layout-infos.js.map