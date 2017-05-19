import { Component } from '@angular/core';
import { CloningService } from './common/core/cloning/cloning.service';

@Component({
  selector: 'sample-component',
  templateUrl: 'sample.component.html',
  styleUrls: [
    'sample.component.scss'
  ],
  providers: [
    CloningService,
  ]
})
export class SampleComponent {

  constructor(private cloningService: CloningService) {
    console.log(this.cloningService.cloneSync({ a: '3' }));
  }

}
