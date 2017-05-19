import { TestBed, inject } from '@angular/core/testing';
import { DejaGridRowComponent } from './data-grid-row.component';
describe('a data-grid-row component', function () {
    var component;
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                DejaGridRowComponent
            ]
        });
    });
    beforeEach(inject([DejaGridRowComponent], function (DejaGridRowComponent) {
        component = DejaGridRowComponent;
    }));
    it('should have an instance', function () {
        expect(component).toBeDefined();
    });
});
//# sourceMappingURL=data-grid-row.component.spec.js.map